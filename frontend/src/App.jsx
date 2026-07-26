import { useState } from 'react';
import { auditUrl } from './services/api';
import './App.css';

const STATE = { IDLE: 'idle', LOADING: 'loading', ERROR: 'error', SUCCESS: 'success' };

function App() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState(STATE.IDLE);
  const [report, setReport] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!url.trim()) return;

    setStatus(STATE.LOADING);
    setErrorMsg('');

    try {
      const result = await auditUrl(url.trim());
      setReport(result);
      setStatus(STATE.SUCCESS);
    } catch (err) {
      setErrorMsg(err.message);
      setStatus(STATE.ERROR);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Page Pulse</h1>
        <p className="tagline">Paste a URL. Get an instant audit.</p>
      </header>

      <form onSubmit={handleSubmit} className="url-form">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          disabled={status === STATE.LOADING}
        />
        <button type="submit" disabled={status === STATE.LOADING}>
          {status === STATE.LOADING ? 'Auditing…' : 'Analyse'}
        </button>
      </form>

      {status === STATE.LOADING && <p className="status loading">Fetching and analysing the page…</p>}
      {status === STATE.ERROR && <p className="status error">⚠ {errorMsg}</p>}
      {status === STATE.SUCCESS && report && <ReportCard report={report} />}

      <footer>
        <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer">
          Built for Digital Heroes Training Task
        </a>
      </footer>
    </div>
  );
}

function ReportCard({ report }) {
  const { parsed, summary } = report;

  const extraChecks = [
    { label: 'Robots.txt', data: report.robots },
    { label: 'Favicon', data: report.favicon },
    { label: 'Sitemap', data: report.sitemap },
    { label: 'Open Graph tags', data: report.openGraph },
    { label: 'Twitter Card tags', data: report.twitterCard },
    { label: 'Canonical URL', data: report.canonical },
    { label: 'Structured data', data: report.structuredData },
  ];

  return (
    <div className="report-card">
      <h2>Report for {report.url}</h2>

      <div className="metrics-grid">
        <Metric label="HTTP Status" value={report.httpStatus} />
        <Metric label="Response Time" value={`${report.responseTimeMs} ms`} />
        <Metric label="H1 Count" value={parsed.h1Count} />
        <Metric label="Images Missing Alt" value={parsed.missingAltCount} />
        <Metric label="Word Count" value={parsed.wordCount} />
      </div>

      <div className="text-fields">
        <p><strong>Title:</strong> {parsed.title || <em>none found</em>}</p>
        <p><strong>Meta Description:</strong> {parsed.metaDescription || <em>none found</em>}</p>
      </div>

      {summary && (
        <p className="score">
          SEO Score: <strong>{summary.score}</strong> (Grade {summary.grade})
        </p>
      )}

      <details className="extra-checks">
        <summary>Extra checks</summary>
        <ul>
          {extraChecks.map(({ label, data }) => (
            <li key={label} className={data?.exists ? 'ok' : 'warn'}>
              {data?.exists ? '✅' : '⚠️'} {label} — {data?.message}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric">
      <span className="metric-label">{label}</span>
      <span className="metric-value">{value}</span>
    </div>
  );
}

export default App;