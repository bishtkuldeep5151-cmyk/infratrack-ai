# InfraTrack AI

A local/demo-ready project execution reconciliation application.

## Important changes in this build

- Login and registration UI are completely removed from the routing flow.
- `/` opens the Dashboard directly.
- The API uses a server-side system user for this local build, so no token/login is required.
- MongoDB remains the real database; data is not stored as frontend mock state.
- A demo project and L5/L6 schedule are created automatically when the backend first connects to an empty database.
- Field reports can be uploaded or pasted as text.
- The backend extracts events and creates AI/rule-based L5/L6 matches.
- Every valid match starts as `PENDING`.
- Approve: writes actual start/end/progress/status to MongoDB and creates an audit record.
- Reject: records the rejection and does not change schedule progress.
- Dashboard, Schedule and Progress read the updated database values.
- Matching uses local deterministic NLP/rule-based scoring and needs no API key.

## Run locally

### Backend

1. Make a copy of `backend/.env.example` as `backend/.env`.
2. Set `MONGODB_URI` to your MongoDB connection string.
3. From `backend`:

```bash
npm install
npm run dev
```

API health check:

```text
http://localhost:5000/api/health
```

### Frontend

From `frontend`:

```bash
npm install
npm run dev
```

Open the Vite URL. It goes directly to `/dashboard`.

## End-to-end test

Use the automatically created **Demo Infrastructure Project**.

Go to **Data Ingestion** and paste:

```text
04 September 2026
Line 24 spool erection started in Area A.
```

Click **Extract & Match**.

The backend should create a ProgressEvent and a pending MatchResult. The UI will show the suggested L5/L6 activity and confidence.

Click **Approve & update progress**.

The backend then:

1. changes the match to `APPROVED`;
2. updates the matched schedule activity's `actualStart`;
3. sets progress to at least 1%;
4. changes status to `In Progress`;
5. writes an AuditLog entry.

For completion, submit:

```text
08 September 2026
Line 24 spool erection completed in Area A.
```

Approve it. The same schedule activity should become:

- Actual End: 2026-09-08
- Progress: 100%
- Status: Delayed
- End variance: +1 day

The Dashboard and Progress pages read these values from MongoDB.

## Deployment

### Backend

Deploy `backend` to a Node host such as Render. `backend/render.yaml` is included as a starting configuration.

Set:

- `MONGODB_URI`
- `CLIENT_URL` = your deployed frontend URL
- `JWT_SECRET` = any strong random value
- `LLM_API_KEY` can remain empty because the matching engine works locally without it.

### Frontend

Deploy `frontend` to Vercel. `frontend/vercel.json` is included so BrowserRouter routes work after refresh.

Set:

```text
VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api
```

Then redeploy the frontend.

## Architecture

Frontend: React + Vite + React Router + Tailwind + Axios + Recharts.

Backend: Node + Express + MongoDB/Mongoose + Multer + XLSX + local NLP matching.

The AI matching pipeline is intentionally deterministic/local in this build. An external LLM is not required for the core workflow.
