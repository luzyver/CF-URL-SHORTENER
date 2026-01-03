import { corsHeaders } from './utils.js';
import { getAdminHTML } from './html/admin.js';
import {
  handleShorten,
  handleRedirect,
  handleListLinks,
  handleDelete,
  handleCheckRemaining,
  handleStats,
} from './handlers.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if (path === '/' || path === '/admin') {
        return new Response(getAdminHTML(), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }

      if (path === '/api/shorten' && request.method === 'POST') {
        return await handleShorten(request, env);
      }

      if (path === '/api/links' && request.method === 'GET') {
        return await handleListLinks(request, env);
      }

      if (path.startsWith('/api/delete/') && request.method === 'DELETE') {
        return await handleDelete(request, env, path);
      }

      if (path.startsWith('/api/stats/') && request.method === 'GET') {
        return await handleStats(request, env, path);
      }

      if (path === '/api/remaining' && request.method === 'POST') {
        return await handleCheckRemaining(request, env);
      }

      const slug = path.slice(1);
      if (slug && slug.length > 0) {
        return await handleRedirect(slug, env);
      }

      return new Response('Not Found', { status: 404 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
