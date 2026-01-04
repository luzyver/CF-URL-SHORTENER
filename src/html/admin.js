export function getAdminHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Panel — LZVR Short</title>
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
    .page-header {
      background: var(--bg-surface);
      border-bottom: 1px solid var(--border);
      padding: 20px 24px;
    }
    .header-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      padding: 8px 12px;
      border-radius: 8px;
      transition: all 0.2s;
    }
    .back-link:hover {
      color: var(--primary);
      background: var(--primary-light);
    }
    .logo {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-main);
    }
    .logo span {
      color: var(--primary);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 24px;
    }
    .page-title {
      margin-bottom: 32px;
    }
    .page-title h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 4px;
    }
    .page-title p {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }
    .card {
      background: var(--bg-surface);
      border-radius: 12px;
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
      margin-bottom: 24px;
      overflow: hidden;
    }
    .card-header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border);
    }
    .card-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-main);
    }
    .card-body {
      padding: 24px;
    }
    .api-key-section {
      display: flex;
      gap: 12px;
    }
    .api-key-section input {
      flex: 1;
    }
    input {
      padding: 12px 16px;
      background: var(--input-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text-main);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }
    input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
      background: var(--bg-surface);
    }
    input::placeholder {
      color: var(--text-muted);
    }
    .btn {
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }
    .btn-primary {
      background: var(--primary);
      color: white;
    }
    .btn-primary:hover {
      background: var(--primary-hover);
    }
    .btn-secondary {
      background: var(--input-bg);
      color: var(--text-secondary);
      border: 1px solid var(--border);
    }
    .btn-secondary:hover {
      background: var(--border);
      color: var(--text-main);
    }
    .btn-danger {
      background: var(--danger-light);
      color: var(--danger);
      padding: 8px 14px;
      font-size: 0.8rem;
    }
    .btn-danger:hover {
      background: var(--danger);
      color: white;
    }
    .btn-copy {
      background: var(--primary-light);
      color: var(--primary);
      padding: 8px 14px;
      font-size: 0.8rem;
    }
    .btn-copy:hover {
      background: var(--primary);
      color: white;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .stat-card {
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      text-align: center;
    }
    .stat-value {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary);
    }
    .stat-label {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-top: 4px;
      font-weight: 500;
    }
    .table-wrapper {
      overflow-x: auto;
    }
    .links-table {
      width: 100%;
      border-collapse: collapse;
    }
    .links-table th {
      text-align: left;
      padding: 14px 16px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: var(--input-bg);
      border-bottom: 1px solid var(--border);
    }
    .links-table td {
      padding: 16px;
      border-bottom: 1px solid var(--border);
      font-size: 0.9rem;
      vertical-align: middle;
    }
    .links-table tr:last-child td {
      border-bottom: none;
    }
    .links-table tr:hover td {
      background: var(--input-bg);
    }
    .links-table .slug {
      font-family: 'JetBrains Mono', monospace;
      color: var(--primary);
      font-weight: 500;
    }
    .links-table .url {
      color: var(--text-secondary);
      max-width: 280px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .links-table .clicks {
      font-family: 'JetBrains Mono', monospace;
      color: var(--text-main);
      font-weight: 600;
    }
    .links-table .date {
      color: var(--text-muted);
      font-size: 0.85rem;
    }
    .links-table .actions {
      display: flex;
      gap: 8px;
    }
    .empty-state {
      text-align: center;
      padding: 60px 24px;
      color: var(--text-muted);
    }
    .empty-state svg {
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
      opacity: 0.4;
      stroke: var(--text-muted);
    }
    .empty-state p {
      font-size: 0.95rem;
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
      border: 2px solid var(--border);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 768px) {
      .api-key-section {
        flex-direction: column;
      }
      .container {
        padding: 24px 16px;
      }
      .links-table .url {
        max-width: 150px;
      }
    }
  </style>
</head>
<body>
  <header class="page-header">
    <div class="header-inner">
      <a href="/" class="back-link" id="backLink">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back
      </a>
      <div class="logo">LZVR<span>.</span></div>
    </div>
  </header>

  <div class="container">
    <div class="page-title">
      <h1>Admin Panel</h1>
      <p>Manage and monitor all your shortened links</p>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Authentication</div>
      </div>
      <div class="card-body">
        <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 0.9rem;">
          Enter your API key to access the dashboard
        </p>
        <div class="api-key-section">
          <input type="password" id="apiKey" placeholder="Enter Admin API Key..." />
          <button class="btn btn-secondary" onclick="toggleApiKey()">Show</button>
          <button class="btn btn-primary" onclick="loadLinks()">Connect</button>
        </div>
      </div>
    </div>

    <div id="linksCard" style="display: none;">
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

      <div class="card">
        <div class="card-header">
          <div class="card-title">All Links</div>
        </div>
        <div class="card-body" style="padding: 0;">
          <div id="linksContainer">
            <div class="empty-state">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
              <p>Loading...</p>
            </div>
          </div>
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
        let storedSuccessfully = false;
        try { 
          localStorage.setItem(SESSION_KEY, token);
          if (localStorage.getItem(SESSION_KEY) === token) {
            storedSuccessfully = true;
          }
        } catch(e) {}
        if (storedSuccessfully) {
          params.delete('_ts');
          const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
          window.history.replaceState({}, '', newUrl);
        }
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
      container.innerHTML = '<div style="text-align: center; padding: 50px;"><span class="loading"></span></div>';
      try {
        const headers = { 'X-API-Key': getApiKey() };
        const token = getSessionToken();
        if (token) headers['X-Session-Token'] = token;
        const response = await fetch('/api/links', { headers });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to load links');
        const links = data.links;
        if (links.length === 0) {
          container.innerHTML = '<div class="empty-state"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg><p>No links yet. Create your first short link!</p></div>';
          document.getElementById('statsGrid').style.display = 'none';
          return;
        }
        const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);
        document.getElementById('totalLinks').textContent = links.length;
        document.getElementById('totalClicks').textContent = totalClicks;
        document.getElementById('statsGrid').style.display = 'grid';
        container.innerHTML = \`
          <div class="table-wrapper">
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
          </div>
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
