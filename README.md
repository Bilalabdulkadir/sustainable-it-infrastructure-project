# Green IT Hub — Run & Deploy

This repository contains a full‑stack Vite + Express app for generating Green IT / Sustainable Infrastructure audits.

Quick links
- Local development: run the app locally with the dev server
- Build & production: build static assets and run the bundled Node server
- Environment: GEMINI_API_KEY is required for AI features

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` (or set environment variables) with:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. Start dev server:
   ```bash
   npm run dev
   ```
   - The app runs with Vite dev middleware and the Express server on http://localhost:3000

## Build for production

1. Build the frontend and bundle the server:
   ```bash
   npm run build
   ```

2. Start the production server (after build):
   ```bash
   npm run start
   ```
   - Serves the built assets from `dist/` via the bundled Node server on port 3000

## Notes

- The server looks for `GEMINI_API_KEY` at runtime and will throw an error if it is missing.
- package.json scripts:
  - `dev`: `tsx server.ts`
  - `build`: `vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs`
  - `start`: `node dist/server.cjs`

## Deployment suggestions

- Vercel / Netlify: These platforms typically use serverless functions — this project runs an Express server and is packaged as a Node server. For Vercel you can either adapt the app to serverless functions or deploy the bundled Node server using a container-based platform.
- Docker / Cloud Run / ECS / App Engine: Recommended for running the bundled server. Build a Docker image that runs `node dist/server.cjs` and set `GEMINI_API_KEY` as a runtime environment variable.

## Docker / Containerized deployment

This repo includes a Dockerfile and docker-compose configuration for running the production bundle in a container.

Build and run with Docker:
```bash
# Build the image (this runs the project's build step inside the image)
docker build -t green-it-hub:latest .

# Run (ensure GEMINI_API_KEY is set)
docker run -p 3000:3000 -e GEMINI_API_KEY="$GEMINI_API_KEY" green-it-hub:latest
```

Or use docker-compose:
```bash
# Copy your GEMINI_API_KEY into a .env file or export it in your shell
export GEMINI_API_KEY="your_gemini_api_key"

# Build and start
docker-compose up --build -d

# Stop
docker-compose down
```

Notes:
- The Dockerfile builds the frontend and bundles the server using the existing `npm run build` script and then runs `node dist/server.cjs`.
- Make sure to provide a valid GEMINI_API_KEY at runtime. Do NOT store secrets in the repository.

## Removing AI Studio reference

This README replaces any prior reference to AI Studio. If you still want to keep a link to AI Studio or other deployment targets, tell me where to add it.

---

If you want, I can also:
- Add a Dockerfile and a small `docker-compose.yml`.
- Add a GitHub Actions workflow to build the app and produce the production bundle.

