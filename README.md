# Google Forms Lite Clone (Monorepo)

A simplified clone of Google Forms built with a modern full-stack architecture. This project features a React frontend and a NestJS GraphQL backend, managed as a monorepo.

## Quick Start (Docker)

The easiest way to run the entire stack is using Docker Compose. This ensures a consistent environment for both client and server.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Steps
1. Clone the repository.
2. Run the following command in the root directory:
   ```bash
   npm run docker:up
   ```
3. Once the containers are running:
   - **Frontend:** [http://localhost:5173](http://localhost:5173)
   - **Backend (GraphQL Playground):** [http://localhost:3000/graphql](http://localhost:3000/graphql)

To stop the containers:
```bash
npm run docker:down
```

---

## 🛠️ Local Development (Manual)

If you prefer to run the services without Docker, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v20 or higher recommended).
- [npm](https://www.npmjs.com/).

### Installation
1. Install dependencies for the entire monorepo:
   ```bash
   npm install
   ```

### Running the Services
You can run both services concurrently using the workspace scripts provided in the root `package.json`.

**Option 1: Open two terminals**
- **Terminal 1 (Backend):**
  ```bash
  npm run server:dev
  ```
- **Terminal 2 (Frontend):**
  ```bash
  npm run client:dev
  ```

---

## 🏗️ Tech Stack

### Frontend (`/client`)
- **React 19** with **TypeScript**.
- **Redux Toolkit (RTK)** for state management.
- **RTK Query** for efficient GraphQL data fetching and caching.
- **Tailwind CSS** for modern, responsive styling.
- **Zod** for robust client-side form validation.
- **Framer Motion** for smooth animations and transitions.

### Backend (`/server`)
- **NestJS** framework for a scalable Node.js server.
- **GraphQL** (Code-first approach).
- **Apollo Server** integration.
- **In-memory data store** (No external database required).

---

## 📂 Project Structure

```text
├── client/                # React application
│   ├── src/
│   │   ├── components/    # Reusable UI and Shared components
│   │   ├── features/      # Feature-specific logic (hooks, schemas, components)
│   │   ├── store/         # Redux store and API slices
│   │   └── pages/         # Page components (routes)
├── server/                # NestJS GraphQL API
│   ├── src/
│   │   ├── forms/         # Forms module (resolvers, services, models)
│   │   └── database/      # In-memory data structures
├── docker-compose.yml     # Docker orchestration
└── package.json           # Monorepo configuration (NPM Workspaces)
```

## Core Features
- **Form Builder:** Create dynamic forms with various question types (Text, Multiple Choice, Checkboxes, Date).
- **Validation:** Real-time form validation using Zod.
- **Form Filler:** Responsive interface for users to submit responses.
- **Responses View:** Detailed view of all collected data for each form.
- **Refined UX:** Clean, premium design with micro-interactions and loading states.
