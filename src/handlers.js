import { 
  verifyApiKey, 
  generateSlug, 
  checkRateLimit, 
  getTodayKey,
  RATE_LIMIT_MAX,
  corsHeaders 
} from './utils.js';
import { get404HTML } from './html/404.js';

export async function handleShorten(request, env) {
  const body = await request.json();
  const { url, customSlug, expiresIn, fingerprint } = body;

  const rateLimit = await checkRateLimit(fingerprint, env);
  if (!rateLimit.allowed) {
    return new Response(
      JSON.stringify({ 
        error: rateLimit.error || 'Rate limit exceeded. Maximum 5 links per day.',
        remaining: 0
      }), 
      {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  if (!url) {
    return new Response(JSON.stringify({ error: 'URL is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    new URL(url);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid URL format' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let slug = customSlug || generateSlug();

  if (customSlug) {
    const existing = await env.LINKS.get(slug);
    if (existing) {
      return new Response(JSON.stringify({ error: 'Slug already exists' }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }

  const linkData = {
    url,
    createdAt: new Date().toISOString(),
    clicks: 0,
  };

  const options = {};
  if (expiresIn && expiresIn > 0) {
    options.expirationTtl = expiresIn;
    linkData.expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
  }

  await env.LINKS.put(slug, JSON.stringify(linkData), options);

  const shortUrl = new URL(request.url).origin + '/' + slug;

  return new Response(
    JSON.stringify({
      success: true,
      slug,
      shortUrl,
      originalUrl: url,
      createdAt: linkData.createdAt,
      expiresAt: linkData.expiresAt || null,
      remaining: rateLimit.remaining,
    }),
    {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}

export async function handleRedirect(slug, env) {
  const data = await env.LINKS.get(slug);

  if (!data) {
    return new Response(get404HTML(), {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const linkData = JSON.parse(data);

  linkData.clicks = (linkData.clicks || 0) + 1;
  linkData.lastClickedAt = new Date().toISOString();

  await env.LINKS.put(slug, JSON.stringify(linkData));

  return Response.redirect(linkData.url, 302);
}

export async function handleListLinks(request, env) {
  if (!verifyApiKey(request, env)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const list = await env.LINKS.list();
  const links = [];

  for (const key of list.keys) {
    if (key.name.startsWith('ratelimit:')) continue;
    
    const data = await env.LINKS.get(key.name);
    if (data) {
      try {
        const linkData = JSON.parse(data);
        if (linkData.url) {
          links.push({
            slug: key.name,
            ...linkData,
          });
        }
      } catch (e) {}
    }
  }

  links.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return new Response(JSON.stringify({ links }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

export async function handleDelete(request, env, path) {
  if (!verifyApiKey(request, env)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const slug = path.replace('/api/delete/', '');

  const existing = await env.LINKS.get(slug);
  if (!existing) {
    return new Response(JSON.stringify({ error: 'Link not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  await env.LINKS.delete(slug);

  return new Response(JSON.stringify({ success: true, deleted: slug }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

export async function handleCheckRemaining(request, env) {
  const body = await request.json();
  const { fingerprint } = body;
  
  if (!fingerprint) {
    return new Response(JSON.stringify({ error: 'Fingerprint required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  const today = getTodayKey();
  const rateLimitKey = `ratelimit:${fingerprint}:${today}`;
  
  const currentCount = await env.LINKS.get(rateLimitKey);
  const count = currentCount ? parseInt(currentCount) : 0;
  const remaining = Math.max(0, RATE_LIMIT_MAX - count);
  
  return new Response(
    JSON.stringify({
      used: count,
      remaining,
      limit: RATE_LIMIT_MAX,
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}

export async function handleStats(request, env, path) {
  if (!verifyApiKey(request, env)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const slug = path.replace('/api/stats/', '');

  const data = await env.LINKS.get(slug);
  if (!data) {
    return new Response(JSON.stringify({ error: 'Link not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const linkData = JSON.parse(data);

  return new Response(
    JSON.stringify({
      slug,
      ...linkData,
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}
