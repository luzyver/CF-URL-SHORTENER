export function getHomeHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LZVR Short — Simplify Your Links</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-body: #F4F7F9;
      --bg-surface: #FFFFFF;
      --primary: #3B82F6;
      --primary-hover: #2563EB;
      --primary-light: #EFF6FF;
      --text-main: #1E293B;
      --text-secondary: #64748B;
      --text-muted: #94A3B8;
      --border: #E2E8F0;
      --input-bg: #F8FAFC;
      --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
      --shadow-lg: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
      --success: #10B981;
      --success-light: #D1FAE5;
      --danger: #EF4444;
      --danger-light: #FEE2E2;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg-body);
      color: var(--text-main);
      min-height: 100vh;
      line-height: 1.6;
    }
    .hero {
      background: linear-gradient(135deg, #FFFFFF 0%, #F0F7FF 100%);
      padding: 80px 24px 60px;
      text-align: center;
      border-bottom: 1px solid var(--border);
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--primary-light);
      color: var(--primary);
      font-size: 0.8rem;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 50px;
      margin-bottom: 24px;
    }
    .hero-badge svg {
      width: 14px;
      height: 14px;
    }
    .hero h1 {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 16px;
      letter-spacing: -0.025em;
    }
    .hero h1 span {
      color: var(--primary);
    }
    .hero p {
      font-size: 1.125rem;
      color: var(--text-secondary);
      max-width: 500px;
      margin: 0 auto;
      font-weight: 400;
    }
    .main-content {
      max-width: 680px;
      margin: 0 auto;
      padding: 0 24px;
      transform: translateY(-40px);
    }
    .card {
      background: var(--bg-surface);
      border-radius: 16px;
      padding: 40px;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border);
    }
    .card-header {
      margin-bottom: 28px;
    }
    .card-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-main);
      margin-bottom: 6px;
    }
    .card-description {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }
    .card-description strong {
      color: var(--primary);
      font-weight: 600;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-main);
      margin-bottom: 8px;
    }
    input, select {
      width: 100%;
      padding: 14px 16px;
      background: var(--input-bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      color: var(--text-main);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }
    input:focus, select:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
      background: var(--bg-surface);
    }
    input::placeholder {
      color: var(--text-muted);
      font-family: 'JetBrains Mono', monospace;
    }
    select {
      cursor: pointer;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    @media (max-width: 600px) {
      .form-row { grid-template-columns: 1fr; }
      .card { padding: 28px 20px; }
      .hero { padding: 60px 20px 50px; }
    }
    .btn {
      padding: 14px 28px;
      border: none;
      border-radius: 10px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .btn-primary {
      background: var(--primary);
      color: white;
      width: 100%;
      box-shadow: 0 1px 3px rgba(59, 130, 246, 0.3);
    }
    .btn-primary:hover {
      background: var(--primary-hover);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);
      transform: translateY(-1px);
    }
    .btn-primary:active {
      transform: translateY(0);
    }
    .btn-copy {
      background: var(--primary-light);
      color: var(--primary);
      padding: 10px 18px;
      font-size: 0.875rem;
    }
    .btn-copy:hover {
      background: var(--primary);
      color: white;
    }
    .result {
      display: none;
      background: var(--success-light);
      border: 1px solid #A7F3D0;
      border-radius: 10px;
      padding: 20px;
      margin-top: 24px;
    }
    .result.show {
      display: block;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .result-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #059669;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .result-url {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .result-url span {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1rem;
      color: #047857;
      word-break: break-all;
      font-weight: 500;
    }
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      padding: 14px 20px;
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      color: var(--text-main);
      font-size: 0.9rem;
      font-weight: 500;
      box-shadow: var(--shadow-lg);
      transform: translateX(120%);
      transition: transform 0.3s ease;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .toast::before {
      content: '';
      width: 8px;
      height: 8px;
      background: var(--success);
      border-radius: 50%;
    }
    .toast.show { transform: translateX(0); }
    .toast.error { border-color: var(--danger); }
    .toast.error::before { background: var(--danger);     }
    .loading {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .footer {
      text-align: center;
      padding: 40px 24px 60px;
    }
    .footer a {
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      padding: 10px 20px;
      border-radius: 8px;
      transition: all 0.2s;
    }
    .footer a:hover {
      color: var(--primary);
      background: var(--primary-light);
    }
  </style>
</head>
<body>
  <section class="hero">
    <div class="hero-badge">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
      Powered by Cloudflare Workers
    </div>
    <h1>LZVR <span>Short</span></h1>
    <p>Simplify your links. Fast, free, and reliable URL shortener.</p>
  </section>

  <main class="main-content">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Shorten Your Link</h2>
        <p class="card-description" id="remainingInfo">
          Free to use — up to <strong>5 links per day</strong>
        </p>
      </div>
      
      <form id="shortenForm">
        <div class="form-group">
          <label for="url">Destination URL</label>
          <input type="url" id="url" placeholder="https://example.com/your-long-url" required />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="customSlug">Custom Slug (optional)</label>
            <input type="text" id="customSlug" placeholder="my-link" pattern="[a-zA-Z0-9-_]+" />
          </div>
          <div class="form-group">
            <label for="expiresIn">Expiration</label>
            <select id="expiresIn">
              <option value="">Never expires</option>
              <option value="3600">1 Hour</option>
              <option value="86400">1 Day</option>
              <option value="604800">1 Week</option>
              <option value="2592000">1 Month</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
          </svg>
          Shorten URL
        </button>
      </form>
      
      <div class="result" id="result">
        <div class="result-label">Your short link is ready</div>
        <div class="result-url">
          <span id="shortUrl"></span>
          <button class="btn btn-copy" onclick="copyUrl()">Copy</button>
        </div>
      </div>
    </div>
  </main>

  <footer class="footer">
    <a href="/admin" id="adminLink">Admin Panel →</a>
  </footer>

  <div class="toast" id="toast"></div>

  <script>
    const SESSION_KEY = 'ts_session_token';
    let browserFingerprint = null;

    function handleSessionToken() {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('_ts');
      if (token) {
        try { localStorage.setItem(SESSION_KEY, token); } catch(e) {}
        params.delete('_ts');
        const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
        window.history.replaceState({}, '', newUrl);
      }
    }

    function getSessionToken() {
      try { return localStorage.getItem(SESSION_KEY); } catch(e) { return null; }
    }

    async function generateFingerprint() {
      const components = [];
      components.push(screen.width + 'x' + screen.height);
      components.push(screen.colorDepth);
      components.push(window.devicePixelRatio || 1);
      components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
      components.push(navigator.language);
      components.push(navigator.languages?.join(',') || '');
      components.push(navigator.platform);
      components.push(navigator.hardwareConcurrency || 0);
      components.push(navigator.userAgent);
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 50;
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillStyle = '#f60';
        ctx.fillRect(0, 0, 100, 50);
        ctx.fillStyle = '#069';
        ctx.fillText('Fingerprint', 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText('Canvas', 4, 30);
        components.push(canvas.toDataURL());
      } catch (e) {
        components.push('canvas-error');
      }
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            components.push(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL));
            components.push(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
          }
        }
      } catch (e) {
        components.push('webgl-error');
      }
      const data = components.join('|||');
      const encoder = new TextEncoder();
      const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async function checkRemaining() {
      if (!browserFingerprint) return;
      try {
        const headers = { 'Content-Type': 'application/json' };
        const token = getSessionToken();
        if (token) headers['X-Session-Token'] = token;
        const response = await fetch('/api/remaining', {
          method: 'POST',
          headers,
          body: JSON.stringify({ fingerprint: browserFingerprint })
        });
        const data = await response.json();
        if (response.ok) {
          document.getElementById('remainingInfo').innerHTML = 
            'You have <strong>' + data.remaining + '</strong> of ' + data.limit + ' links remaining today';
        }
      } catch (e) {}
    }

    document.addEventListener('DOMContentLoaded', async () => {
      handleSessionToken();
      browserFingerprint = await generateFingerprint();
      await checkRemaining();
    });

    function showToast(message, isError = false) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.className = 'toast show' + (isError ? ' error' : '');
      setTimeout(() => { toast.className = 'toast'; }, 3000);
    }

    document.getElementById('shortenForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const url = document.getElementById('url').value;
      const customSlug = document.getElementById('customSlug').value;
      const expiresIn = document.getElementById('expiresIn').value;
      const btn = e.target.querySelector('button[type="submit"]');
      btn.innerHTML = '<span class="loading"></span>';
      btn.disabled = true;
      try {
        const headers = { 'Content-Type': 'application/json' };
        const token = getSessionToken();
        if (token) headers['X-Session-Token'] = token;
        const response = await fetch('/api/shorten', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            url,
            customSlug: customSlug || undefined,
            expiresIn: expiresIn ? parseInt(expiresIn) : undefined,
            fingerprint: browserFingerprint
          })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to shorten URL');
        document.getElementById('shortUrl').textContent = data.shortUrl;
        document.getElementById('result').classList.add('show');
        const remainingMsg = data.remaining !== undefined ? ' (' + data.remaining + ' remaining today)' : '';
        showToast('Short link created!' + remainingMsg);
        if (data.remaining !== undefined) {
          document.getElementById('remainingInfo').innerHTML = 
            'You have <strong>' + data.remaining + '</strong> of 5 links remaining today';
        }
        document.getElementById('url').value = '';
        document.getElementById('customSlug').value = '';
        document.getElementById('expiresIn').value = '';
      } catch (error) {
        showToast(error.message, true);
      } finally {
        btn.innerHTML = '<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg> Shorten URL';
        btn.disabled = false;
      }
    });

    function copyUrl() {
      navigator.clipboard.writeText(document.getElementById('shortUrl').textContent);
      showToast('Link copied to clipboard!');
    }

    document.getElementById('adminLink').addEventListener('click', (e) => {
      const token = getSessionToken();
      if (token) {
        e.preventDefault();
        window.location.href = '/admin?_ts=' + token;
      }
    });
  </script>
</body>
</html>`;
}
