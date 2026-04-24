import { kv } from './kv.js'

export const env = {
  LINKS: kv,
  ADMIN_API_KEY:        process.env.ADMIN_API_KEY        || '',
  TURNSTILE_SITE_KEY:   process.env.TURNSTILE_SITE_KEY   || '',
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY || '',
}