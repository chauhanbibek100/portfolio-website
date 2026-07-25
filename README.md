# 🚀 Bibek's Personal Portfolio Website

A full-stack, responsive developer portfolio built with a React frontend, Vite build system, and a lightweight Node/Express backend. This application features dynamic theme toggling (Light/Dark mode), contact submission saving with an automated email notification system, and mock endpoint support for user-pitched projects.

---

## 🛠️ Technology Stack

| Layer | Technology | Details / Usage |
|---|---|---|
| **Frontend** | React 19 | Standard UI components & state management |
| | Vite | Fast Bundling & Hot Module Replacement (HMR) |
| | CSS Custom Variables | Custom styling, glassmorphism design system |
| | Font Awesome 6.5.1 | Iconography |
| | Google Fonts | Inter & JetBrains Mono typography |
| **Backend** | Node.js / Express | API routes, request validation, and database orchestration |
| | Nodemailer | Gmail SMTP integration for instant email alerts |
| | Cors | Cross-Origin Resource Sharing security |
| | Dotenv | Secure environment configurations |
| | Concurrently | Parallel development execution of frontend & backend |
| **Database** | JSON File | File-system persistence with `database.json` |

---


## 🎨 Frontend Features & Architecture

### 🌗 Theme Toggle Workflow
1. The global theme state is maintained in [App.jsx](file:///c:/Users/bibek/Desktop/my-site/src/App.jsx) as standard React state (`light` or `dark`).
2. An `useEffect` hook syncs this state to the root `<html>` attribute: `data-theme`.
3. [index.css](file:///c:/Users/bibek/Desktop/my-site/src/index.css) queries this attribute via:
   - `[data-theme="dark"]` for dark theme variables.
   - `[data-theme="light"]` for light theme variables.
4. CSS custom variables (e.g., `--bg-primary`, `--text-primary`) are dynamically adjusted, seamlessly updating child components.

### 📝 Form Validations
Client-side checks are carried out in [ContactSection.jsx](file:///c:/Users/bibek/Desktop/my-site/src/components/ContactSection.jsx) before hitting backend endpoints. Standard regex matches email formatting. Successful or failed responses display a dynamic Toast alert at the bottom.

---

## 🚀 Running and Managing the App

Make sure Node.js is installed on your local system.

### 1. Installation
Install all dependencies for both Vite frontend and Express server:
```bash
npm install
```

### 2. Run in Development
Start both frontend Vite server and backend Node server simultaneously:
```bash
npm run dev
```
- Frontend will open on: [http://localhost:5173](http://localhost:5173)
- Backend server runs on: [http://localhost:5000](http://localhost:5000)

### 3. Production Build
Compile high-performance production assets:
```bash
npm run build
```

### 4. Local Build Preview
Run a local web server to preview your production build locally:
```bash
npm run preview
```

### 5. Code Linting
Run `oxlint` to perform fast static analysis:
```bash
npm run lint
```
