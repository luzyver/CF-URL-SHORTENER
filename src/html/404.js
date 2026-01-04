export function get404HTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 — LZVR Short</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-body: #F4F7F9;
      --bg-surface: #FFFFFF;
      --primary: #3B82F6;
      --primary-hover: #2563EB;
      --primary-light: #EFF6FF;
      --text-main: #1E293B;
      --text-secondary: #64748B;
      --border: #E2E8F0;
      --shadow-lg: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
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
      text-align: center;
      padding: 24px;
    }
    .container {
      max-width: 480px;
    }
    .error-code {
      font-size: clamp(6rem, 20vw, 10rem);
      font-weight: 700;
      color: var(--primary);
      line-height: 1;
      opacity: 0.15;
      margin-bottom: -30px;
      position: relative;
      z-index: 0;
    }
    .error-card {
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 48px 40px;
      box-shadow: var(--shadow-lg);
      position: relative;
      z-index: 1;
    }
    .error-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 24px;
      background: var(--primary-light);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .error-icon svg {
      width: 32px;
      height: 32px;
      stroke: var(--primary);
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 12px;
    }
    p {
      font-size: 1rem;
      color: var(--text-secondary);
      margin-bottom: 32px;
      line-height: 1.6;
    }
    a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      background: var(--primary);
      color: white;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      box-shadow: 0 1px 3px rgba(59, 130, 246, 0.3);
    }
    a:hover {
      background: var(--primary-hover);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);
      transform: translateY(-1px);
    }
    a svg {
      width: 18px;
      height: 18px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="error-code">404</div>
    <div class="error-card">
      <div class="error-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
        </svg>
      </div>
      <h1>Link Not Found</h1>
      <p>The short link you're looking for doesn't exist or has expired. Please check the URL and try again.</p>
      <a href="/">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        Go Home
      </a>
    </div>
  </div>
</body>
</html>`;
}
