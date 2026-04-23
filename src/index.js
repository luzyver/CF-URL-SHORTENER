import { corsHeaders } from './utils.js';
import { getHomeHTML } from './html/home.js';
import { getAdminHTML } from './html/admin.js';
import { get404HTML } from './html/404.js';
import {
  handleShorten,
  handleRedirect,
  handleListLinks,
  handleDelete,
  handleStats,
} from './handlers.js';
import { requireTurnstile, handleTurnstileVerify } from './turnstile.js';

// Security headers applied to every HTML response
const htmlHeaders = {
  'Content-Type': 'text/html; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Cache-Control': 'no-store',
};

// Security headers applied to every JSON API response
const apiHeaders = {
  ...corsHeaders,
  'Content-Type': 'application/json',
  'X-Content-Type-Options': 'nosniff',
  'Cache-Control': 'no-store',
};

/**
 * Wraps a Response returned by requireTurnstile() (an HTML challenge page)
 * with the full set of HTML security headers, preserving the original status
 * code and any headers already set by the turnstile module.
 */
// Known link-preview and indexing crawlers — these cannot complete a
// Turnstile challenge, so we let them through directly to the redirect.
const CRAWLER_UA = [
  'facebookexternalhit',
  'facebookcatalog',
  'twitterbot',
  'telegrambot',
  'whatsapp',
  'slackbot',
  'slack-imgproxy',
  'linkedinbot',
  'discordbot',
  'pinterest',
  'googlebot',
  'bingbot',
  'applebot',
  'redditbot',
  'iframely',
  'embedly',
  'vkshare',
  'line-poker',
  'sogou',
  'tumblr',
  'skypeuripreview',
];

function isCrawler(request) {
  const ua = (request.headers.get('User-Agent') || '').toLowerCase();
  return CRAWLER_UA.some(bot => ua.includes(bot));
}

function wrapWithHtmlHeaders(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(htmlHeaders)) {
    headers.set(key, value);
  }
  return new Response(response.body, { status: response.status, headers });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // ── Turnstile token exchange ──────────────────────────────────────────
      if (path === '/api/turnstile/verify' && request.method === 'POST') {
        return await handleTurnstileVerify(request, env);
      }

      // ── Home page ─────────────────────────────────────────────────────────
      if (path === '/') {
        const turnstileResponse = await requireTurnstile(request, env);
        if (turnstileResponse) {
          return wrapWithHtmlHeaders(turnstileResponse);
        }
        return new Response(getHomeHTML(), { headers: htmlHeaders });
      }

      // ── Admin page ────────────────────────────────────────────────────────
      if (path === '/admin') {
        const turnstileResponse = await requireTurnstile(request, env);
        if (turnstileResponse) {
          return wrapWithHtmlHeaders(turnstileResponse);
        }
        return new Response(getAdminHTML(), { headers: htmlHeaders });
      }

      // ── Shorten API ───────────────────────────────────────────────────────
      if (path === '/api/shorten' && request.method === 'POST') {
        const turnstileResponse = await requireTurnstile(request, env);
        if (turnstileResponse) {
          return wrapWithHtmlHeaders(turnstileResponse);
        }
        return await handleShorten(request, env);
      }

      // ── List links (admin) ────────────────────────────────────────────────
      if (path === '/api/links' && request.method === 'GET') {
        return await handleListLinks(request, env);
      }

      // ── Delete link (admin) ───────────────────────────────────────────────
      if (path.startsWith('/api/delete/') && request.method === 'DELETE') {
        return await handleDelete(request, env, path);
      }

      // ── Stats (admin) ─────────────────────────────────────────────────────
      if (path.startsWith('/api/stats/') && request.method === 'GET') {
        return await handleStats(request, env, path);
      }

      // ── Short-link redirect ───────────────────────────────────────────────
      const slug = path.slice(1);

      if (slug && slug.length > 0) {
        // Reject slugs that contain path-traversal sequences or illegal chars.
        // Valid slugs may only contain alphanumerics, hyphens, and underscores.
        if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
          return new Response(get404HTML(), { status: 404, headers: htmlHeaders });
        }
        // Skip Turnstile for known link-preview bots so OG metadata
        // can be fetched from the destination URL.
        if (!isCrawler(request)) {
          const turnstileResponse = await requireTurnstile(request, env);
          if (turnstileResponse) {
            return wrapWithHtmlHeaders(turnstileResponse);
          }
        }
        return await handleRedirect(slug, env);
      }

      // ── Catch-all 404 ─────────────────────────────────────────────────────
      return new Response(get404HTML(), { status: 404, headers: htmlHeaders });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: apiHeaders,
      });
    }
  },
};