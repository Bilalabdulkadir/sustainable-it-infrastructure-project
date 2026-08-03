# Green IT Hub — Run & Deploy

## Purpose

- Full‑stack Vite + Express app to generate Green IT / Sustainable Infrastructure audits.
- Uses Gemini AI API for AI features (GEMINI_API_KEY required).

## Features

- React + Vite frontend
- Express backend bundled with esbuild for production
- AI integration via @google/genai
- Docker + docker-compose for containerized runs

## Prerequisites

- Node.js 18+ (recommended)
- npm (comes with Node) or pnpm/yarn
- Docker (if using container mode)
- GEMINI_API_KEY from your Google / Gemini account

## Quick start — local development

1. Clone

   git clone https://github.com/Bilalabdulkadir/sustainable-it-infrastructure-project.git
   cd sustainable-it-infrastructure-project

2. Install dependencies

   npm install

3. Configure environment

   cp .env.example .env
   # edit .env and set:
   # GEMINI_API_KEY="your_gemini_api_key"
   # APP_URL="http://localhost:5173" (or your app URL)

4. Start dev server

   npm run dev

   - This runs the server in dev mode (script: "dev": "tsx server.ts"). Frontend is served by Vite.

## Build & production

1. Build assets and bundle server

   npm run build

   - Runs: vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs

2. Start the built server

   npm start

   - Make sure GEMINI_API_KEY is present in the environment when starting the built server.

## Environment variables

- GEMINI_API_KEY — Required for Gemini AI calls.
- APP_URL — Host URL for the app (used for callbacks/links).

Use .env for local dev. Do not commit .env to git. The repo includes .env.example.

## Running with Docker

- Build & run using docker-compose:

  docker-compose up --build

- Or build image:

  docker build -t greenit-hub .
  docker run -e GEMINI_API_KEY="..." -p 3000:3000 greenit-hub

## CI / Deploy tips

- For cloud platforms (Cloud Run, Heroku, Vercel):
  - Store GEMINI_API_KEY as a secret / environment variable in the service.
  - Ensure build step runs npm run build and that the start command runs node dist/server.cjs.

- Example GitHub Actions (optional):
  - Run npm ci, npm run build, and push a container image / trigger deploy. (I can provide a workflow file if you want.)

## Troubleshooting

- If server fails to find GEMINI_API_KEY:
  - Confirm .env is loaded (dotenv is a dependency) and variable is set.
  - For systemd / containerized runs ensure env var is set in the service config.

- Type errors:
  - npm run lint (tsc --noEmit) will surface TypeScript issues.

- Port conflicts:
  - Vite default port is 5173; Express server may be on a different port — check server.ts.

## Files of interest

- server.ts — backend entrypoint and where GEMINI_API_KEY is used
- main.tsx, App.tsx — frontend
- Dockerfile, docker-compose.yml — container configuration
- package.json — available scripts: dev, build, start, preview, clean, lint

## Contributing

- Open issues or PRs for bug reports and feature requests.
- Run lint & tests before submitting PRs.

## Security & secrets

- Never commit GEMINI_API_KEY or other secrets. Use .env + .gitignore. Use your host/CI secret manager in production.

## License

- Add your preferred license here (e.g., MIT). If you want, I can add an SPDX header and LICENSE file.
