
# Page Pulse

A lightweight web auditing tool that analyzes any webpage URL and provides an instant technical summary including HTTP status, response time, page title, meta description, heading structure, missing image alt attributes, and approximate word count.

Developed as part of the **Digital Heroes SDE Internship Task**.


# Live Deployment

| Service | URL |
|---|---|
| Frontend Application | https://digital-heroes-s-dinternship-task.vercel.app/ |
| Backend API | https://digital-heroes-sdinternshiptask.onrender.com |


# Features

- Analyze any public webpage URL
- Fetch HTTP response details
- Measure page response time
- Extract page metadata
- Count H1 headings
- Detect images without alt attributes
- Estimate webpage word count
- Handle invalid URLs and network errors
- Provide structured API responses

---

# Tech Stack

## Frontend

- React
- Vite
- JavaScript
- CSS

## Backend

- Node.js
- Express.js
- Native Fetch API
- Cheerio HTML Parser

## Testing

- Vitest
- Backend API testing
- Frontend component testing

---

# Project Structure

```text
Digital_Heroes_SDinternshipTask/
│
├── backend/                         Backend API (Node.js + Express)
│   └── src/
│       ├── config/                  Environment configuration
│       ├── middleware/              Validation and error handling
│       ├── services/                Fetching and auditing logic
│       └── utils/                   HTML parsing and utilities
│
├── frontend/                        Frontend Application (React + Vite)
│   └── src/
│       ├── services/                API communication
│       └── App.jsx                  UI components and application logic
│
├── screenshots/                     Project screenshots
│   ├── frontend-ui-display.png
│   ├── backend-running.png
│   ├── github-url.png
│   ├── digital-heroes-url.png
│   └── invalid-url-validation.png
│
└── README.md
````

---

# Installation & Setup

## Backend Configuration

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create environment configuration:

```bash
cp .env.example .env
```

Start development server:

```bash
npm run dev
```

Backend will run at:

```text
http://localhost:3001
```

---

## Frontend Configuration

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create environment configuration:

```bash
cp .env.example .env
```

Start development server:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

# API Reference

## Website Audit Endpoint

### POST `/audit`

Analyzes the provided webpage and returns technical audit information.

### Request Body

```json
{
  "url": "https://example.com"
}
```

### Successful Response

```json
{
  "success": true,
  "report": {
    "url": "https://example.com/",
    "auditedAt": "2026-07-26T12:00:00.000Z",
    "httpStatus": 200,
    "responseTimeMs": 189,
    "pageTitle": "Example Domain",
    "metaDescription": "",
    "h1Count": 1,
    "imagesMissingAlt": 0,
    "wordCount": 17
  }
}
```

---

## Health Check Endpoint

### GET `/health`

Used to verify that the backend service is running.

Example response:

```json
{
  "status": "ok",
  "uptime": 120.45,
  "timestamp": "2026-07-26T12:00:00.000Z"
}
```

---

# Error Handling

The API provides structured error responses for different failure scenarios.

| Status | Error Code         | Description                    |
| ------ | ------------------ | ------------------------------ |
| 400    | INVALID_URL        | Invalid or missing URL         |
| 422    | NOT_HTML           | Response is not HTML content   |
| 502    | DNS_FAILURE        | Domain cannot be reached       |
| 504    | TIMEOUT            | Request exceeded timeout limit |
| 508    | REDIRECT_LOOP      | Too many redirects detected    |
| 413    | RESPONSE_TOO_LARGE | Response size exceeded limit   |
| 500    | INTERNAL_ERROR     | Unexpected server error        |

---

# Testing

## Backend Testing

Run backend tests:

```bash
cd backend
npm test
```

Tests include:

* URL validation
* API response handling
* Error scenarios
* Audit service behaviour

## Frontend Testing

Run frontend tests:

```bash
cd frontend
npm test
```

Tests include:

* Component rendering
* User interactions
* Loading states
* Error states
* API integration behaviour

## Manual Verification

Start backend:

```bash
cd backend
npm run dev
```

Verify:

```text
GET http://localhost:3001/health
```

Expected:

```json
{
  "status": "ok"
}
```

Start frontend:

```bash
cd frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

Enter a URL and verify that the audit report is generated successfully.

---

# Screenshots

## Application Preview

<div align="center">
<img src="screenshots/frontend-ui-display.png" width="45%" />
<img src="screenshots/backend-running.png" width="45%" />
</div>

---

## API Validation (Postman)

### GitHub URL Audit

<div align="center">
<img src="screenshots/github-url.png" width="55%" />
</div>

### Digital Heroes URL Audit

<div align="center">
<img src="screenshots/digital-heroes-url.png" width="55%" />
</div>

### Invalid URL Validation

<div align="center">
<img src="screenshots/invalid-url-validation.png" width="55%" />
</div>

---

# Technical Decisions

## Native Fetch API

The backend uses Node.js built-in Fetch API instead of external HTTP libraries. This reduces dependencies while providing reliable request handling with `AbortController` based timeout management.

## Cheerio for HTML Parsing

Cheerio was selected because the application only requires static HTML analysis. It provides efficient extraction of titles, metadata, headings, and image attributes without the overhead of browser simulation.

## Focused Audit Implementation

The audit functionality was intentionally limited to the required features. Keeping the scope focused improves reliability, testing coverage, and maintainability.

---

# AI Assistance

Claude was used during development as a coding assistant for:

* Understanding requirements
* Reviewing implementation approaches
* Debugging errors
* Improving architecture decisions
* Reviewing testing strategies

All generated suggestions were manually reviewed, implemented, and tested. Final decisions regarding code structure, implementation, and project scope were made independently.

---

# Credits

Developed for the **Digital Heroes SDE Internship Task**.

[https://digitalheroesco.com](https://digitalheroesco.com)
