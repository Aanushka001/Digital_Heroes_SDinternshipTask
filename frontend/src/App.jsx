import { useState } from "react";
import { auditUrl } from "./services/api";
import "./App.css";

const STATE = {
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
};

function App() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(STATE.IDLE);
  const [report, setReport] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!url.trim()) {
      setStatus(STATE.ERROR);
      setErrorMsg("Please enter a URL to audit.");
      return;
    }

    setStatus(STATE.LOADING);
    setErrorMsg("");
    setReport(null);

    try {
      const result = await auditUrl(url.trim());
      setReport(result);
      setStatus(STATE.SUCCESS);
    } catch (err) {
      setStatus(STATE.ERROR);
      setErrorMsg(err.message);
    }
  }

  return (
    <main className="app">
      <section className="hero">
        <h1>Page Pulse</h1>
        <p>
          Instantly analyse any webpage and receive a quick technical summary.
        </p>
      </section>

      <form className="url-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={status === STATE.LOADING}
        />

        <button type="submit" disabled={status === STATE.LOADING}>
          {status === STATE.LOADING ? "Auditing..." : "Analyse"}
        </button>
      </form>

      {status === STATE.LOADING && (
        <div className="status loading">
          Fetching and analysing the webpage...
        </div>
      )}

      {status === STATE.ERROR && (
        <div className="status error">
          {errorMsg}
        </div>
      )}

      {status === STATE.SUCCESS && report && (
        <ReportCard report={report} />
      )}

      <footer>
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built for the Digital Heroes Internship Task
        </a>
      </footer>
    </main>
  );
}

function ReportCard({ report }) {
  return (
    <section className="report-card">
      <div className="report-header">
        <h2>Audit Report</h2>
        <p>{report.url}</p>
      </div>

      <div className="metrics-grid">
        <Metric label="HTTP Status" value={report.httpStatus} />
        <Metric label="Response Time" value={`${report.responseTimeMs} ms`} />
        <Metric label="H1 Count" value={report.h1Count} />
        <Metric label="Images Missing Alt" value={report.imagesMissingAlt} />
        <Metric label="Word Count" value={report.wordCount} />
      </div>

      <div className="detail-section">
        <div className="detail-card">
          <h3>Page Title</h3>
          <p>{report.pageTitle || "No title found."}</p>
        </div>

        <div className="detail-card">
          <h3>Meta Description</h3>
          <p>{report.metaDescription || "No meta description found."}</p>
        </div>
      </div>
    </section>
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