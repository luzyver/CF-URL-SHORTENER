export function get404HTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - Link Not Found</title>
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
      text-align: center;
      background-image: radial-gradient(ellipse at 50% 50%, rgba(255, 68, 102, 0.1) 0%, transparent 50%);
    }
    .container { padding: 40px; }
    h1 {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8rem;
      color: #ff4466;
      text-shadow: 0 0 50px rgba(255, 68, 102, 0.5);
      line-height: 1;
    }
    p {
      font-size: 1.3rem;
      color: #8888aa;
      margin: 20px 0 30px;
    }
    a {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #00ff88, #00cc66);
      color: #0a0a0f;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 600;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    a:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <p>Oops! This short link doesn't exist or has expired.</p>
    <a href="/">Go Home</a>
  </div>
</body>
</html>`;
}
