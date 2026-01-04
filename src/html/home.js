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
      --input-bg: #FFFFFF;
      --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
      --shadow-lg: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
      --success: #10B981;
      --success-light: #ECFDF5;
      --danger: #EF4444;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { height: 100%; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(180deg, #FFFFFF 0%, #F4F7F9 50%, #EEF2F6 100%);
      color: var(--text-main);
      min-height: 100%;
      display: flex;
      flex-direction: column;
      line-height: 1.6;
    }
    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 60px 24px 40px;
      max-width: 600px;
      margin: 0 auto;
      width: 100%;
    }
    .hero {
      text-align: center;
      margin-bottom: 48px;
    }
    .hero h1 {
      font-size: clamp(2.5rem, 6vw, 3.5rem);
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 12px;
      letter-spacing: -0.03em;
    }
    .hero h1 span {
      color: var(--primary);
    }
    .hero p {
      font-size: 1.125rem;
      color: var(--text-secondary);
      font-weight: 400;
    }
    .form-section {
      margin-bottom: 32px;
    }
    .form-group {
      margin-bottom: 16px;
    }
    .form-group label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    input, select {
      width: 100%;
      padding: 16px 20px;
      background: var(--input-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      color: var(--text-main);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      box-shadow: var(--shadow);
    }
    input:focus, select:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
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
      gap: 12px;
    }
    .btn {
      padding: 16px 32px;
      border: none;
      border-radius: 12px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    .btn-primary {
      background: var(--primary);
      color: white;
      width: 100%;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.35);
    }
    .btn-primary:hover {
      background: var(--primary-hover);
      box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
      transform: translateY(-2px);
    }
    .btn-primary:active {
      transform: translateY(0);
    }
    .btn-copy {
      background: var(--primary);
      color: white;
      padding: 10px 20px;
      font-size: 0.875rem;
      box-shadow: none;
    }
    .btn-copy:hover {
      background: var(--primary-hover);
    }
    .result {
      display: none;
      background: var(--success-light);
      border: 1px solid #A7F3D0;
      border-radius: 12px;
      padding: 20px 24px;
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
    .result-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    .result-header svg {
      width: 18px;
      height: 18px;
      color: #059669;
    }
    .result-header span {
      font-size: 0.8rem;
      font-weight: 600;
      color: #059669;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .result-url {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: white;
      border-radius: 8px;
      padding: 12px 16px;
    }
    .result-url span {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.95rem;
      color: #047857;
      word-break: break-all;
      font-weight: 500;
    }
    .info-text {
      text-align: center;
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-top: 20px;
    }
    .info-text strong {
      color: var(--text-secondary);
      font-weight: 600;
    }
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      padding: 14px 20px;
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: 12px;
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
    .toast.error::before { background: var(--danger); }
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
    footer {
      padding: 32px 24px;
      text-align: center;
      border-top: 1px solid var(--border);
      background: var(--bg-surface);
    }
    .footer-content {
      max-width: 600px;
      margin: 0 auto;
    }
    .footer-text {
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    @media (max-width: 600px) {
      main { padding: 40px 20px 32px; }
      .form-row { grid-template-columns: 1fr; }
      .hero h1 { font-size: 2rem; }
      .hero { margin-bottom: 36px; }
      input, select { padding: 14px 16px; }
    }
  </style>
</head>
<body>
  <main>
    <div class="hero">
      <h1>LZVR <span>Short</span></h1>
      <p>Simplify your links. Fast, free, and reliable.</p>
    </div>

    <div class="form-section">
      <form id="shortenForm">
        <div class="form-group">
          <label for="url">Paste your long URL</label>
          <input type="url" id="url" placeholder="https://example.com/your-very-long-url-here" required />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="customSlug">Custom alias (optional)</label>
            <input type="text" id="customSlug" placeholder="my-link" pattern="[a-zA-Z0-9-_]+" />
          </div>
          <div class="form-group">
            <label for="expiresIn">Link expiration</label>
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
        <div class="result-header">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Your short link is ready</span>
        </div>
        <div class="result-url">
          <span id="shortUrl"></span>
          <button class="btn btn-copy" onclick="copyUrl()">Copy</button>
        </div>
      </div>

      <p class="info-text" id="remainingInfo">
        Free to use — up to <strong>5 links</strong> per day
      </p>
    </div>
  </main>

  <footer>
    <div class="footer-content">
      <p class="footer-text">© 2025 LZVR Short. All rights reserved.</p>
    </div>
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
  </script>
</body>
</html>`;
}
