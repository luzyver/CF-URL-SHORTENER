export function getTurnstileHTML(siteKey) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify - CF-URL-Shortener</title>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Outfit', sans-serif;
      background: #0a0a0f;
      color: #fff;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: 
        radial-gradient(ellipse at 20% 20%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%);
    }
    .container {
      text-align: center;
      padding: 40px;
      background: #12121a;
      border: 1px solid #2a2a3a;
      border-radius: 16px;
      max-width: 400px;
      width: 90%;
    }
    .logo {
      font-family: 'JetBrains Mono', monospace;
      font-size: 2rem;
      font-weight: 700;
      background: linear-gradient(135deg, #00ff88, #00d4ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 10px;
    }
    h2 {
      font-size: 1.2rem;
      font-weight: 400;
      color: #8888aa;
      margin-bottom: 30px;
    }
    .turnstile-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
    .status {
      font-size: 0.9rem;
      color: #555566;
      margin-top: 20px;
    }
    .status.success { color: #00ff88; }
    .status.error { color: #ff4466; }
    .loading {
      display: none;
      width: 24px;
      height: 24px;
      border: 2px solid #555566;
      border-top-color: #00ff88;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 20px auto;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">&lt;/shorted&gt;</div>
    <h2>Please verify you're human</h2>
    <div class="turnstile-wrapper">
      <div class="cf-turnstile" 
           data-sitekey="${siteKey}" 
           data-callback="onVerify"
           data-theme="dark">
      </div>
    </div>
    <div class="loading" id="loading"></div>
    <p class="status" id="status"></p>
  </div>

  <script>
    function onVerify(token) {
      const status = document.getElementById('status');
      const loading = document.getElementById('loading');
      
      status.textContent = 'Verifying...';
      status.className = 'status';
      loading.style.display = 'block';

      fetch('/api/turnstile/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })
      .then(res => res.json())
      .then(data => {
        loading.style.display = 'none';
        if (data.success) {
          status.textContent = 'Verified! Redirecting...';
          status.className = 'status success';
          setTimeout(() => {
            window.location.href = data.redirect || '/';
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

