# Green IT Hub — Run & Deploy

A full-stack Vite + Express application for generating **Green IT** and **Sustainable Infrastructure** audits using **Google Gemini AI**.

---

## 🌱 Features

- ⚛️ React + Vite frontend
- 🚀 Express.js backend
- 🤖 Google Gemini AI integration
- 📊 Green IT sustainability assessments
- 🐳 Docker & Docker Compose support
- ☁️ Cloud Run deployment ready
- 🔄 GitHub Actions CI/CD workflows

---

## 📋 Prerequisites

- Node.js 18+ (recommended)
- npm (or pnpm/yarn)
- Docker (optional)
- Google Gemini API Key

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Bilalabdulkadir/sustainable-it-infrastructure-project.git
cd sustainable-it-infrastructure-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your values:

```env
GEMINI_API_KEY=your_gemini_api_key
APP_URL=http://localhost:5173
```

---

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:8080

---

# 🏗️ Build for Production

Build the frontend and backend:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

or

```bash
node dist/server.cjs
```

---

# 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| GEMINI_API_KEY | ✅ | Google Gemini API Key |
| APP_URL | ✅ | Application URL |
| PORT | Optional | Defaults to 8080 |

---

# 🐳 Docker

Build the image:

```bash
docker build -t greenit-hub .
```

Run the container:

```bash
docker run \
-e GEMINI_API_KEY="YOUR_API_KEY" \
-p 8080:8080 \
greenit-hub
```

Or use Docker Compose:

```bash
docker-compose up --build
```

---

# ☁️ Cloud Run Deployment

The project includes GitHub Actions workflows for:

- ✅ Continuous Integration
- ✅ Automated Cloud Run Deployment
- ✅ Artifact Registry Image Build
- ✅ Workload Identity Federation (WIF)

## Required GitHub Secrets

- GCP_PROJECT
- GCP_REGION
- WIF_PROVIDER
- GCP_SERVICE_ACCOUNT
- GEMINI_API_KEY

Production server:

```bash
node dist/server.cjs
```

---

# ❤️ Health Check

The application exposes a health endpoint.

```
GET /health
```

Example response:

```json
{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": "2026-08-04T12:30:00.000Z"
}
```

Cloud Run requirements:

- Listen on `process.env.PORT`
- Default to port `8080`
- Bind to `0.0.0.0`

Example:

```javascript
const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

# 🧪 Testing

Install dependencies:

```bash
npm ci
```

Run lint:

```bash
npm run lint
```

Run tests:

```bash
npm test
```

---

# 📂 Project Structure

```
.
├── .github/workflows/
├── src/
├── assets/
├── server.ts
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

# 🛠️ Troubleshooting

### Missing GEMINI_API_KEY

Ensure your `.env` file exists and contains:

```env
GEMINI_API_KEY=your_api_key
```

### Port already in use

Use another port:

```bash
PORT=8080 npm run dev
```

### Docker

Verify the exposed port matches the application port.

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 🔒 Security

- Never commit `.env`
- Never expose API keys
- Store production secrets using your cloud provider's secret manager

---

# 📄 License

This project is licensed under the MIT License.

---

Created and maintained by **Bilal Abdulkadir Muhammed**
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
