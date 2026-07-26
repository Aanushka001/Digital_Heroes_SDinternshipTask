````md
# Page Pulse

Paste a URL and get an instant technical audit with HTTP status, response time, page title, meta description, H1 count, images missing alt text, and approximate word count.

Built for the Digital Heroes SDE Internship Task.

## Deployment

**Live Application:** https://digital-heroes-s-dinternship-task.vercel.app/

**API Base URL:** https://digital-heroes-sdinternshiptask.onrender.com

---

## Project Structure

```text
Digital_Heroes_SDinternshipTask/
│
├── backend/                         Node.js + Express API
│   └── src/
│       ├── config/                  Environment configuration
│       ├── middleware/              URL validation and error handling
│       ├── services/                Page fetching and auditing logic
│       └── utils/                   HTML parsing and error utilities
│
├── frontend/                        React + Vite SPA
│   └── src/
│       ├── services/                API communication layer
│       └── App.jsx                  UI, states, and report display
│
├── screenshots/                     Application screenshots
│   ├── frontend-ui-display.png
│   ├── backend-running.png
│   ├── github-url.png
│   ├── digital-heroes-url.png
│   └── invalid-url-validation.png
│
└── README.md
````

---

# Setup Instructions

## Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:3001
```

---

## Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# API Documentation

## POST `/audit`

Analyzes the provided webpage URL and returns an audit report.

### Request

```json
{
  "url": "https://example.com"
}
```

### Success Response

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

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "TIMEOUT",
    "message": "The target URL did not respond within 10 seconds.",
    "statusCode": 504
  }
}
```

---

## Supported Error Codes

| Status | Code                 | Description                                          |
| ------ | -------------------- | ---------------------------------------------------- |
| 400    | `INVALID_URL`        | Missing URL, invalid format, or unsupported protocol |
| 422    | `NOT_HTML`           | Target does not return HTML content                  |
| 502    | `DNS_FAILURE`        | Domain unreachable or network failure                |
| 504    | `TIMEOUT`            | Target URL exceeded request timeout                  |
| 508    | `REDIRECT_LOOP`      | Too many redirects detected                          |
| 413    | `RESPONSE_TOO_LARGE` | Response exceeds maximum size                        |
| 500    | `INTERNAL_ERROR`     | Unexpected server error                              |

---

## GET `/health`

Returns backend health information.

Example response:

```json
{
  "status": "ok",
  "uptime": 120.45,
  "timestamp": "2026-07-26T12:00:00.000Z"
}
```

---

# Testing

## Backend Tests

Run:

```bash
cd backend
npm install
npm test
```

Backend tests cover:

* URL validation
* API responses
* Error handling
* Page audit functionality

## Frontend Tests

Run:

```bash
cd frontend
npm install
npm test
```

Frontend tests cover:

* Component rendering
* User input handling
* Loading and error states
* API interaction behaviour

## Manual Testing

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

Enter a valid URL and verify that the audit report is generated successfully.

---

# Screenshots

## Application

<div>
<img src="screenshots/frontend-ui-display.png" width="48%" />
<img src="screenshots/backend-running.png" width="48%" />
</div>

## API Testing (Postman)

<div>
<img src="screenshots/github-url.png" width="31%" />
<img src="screenshots/digital-heroes-url.png" width="31%" />
<img src="screenshots/invalid-url-validation.png" width="31%" />
</div>

---

# Design Decisions

## Native Fetch API

Node.js 18+ provides the Fetch API natively, removing the need for additional HTTP dependencies. `AbortController` is used for timeout handling and predictable request cancellation.

## Cheerio HTML Parser

Cheerio is used instead of JSDOM because the application only requires static HTML analysis such as titles, metadata, headings, and image attributes. This keeps the implementation lightweight and secure.

## Focused Audit Scope

The API was intentionally limited to the required audit fields. Additional checks were avoided to maintain reliability, simplify testing, and keep the application aligned with the internship requirements.

---

# AI Usage

Claude was used as a development assistant during this project for:

* Understanding requirements
* Reviewing architecture decisions
* Debugging issues
* Exploring implementation approaches
* Improving error handling and testing strategies

All suggestions were reviewed, implemented, and tested manually. Final decisions regarding architecture, implementation, debugging, and project scope were made independently.

---

# Credits

Built for the Digital Heroes Training Task.

[https://digitalheroesco.com](https://digitalheroesco.com)

```
```
