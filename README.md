# CF-URL-Shortener

URL Shortener menggunakan Cloudflare Workers dan KV Storage.

## Features

- Super cepat dengan Cloudflare Edge Network
- KV Storage untuk penyimpanan link
- Tracking jumlah klik
- Link dengan expiration time
- UI modern dan responsive
- Public access - siapa saja bisa buat short link
- Rate limiting - max 5 link per hari (browser fingerprint)
- Admin panel dengan API Key authentication
- Mobile-friendly dashboard

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

### 4. Development

```bash
npm run dev
```

Buka `http://localhost:8787` di browser.

### 5. Set Admin API Key (Secret)

```bash
npx wrangler secret put ADMIN_API_KEY
```

### 6. Deploy Manual

```bash
npm run deploy
```

## GitHub Actions (Auto Deploy)

Workflow akan otomatis deploy saat push ke branch `main` atau `master`.

### Setup GitHub Secrets

Buka **Settings > Secrets and variables > Actions** di repository GitHub, lalu tambahkan:

| Secret Name | Deskripsi |
|-------------|-----------|
| `CLOUDFLARE_API_TOKEN` | API Token dengan permission: `Workers KV Storage:Edit`, `Workers Scripts:Edit` |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID (Dashboard > Workers & Pages > kanan atas) |
| `ADMIN_API_KEY` | API Key untuk admin panel |

### Workflow Features

- Auto create KV namespace jika belum ada
- Auto update `wrangler.toml` dengan KV ID
- Auto deploy worker
- Auto set secrets (ADMIN_API_KEY)

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

## Usage

1. Buka URL worker Anda (atau `http://localhost:8787` untuk development)
2. Paste URL panjang yang ingin dipendekkan
3. (Optional) Tambahkan custom slug dan expiration time
4. Klik "Shorten URL"
5. Copy dan bagikan short link Anda!

**Admin Panel:**
1. Masukkan Admin API Key
2. Klik "Connect" untuk melihat dan mengelola semua link

## Project Structure

```
src/
├── index.js        # Entry point & routing
├── handlers.js     # API handlers
├── utils.js        # Utility functions
└── html/
    ├── admin.js    # Dashboard HTML
    └── 404.js      # 404 page HTML
```

## License

MIT
