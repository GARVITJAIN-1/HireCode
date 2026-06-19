# HireCode

> An interactive coding and chat platform with automated background workflows.

![GitHub stars](https://img.shields.io/github/stars/GARVITJAIN-1/HireCode?style=for-the-badge&logo=github) ![GitHub forks](https://img.shields.io/github/forks/GARVITJAIN-1/HireCode?style=for-the-badge&logo=github) ![GitHub issues](https://img.shields.io/github/issues/GARVITJAIN-1/HireCode?style=for-the-badge&logo=github) ![Last commit](https://img.shields.io/github/last-commit/GARVITJAIN-1/HireCode?style=for-the-badge&logo=github) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![License](https://img.shields.io/badge/license-ISC-green?style=for-the-badge)

## 📑 Table of Contents

- [Description](#description)
- [Key Features](#key-features)
- [Use Cases](#use-cases)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Contributing](#contributing)
- [License](#license)

## 📝 Description

HireCode is a software platform designed to manage interactive coding sessions, user communication, and automated background tasks. By dividing responsibilities between a modern React client and an Express backend, the platform provides a cohesive interface for structured collaborations. It addresses the need for secure, state-managed environments where users can interact, chat, and trigger backend processes. The frontend client utilizes Vite, React Router, and TanStack Query for efficient server-state management. User identity is securely handled through Clerk integration on both frontend and backend. The Express server powers dedicated API endpoints for chat, session management, and coding features, while utilizing Inngest to orchestrate event-driven background workflows.

## ✨ Key Features

- **🔐 Secure Clerk Authentication** — Protects client-side views and backend API endpoints using Clerk SDKs and middleware.
- **⚡ Inngest Workflow Integration** — Orchestrates background tasks and asynchronous event-driven jobs via a dedicated Inngest serve route.
- **💬 Chat and Session APIs** — Exposes structured Express routes to manage user sessions and text-based chat logs.
- **🔄 Declarative Client Data Fetching** — Uses TanStack Query on the React frontend to cache, update, and synchronize server state efficiently.

## 🎯 Use Cases

- Conducting remote technical interviews with structured coding sessions and real-time chat.
- Building collaborative platforms that require secure user authentication and background workflow automation.

## 🛠️ Tech Stack

- 🟨 **JavaScript**
- ⬢ **Node.js**
- ⚡ **Vite**

## ⚡ Quick Start

```bash

# 1. Clone the repository
git clone https://github.com/GARVITJAIN-1/HireCode.git

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run start
```

## 🚀 Available Scripts

- **build** — `npm run build`
- **start** — `npm run start`

## 🌐 API Endpoints

Detected endpoints (best-effort scan):

```
GET /api/health
GET /{*any}
```

## 📁 Project Structure

```
.
├── backend
│   ├── package.json
│   └── src
│       ├── controllers
│       │   ├── chatController.js
│       │   ├── code.controller.js
│       │   └── sessionController.js
│       ├── lib
│       │   ├── db.js
│       │   ├── env.js
│       │   ├── inngest.js
│       │   └── stream.js
│       ├── middleware
│       │   └── protectRoute.js
│       ├── models
│       │   ├── Session.js
│       │   └── User.js
│       ├── routes
│       │   ├── chatRoutes.js
│       │   ├── code.route.js
│       │   └── sessionRoutes.js
│       └── server.js
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── public
│   │   ├── favicon.svg
│   │   ├── hero.png
│   │   ├── icons.svg
│   │   ├── java.png
│   │   ├── javascript.png
│   │   ├── python.png
│   │   ├── screenshot-for-readme.png
│   │   └── vite.svg
│   ├── src
│   │   ├── App.jsx
│   │   ├── api
│   │   │   └── sessions.js
│   │   ├── assets
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── components
│   │   │   ├── ActiveSessions.jsx
│   │   │   ├── CodeEditorPanel.jsx
│   │   │   ├── CreateSessionModal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── OutputPanel.jsx
│   │   │   ├── ProblemDescription.jsx
│   │   │   ├── RecentSessions.jsx
│   │   │   ├── StatsCards.jsx
│   │   │   ├── VideoCallUI.jsx
│   │   │   └── WelcomeSection.jsx
│   │   ├── data
│   │   │   └── problems.js
│   │   ├── hooks
│   │   │   ├── useSessions.js
│   │   │   └── useStreamClient.js
│   │   ├── index.css
│   │   ├── lib
│   │   │   ├── axios.js
│   │   │   ├── piston.js
│   │   │   ├── stream.js
│   │   │   └── utils.js
│   │   ├── main.jsx
│   │   └── pages
│   │       ├── DashboardPage.jsx
│   │       ├── HomePage.jsx
│   │       ├── ProblemPage.jsx
│   │       ├── ProblemsPage.jsx
│   │       └── SessionPage.jsx
│   └── vite.config.js
└── package.json
```

## 🛠️ Development Setup

### Node.js / JavaScript
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` (or `yarn` / `pnpm install` / `bun install`)
3. Start the dev server: see the **Quick Start** above

## 👥 Contributing

Contributions are welcome! Here's the standard flow:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/GARVITJAIN-1/HireCode.git`
3. **Branch**: `git checkout -b feature/your-feature`
4. **Commit**: `git commit -m 'feat: add some feature'`
5. **Push**: `git push origin feature/your-feature`
6. **Open** a pull request

Please follow the existing code style and include tests for new behavior where applicable.

## 📜 License

This project is licensed under the **ISC** License.

---
*This README was generated with ❤️ by [ReadmeBuddy](https://readmebuddy.com)*
