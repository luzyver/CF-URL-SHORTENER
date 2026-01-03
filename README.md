# CF-URL-Shortener

URL Shortener menggunakan Cloudflare Workers dan KV Storage.

## Features

- Super cepat dengan Cloudflare Edge Network
- KV Storage untuk penyimpanan link
- Tracking jumlah klik
- Link dengan expiration time (auto-delete)
- UI modern dan responsive
- Public access - siapa saja bisa buat short link
- Rate limiting - max 5 link per hari (browser fingerprint + IP)
- Admin panel dengan API Key authentication
- Cloudflare Turnstile protection (anti-bot)
- Session fallback untuk browser privacy-focused
- Custom domain support
- Mobile-friendly dashboard

## Security Features

- Payload size limit (10KB)
- URL validation (HTTP/HTTPS only)
- Blocked protocols (javascript:, data:, vbscript:, file:)
- Slug validation (alphanumeric, hyphen, underscore only)
- Reserved slugs protection (api, admin, static, assets)
- IP + Fingerprint rate limiting
- Turnstile human verification with session management

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Buat KV Namespace

```bash
npx wrangler login
npx wrangler kv:namespace create "LINKS"
npx wrangler kv:namespace create "LINKS" --preview
```

### 3. Update wrangler.toml

Copy ID yang didapat dari langkah sebelumnya ke `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "LINKS"
id = "your-production-kv-id"
preview_id = "your-preview-kv-id"
```

Jika menggunakan GitHub Actions, KV ID akan di-set otomatis.

### 4. Setup Cloudflare Turnstile (Optional)

1. Buka Cloudflare Dashboard > Turnstile
2. Create new site
3. Copy Site Key dan Secret Key
4. Set sebagai GitHub Secrets atau wrangler secrets

### 5. Development

```bash
npm run dev
```

Buka `http://localhost:8787` di browser.

### 6. Set Secrets

```bash
npx wrangler secret put ADMIN_API_KEY
npx wrangler secret put TURNSTILE_SECRET_KEY
```

### 7. Deploy Manual

```bash
npm run deploy
```

## GitHub Actions (Auto Deploy)

Workflow akan otomatis deploy saat push ke branch `main` atau `master`.

### Setup GitHub Secrets

Buka **Settings > Secrets and variables > Actions** di repository GitHub, lalu tambahkan:

| Secret Name | Deskripsi |
|-------------|-----------|
| `CLOUDFLARE_API_TOKEN` | API Token dengan permission: `Workers KV Storage:Edit`, `Workers Scripts:Edit`, `Zone:Workers Routes:Edit` |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID (Dashboard > Workers & Pages > kanan atas) |
| `ADMIN_API_KEY` | API Key untuk admin panel |
| `TURNSTILE_SITE_KEY` | Turnstile Site Key (optional) |
| `TURNSTILE_SECRET_KEY` | Turnstile Secret Key (optional) |

### Workflow Features

- Auto create KV namespace jika belum ada
- Auto update `wrangler.toml` dengan KV ID
- Auto deploy worker
- Auto set secrets (ADMIN_API_KEY, TURNSTILE_SECRET_KEY)

## Custom Domain

Edit `wrangler.toml` untuk menggunakan custom domain:

```toml
routes = [
  { pattern = "yourdomain.com/*", zone_name = "yourdomain.com" }
]
```

Pastikan API Token memiliki permission `Zone:Workers Routes:Edit` untuk zone tersebut.

## API Endpoints

### Create Short Link (Public)
```http
POST /api/shorten
Content-Type: application/json

{
  "url": "https://example.com/long-url",
  "fingerprint": "browser-fingerprint-hash",
  "customSlug": "my-slug",
  "expiresIn": 86400
}
```

Response:
```json
{
  "success": true,
  "slug": "abc123",
  "shortUrl": "https://your-domain.com/abc123",
  "remaining": 4
}
```

### Check Remaining Limit (Public)
```http
POST /api/remaining
Content-Type: application/json

{
  "fingerprint": "browser-fingerprint-hash"
}
```

Response:
```json
{
  "used": 1,
  "remaining": 4,
  "limit": 5
}
```

### Turnstile Verify (Public)
```http
POST /api/turnstile/verify
Content-Type: application/json

{
  "token": "turnstile-response-token"
}
```

Response:
```json
{
  "success": true,
  "redirect": "/",
  "sessionToken": "session-id-for-fallback"
}
```

### List All Links (Admin)
```http
GET /api/links
X-API-Key: your-admin-api-key
```

### Get Link Stats (Admin)
```http
GET /api/stats/:slug
X-API-Key: your-admin-api-key
```

### Delete Link (Admin)
```http
DELETE /api/delete/:slug
X-API-Key: your-admin-api-key
```

### Redirect (Public)
```http
GET /:slug
```

## Session Management

Untuk browser yang memblokir cookies (seperti Pawxy), sistem mendukung fallback:

1. **Cookie** - Default method (`ts_session`)
2. **Query Parameter** - Fallback via `?_ts=token`
3. **Header** - API calls via `X-Session-Token`

Session valid selama 1 jam.

## Rate Limiting

| Type | Limit | Window |
|------|-------|--------|
| Per Fingerprint | 5 links | 24 jam |
| Per IP | 15 links | 24 jam |

Rate limit data otomatis dihapus setelah expired (TTL).

## Usage

### Public User
1. Buka URL worker atau custom domain
2. Selesaikan Turnstile verification (jika enabled)
3. Paste URL panjang yang ingin dipendekkan
4. (Optional) Tambahkan custom slug dan expiration time
5. Klik "Shorten URL"
6. Copy dan bagikan short link

### Admin Panel
1. Buka `/admin`
2. Masukkan Admin API Key
3. Klik "Connect" untuk melihat dan mengelola semua link

## Project Structure

```
src/
├── index.js          # Entry point & routing
├── handlers.js       # API handlers
├── utils.js          # Utility functions & validation
├── turnstile.js      # Turnstile verification & session
└── html/
    ├── home.js       # Public homepage
    ├── admin.js      # Admin dashboard
    ├── turnstile.js  # Turnstile verification page
    └── 404.js        # 404 page
```

## Environment Variables

| Variable | Type | Deskripsi |
|----------|------|-----------|
| `ADMIN_API_KEY` | Secret | API Key untuk admin panel |
| `TURNSTILE_SITE_KEY` | Variable | Turnstile Site Key |
| `TURNSTILE_SECRET_KEY` | Secret | Turnstile Secret Key |

## KV Keys

| Prefix | Deskripsi | TTL |
|--------|-----------|-----|
| `{slug}` | Short link data | Custom/permanent |
| `ratelimit:fp:{fingerprint}:{date}` | Fingerprint rate limit | 24 jam |
| `ratelimit:ip:{ip}:{date}` | IP rate limit | 24 jam |
| `session:{id}` | Turnstile session | 1 jam |

Semua key dengan TTL akan otomatis dihapus oleh Cloudflare KV.

## License

MIT
