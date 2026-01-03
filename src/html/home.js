export function getHomeHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CF-URL-Shortener</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-primary: #0a0a0f;
      --bg-secondary: #12121a;
      --bg-tertiary: #1a1a25;
      --accent: #00ff88;
      --accent-dim: #00ff8833;
      --accent-secondary: #00d4ff;
      --text-primary: #ffffff;
      --text-secondary: #8888aa;
      --text-muted: #555566;
      --border: #2a2a3a;
      --danger: #ff4466;
      --danger-dim: #ff446633;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Outfit', sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      min-height: 100vh;
      background-image: 
        radial-gradient(ellipse at 20% 20%, var(--accent-dim) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%);
    }
    .container { max-width: 700px; margin: 0 auto; padding: 40px 20px; }
    header { text-align: center; margin-bottom: 50px; }
    .logo {
      font-family: 'JetBrains Mono', monospace;
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 10px;
      letter-spacing: -2px;
    }
    .tagline { color: var(--text-secondary); font-size: 1.1rem; font-weight: 300; }
    .card {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 30px;
      margin-bottom: 30px;
    }
    .card-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .card-title::before {
      content: '';
      width: 8px;
      height: 8px;
      background: var(--accent);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--accent);
    }
    .form-group { margin-bottom: 20px; }
    label { display: block; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 8px; font-weight: 500; }
    input, select {
      width: 100%;
      padding: 14px 18px;
      background: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: 10px;
      color: var(--text-primary);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.95rem;
      transition: all 0.3s ease;
    }
    input:focus, select:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-dim);
    }
    input::placeholder { color: var(--text-muted); }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
    .btn {
      padding: 14px 28px;
      border: none;
      border-radius: 10px;
      font-family: 'Outfit', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-primary {
      background: linear-gradient(135deg, var(--accent), #00cc66);
      color: var(--bg-primary);
      width: 100%;
      justify-content: center;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px var(--accent-dim); }
    .btn-copy { background: var(--bg-tertiary); color: var(--text-secondary); padding: 8px 14px; font-size: 0.85rem; }
    .btn-copy:hover { background: var(--accent-dim); color: var(--accent); }
    .result {
      display: none;
      background: var(--bg-tertiary);
      border: 1px solid var(--accent);
      border-radius: 10px;
      padding: 20px;
      margin-top: 20px;
    }
    .result.show { display: block; animation: slideIn 0.3s ease; }
    @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    .result-url {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.1rem;
      color: var(--accent);
      word-break: break-all;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
    }
    .toast {
      position: fixed;
      bottom: 30px;
      right: 30px;
      padding: 16px 24px;
      background: var(--bg-secondary);
      border: 1px solid var(--accent);
      border-radius: 10px;
      color: var(--accent);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      transform: translateX(150%);
      transition: transform 0.3s ease;
      z-index: 1000;
    }
    .toast.show { transform: translateX(0); }
    .toast.error { border-color: var(--danger); color: var(--danger); }
    .loading {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid var(--text-muted);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .footer { text-align: center; margin-top: 30px; color: var(--text-muted); font-size: 0.85rem; }
    .footer a { color: var(--accent); text-decoration: none; }
    .footer a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1 class="logo">&lt;/shorted&gt;</h1>
      <p class="tagline">Lightning-fast URL shortener powered by Cloudflare Workers</p>
    </header>

    <div class="card">
      <div class="card-title">Create Short Link</div>
      <p id="remainingInfo" style="color: var(--text-secondary); margin-bottom: 20px; font-size: 0.9rem;">
        Free to use! Max <strong style="color: var(--accent);">5 links per day</strong>
      </p>
      <form id="shortenForm">
        <div class="form-group">
          <label>Destination URL</label>
          <input type="url" id="url" placeholder="https://example.com/your-long-url" required />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Custom Slug (optional)</label>
            <input type="text" id="customSlug" placeholder="my-custom-link" pattern="[a-zA-Z0-9-_]+" />
          </div>
          <div class="form-group">
            <label>Expires In</label>
            <select id="expiresIn">
              <option value="">Never</option>
              <option value="3600">1 Hour</option>
              <option value="86400">1 Day</option>
              <option value="604800">1 Week</option>
              <option value="2592000">1 Month</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
          </svg>
          Shorten URL
        </button>
      </form>
      <div class="result" id="result">
        <div class="result-url">
          <span id="shortUrl"></span>
          <button class="btn btn-copy" onclick="copyUrl()">Copy</button>
        </div>
      </div>
    </div>

    <div class="footer">
      <a href="/admin" id="adminLink">Admin Panel</a>
    </div>
  </div>

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
            'You have <strong style="color: var(--accent);">' + data.remaining + '</strong> of ' + data.limit + ' links remaining today';
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
            'You have <strong style="color: var(--accent);">' + data.remaining + '</strong> of 5 links remaining today';
        }
        document.getElementById('url').value = '';
        document.getElementById('customSlug').value = '';
        document.getElementById('expiresIn').value = '';
      } catch (error) {
        showToast(error.message, true);
      } finally {
        btn.innerHTML = '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg> Shorten URL';
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

