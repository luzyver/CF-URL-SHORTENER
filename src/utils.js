export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW = 86400;

export function verifyApiKey(request, env) {
  const apiKey = request.headers.get('X-API-Key');
  return apiKey === env.ADMIN_API_KEY;
}

export function generateSlug(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

export async function checkRateLimit(fingerprint, env) {
  if (!fingerprint) {
    return { allowed: false, remaining: 0, error: 'Fingerprint required' };
  }
  
  const today = getTodayKey();
  const rateLimitKey = `ratelimit:${fingerprint}:${today}`;
  
  const currentCount = await env.LINKS.get(rateLimitKey);
  const count = currentCount ? parseInt(currentCount) : 0;
  
  if (count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, count };
  }
  
  const newCount = count + 1;
  await env.LINKS.put(rateLimitKey, newCount.toString(), { expirationTtl: RATE_LIMIT_WINDOW });
  
  return { allowed: true, remaining: RATE_LIMIT_MAX - newCount, count: newCount };
}

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
};
