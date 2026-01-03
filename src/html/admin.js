export function getAdminHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin - CF-URL-Shortener</title>
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
    .container { max-width: 1100px; margin: 0 auto; padding: 40px 20px; }
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
    input {
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
    input:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-dim);
    }
    input::placeholder { color: var(--text-muted); }
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
      justify-content: center;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px var(--accent-dim); }
    .btn-danger { background: var(--danger-dim); color: var(--danger); padding: 8px 14px; font-size: 0.85rem; }
    .btn-danger:hover { background: var(--danger); color: white; }
    .btn-copy { background: var(--bg-tertiary); color: var(--text-secondary); padding: 8px 14px; font-size: 0.85rem; }
    .btn-copy:hover { background: var(--accent-dim); color: var(--accent); }
    .api-key-section { display: flex; gap: 15px; }
    .api-key-section input { flex: 1; }
    .api-key-section .btn { white-space: nowrap; }
    .links-table { width: 100%; border-collapse: collapse; }
    .links-table th {
      text-align: left;
      padding: 15px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 1px solid var(--border);
    }
    .links-table td { padding: 15px; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
    .links-table tr:hover { background: var(--bg-tertiary); }
    .links-table .slug { font-family: 'JetBrains Mono', monospace; color: var(--accent); font-weight: 500; }
    .links-table .url { color: var(--text-secondary); max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .links-table .clicks { font-family: 'JetBrains Mono', monospace; color: var(--accent-secondary); }
    .links-table .date { color: var(--text-muted); font-size: 0.8rem; }
    .links-table .actions { display: flex; gap: 8px; }
    .empty-state { text-align: center; padding: 60px 20px; color: var(--text-muted); }
    .empty-state svg { width: 80px; height: 80px; margin-bottom: 20px; opacity: 0.3; }
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
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .stat-card { background: var(--bg-tertiary); border-radius: 12px; padding: 20px; text-align: center; }
    .stat-value { font-family: 'JetBrains Mono', monospace; font-size: 2rem; font-weight: 700; color: var(--accent); }
    .stat-label { font-size: 0.85rem; color: var(--text-muted); margin-top: 5px; }
    .back-link { display: inline-block; color: var(--text-secondary); text-decoration: none; margin-bottom: 30px; font-size: 0.9rem; }
    .back-link:hover { color: var(--accent); }
  </style>
</head>
<body>
  <div class="container">
    <a href="/" class="back-link" id="backLink">&larr; Back to Home</a>
    
    <header>
      <h1 class="logo">&lt;/shorted&gt;</h1>
      <p class="tagline">Admin Panel</p>
    </header>

    <div class="card">
      <div class="card-title">Authentication</div>
      <p style="color: var(--text-secondary); margin-bottom: 15px; font-size: 0.9rem;">
        Enter API key to manage all links
      </p>
      <div class="api-key-section">
        <input type="password" id="apiKey" placeholder="Enter Admin API Key..." />
        <button class="btn btn-copy" onclick="toggleApiKey()">Show</button>
        <button class="btn btn-primary" onclick="loadLinks()">Connect</button>
      </div>
    </div>

    <div class="card" id="linksCard" style="display: none;">
      <div class="card-title">All Links</div>
      <div class="stats-grid" id="statsGrid" style="display: none;">
        <div class="stat-card">
          <div class="stat-value" id="totalLinks">0</div>
          <div class="stat-label">Total Links</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="totalClicks">0</div>
          <div class="stat-label">Total Clicks</div>
        </div>
      </div>
      <div id="linksContainer">
        <div class="empty-state">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
          </svg>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  </div>

  <div class="toast" id="toast"></div>

  <script>
    const SESSION_KEY = 'ts_session_token';

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

    handleSessionToken();

    function toggleApiKey() {
      const input = document.getElementById('apiKey');
      const btn = event.target;
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = 'Hide';
      } else {
        input.type = 'password';
        btn.textContent = 'Show';
      }
    }

    function getApiKey() {
      return document.getElementById('apiKey').value;
    }

    function showToast(message, isError = false) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.className = 'toast show' + (isError ? ' error' : '');
      setTimeout(() => { toast.className = 'toast'; }, 3000);
    }

    async function loadLinks() {
      const linksCard = document.getElementById('linksCard');
      const container = document.getElementById('linksContainer');
      linksCard.style.display = 'block';
      container.innerHTML = '<div style="text-align: center; padding: 40px;"><span class="loading"></span></div>';
      try {
        const headers = { 'X-API-Key': getApiKey() };
        const token = getSessionToken();
        if (token) headers['X-Session-Token'] = token;
        const response = await fetch('/api/links', { headers });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to load links');
        const links = data.links;
        if (links.length === 0) {
          container.innerHTML = '<div class="empty-state"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg><p>No links yet.</p></div>';
          document.getElementById('statsGrid').style.display = 'none';
          return;
        }
        const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);
        document.getElementById('totalLinks').textContent = links.length;
        document.getElementById('totalClicks').textContent = totalClicks;
        document.getElementById('statsGrid').style.display = 'grid';
        container.innerHTML = \`
          <table class="links-table">
            <thead><tr><th>Slug</th><th>Destination</th><th>Clicks</th><th>Created</th><th>Actions</th></tr></thead>
            <tbody>
              \${links.map(link => \`
                <tr>
                  <td class="slug">/\${link.slug}</td>
                  <td class="url" title="\${link.url}">\${link.url}</td>
                  <td class="clicks">\${link.clicks || 0}</td>
                  <td class="date">\${new Date(link.createdAt).toLocaleDateString()}</td>
                  <td class="actions">
                    <button class="btn btn-copy" onclick="copyLink('\${link.slug}')">Copy</button>
                    <button class="btn btn-danger" onclick="deleteLink('\${link.slug}')">Delete</button>
                  </td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        \`;
      } catch (error) {
        container.innerHTML = \`<div class="empty-state"><p style="color: var(--danger);">\${error.message}</p></div>\`;
        if (error.message === 'Unauthorized') {
          linksCard.style.display = 'none';
          showToast('Invalid API Key', true);
        }
      }
    }

    async function deleteLink(slug) {
      if (!confirm('Are you sure you want to delete this link?')) return;
      try {
        const headers = { 'X-API-Key': getApiKey() };
        const token = getSessionToken();
        if (token) headers['X-Session-Token'] = token;
        const response = await fetch('/api/delete/' + slug, { method: 'DELETE', headers });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to delete link');
        showToast('Link deleted successfully');
        loadLinks();
      } catch (error) {
        showToast(error.message, true);
      }
    }

    function copyLink(slug) {
      navigator.clipboard.writeText(window.location.origin + '/' + slug);
      showToast('Link copied to clipboard!');
    }

    document.getElementById('backLink').addEventListener('click', (e) => {
      const token = getSessionToken();
      if (token) {
        e.preventDefault();
        window.location.href = '/?_ts=' + token;
      }
    });
  </script>
</body>
</html>`;
}
