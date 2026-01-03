import { corsHeaders } from './utils.js';
import { getTurnstileHTML } from './html/turnstile.js';

const SESSION_DURATION = 60 * 60;
const SESSION_COOKIE_NAME = 'ts_session';

export function generateSessionId() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

export function getSessionFromCookie(request) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp(`${SESSION_COOKIE_NAME}=([^;]+)`));
  return match ? match[1] : null;
}

export async function isSessionValid(sessionId, env) {
  if (!sessionId) return false;
  const session = await env.LINKS.get(`session:${sessionId}`);
  return session !== null;
}

export async function createSession(env) {
  const sessionId = generateSessionId();
  await env.LINKS.put(`session:${sessionId}`, Date.now().toString(), {
    expirationTtl: SESSION_DURATION
  });
  return sessionId;
}

export function getSessionCookie(sessionId) {
  return `${SESSION_COOKIE_NAME}=${sessionId}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_DURATION}`;
}

export async function handleTurnstilePage(env) {
  const siteKey = env.TURNSTILE_SITE_KEY;
  if (!siteKey) {
    return new Response('Turnstile not configured', { status: 500 });
  }
  return new Response(getTurnstileHTML(siteKey), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

export async function handleTurnstileVerify(request, env) {
  let body;
  try {
    const text = await request.text();
    if (text.length > 10 * 1024) {
      return new Response(JSON.stringify({ success: false, error: 'Payload too large' }), {
        status: 413,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    body = JSON.parse(text);
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  const { token } = body;

  if (!token || typeof token !== 'string' || token.length > 2048) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid token' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const secretKey = env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    return new Response(JSON.stringify({ success: false, error: 'Turnstile not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const formData = new FormData();
  formData.append('secret', secretKey);
  formData.append('response', token);
  formData.append('remoteip', request.headers.get('CF-Connecting-IP') || '');

  const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData
  });

  const outcome = await result.json();

  if (outcome.success) {
    const sessionId = await createSession(env);
    return new Response(JSON.stringify({ success: true, redirect: '/' }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Set-Cookie': getSessionCookie(sessionId)
      }
    });
  }

  return new Response(JSON.stringify({ success: false, error: 'Verification failed' }), {
    status: 400,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

export async function requireTurnstile(request, env) {
  if (!env.TURNSTILE_SITE_KEY || !env.TURNSTILE_SECRET_KEY) {
    return null;
  }

  const sessionId = getSessionFromCookie(request);
  const valid = await isSessionValid(sessionId, env);

  if (!valid) {
    return handleTurnstilePage(env);
  }

  return null;
}
