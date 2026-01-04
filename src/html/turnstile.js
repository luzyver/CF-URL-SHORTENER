export function getTurnstileHTML(siteKey) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify — LZVR Short</title>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-body: #F4F7F9;
      --bg-surface: #FFFFFF;
      --primary: #3B82F6;
      --text-main: #1E293B;
      --text-secondary: #64748B;
      --text-muted: #94A3B8;
      --border: #E2E8F0;
      --shadow-lg: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
      --success: #10B981;
      --danger: #EF4444;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg-body);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .container {
      text-align: center;
      padding: 48px 40px;
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      box-shadow: var(--shadow-lg);
      max-width: 420px;
      width: 100%;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 8px;
    }
    .logo span {
      color: var(--primary);
    }
    h2 {
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--text-secondary);
      margin-bottom: 32px;
    }
    .turnstile-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 24px;
    }
    .status {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-top: 16px;
      font-weight: 500;
    }
    .status.success { color: var(--success); }
    .status.error { color: var(--danger); }
    .loading {
      display: none;
      width: 24px;
      height: 24px;
      border: 2px solid var(--border);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      margin: 20px auto;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .shield-icon {
      width: 56px;
      height: 56px;
      margin: 0 auto 20px;
      background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .shield-icon svg {
      width: 28px;
      height: 28px;
      stroke: var(--primary);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="shield-icon">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
      </svg>
    </div>
    <div class="logo">LZVR<span>.</span></div>
    <h2>Please verify you're human</h2>
    <div class="turnstile-wrapper">
      <div class="cf-turnstile" 
           data-sitekey="${siteKey}" 
           data-callback="onVerify"
           data-theme="light">
      </div>
    </div>
    <div class="loading" id="loading"></div>
    <p class="status" id="status"></p>
  </div>

  <script>
    const SESSION_KEY = 'ts_session_token';
    
    function onVerify(token) {
      const status = document.getElementById('status');
      const loading = document.getElementById('loading');
      
      status.textContent = 'Verifying...';
      status.className = 'status';
      loading.style.display = 'block';

      fetch('/api/turnstile/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
        credentials: 'same-origin'
      })
      .then(res => res.json())
      .then(data => {
        loading.style.display = 'none';
        if (data.success) {
          let tokenStored = false;
          if (data.sessionToken) {
            try {
              localStorage.setItem(SESSION_KEY, data.sessionToken);
              tokenStored = localStorage.getItem(SESSION_KEY) === data.sessionToken;
            } catch(e) {}
          }
          status.textContent = 'Verified! Redirecting...';
          status.className = 'status success';
          setTimeout(() => {
            let redirect = data.redirect || '/';
            if (data.sessionToken) {
              redirect += (redirect.includes('?') ? '&' : '?') + '_ts=' + data.sessionToken;
            }
            window.location.href = redirect;
          }, 500);
        } else {
          status.textContent = data.error || 'Verification failed. Please try again.';
          status.className = 'status error';
          turnstile.reset();
        }
      })
      .catch(err => {
        loading.style.display = 'none';
        status.textContent = 'Error occurred. Please try again.';
        status.className = 'status error';
        turnstile.reset();
      });
    }
  </script>
</body>
</html>`;
}
