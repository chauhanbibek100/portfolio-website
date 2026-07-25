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

## 📁 Project Directory Structure

```text
my-site/
├── .env                  # Environment secrets (Port, Email credentials)
├── .gitignore            # Git ignored paths
├── .oxlintrc.json        # Linter configurations for oxlint
├── database.json         # Lightweight file-based JSON storage
├── index.html            # Entry point HTML document (Font & Icon imports)
├── package.json          # Dependency tree, project scripts, and versions
├── server.js             # Express API backend server code
├── vite.config.js        # Vite configurations
├── public/               # Static assets folder (favicons, logos, graphics)
└── src/                  # React Application directory
    ├── App.css           # Global app layout-specific styles
    ├── App.jsx           # Root React app component, manages site theme state
    ├── index.css         # Typography, global variables, design system tokens, themes
    ├── main.jsx          # Mounts the React app to the HTML root
    ├── assets/           # Application assets/images
    └── components/       # Custom modular portfolio UI sections
        ├── AboutSection.css/.jsx      # Professional background narrative
        ├── ContactSection.css/.jsx    # Contact form & custom Toast component
        ├── Footer.css/.jsx            # Page footer, social links & copyright info
        ├── Header.css/.jsx            # Navigation bar & dark/light theme switch
        ├── HeroSection.css/.jsx       # Engaging header landing banner
        ├── ProjectsSection.css/.jsx   # Static projects list & details modals
        └── SkillsSection.css/.jsx     # Technology proficiency graphs
```

---

## ⚙️ Environment Configurations

Create a `.env` file in the root directory to store sensitive details:

```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```
> [!IMPORTANT]
> - `EMAIL_PASS` must be a Gmail **App Password**, not your primary account password. Create one under your Google Account Security settings.
> - The application automatically reads `.env` variables using `dotenv` inside `server.js`.

---

## 📊 Database Architecture (`database.json`)

The database uses a clean, lightweight JSON structure saved in the root as `database.json`. It is initialized automatically on startup if it doesn't exist.

### Data Schemas

#### Contacts Schema
```json
{
  "id": "String (Timestamp-based unique ID)",
  "name": "String (Required)",
  "email": "String (Required if whatsapp is blank)",
  "whatsapp": "String (Required if email is blank)",
  "message": "String (Required)",
  "createdAt": "String (ISO 8601 Timestamp)"
}
```

#### Projects Schema (Pitch ideas)
```json
{
  "id": "String (Timestamp-based unique ID)",
  "name": "String (Required)",
  "email": "String (Optional)",
  "whatsapp": "String (Optional)",
  "projectTitle": "String (Required)",
  "projectDesc": "String (Required)",
  "budget": "String (Optional, defaults to 'Not specified')",
  "createdAt": "String (ISO 8601 Timestamp)"
}
```

---

## 🔌 API Endpoints Reference

All API endpoints are defined in [server.js](file:///c:/Users/bibek/Desktop/my-site/server.js).

### `POST /api/contact`
Submits a contact message. Saves data to the backend and triggers a Nodemailer email.
- **Request Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Sender Name",
    "email": "email@example.com",
    "whatsapp": "+91 XXXXX XXXXX",
    "message": "Hello message!"
  }
  ```
- **Responses**:
  - `201 Created` (Email Sent Successfully):
    ```json
    {
      "success": true,
      "message": "Message sent successfully to your email!",
      "data": { ... }
    }
    ```
  - `201 Created` (Saved, but Email Error):
    ```json
    {
      "success": true,
      "message": "Message saved, but failed to send email.",
      "data": { ... },
      "emailError": "Nodemailer error description"
    }
    ```
  - `400 Bad Request` (Missing validation criteria):
    ```json
    { "error": "Name and at least one contact method (Email or WhatsApp) are required." }
    ```

### `POST /api/projects`
Pitches a new project idea. (Backend-ready, currently not wired up in the UI).
- **Request Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Prospect Name",
    "email": "email@example.com",
    "whatsapp": "+91 XXXXX XXXXX",
    "projectTitle": "My Custom Project",
    "projectDesc": "Description details...",
    "budget": "$1000 - $3000"
  }
  ```
- **Responses**:
  - `201 Created`:
    ```json
    {
      "success": true,
      "message": "Project idea pitched successfully!",
      "data": { ... }
    }
    ```
  - `400 Bad Request`:
    ```json
    { "error": "Name, Project Title, and Project Description are required." }
    ```

### `GET /api/contacts`
Fetches a list of all contact form submissions.
- **Response**: Array of Contact objects.

### `GET /api/projects`
Fetches a list of all project pitches.
- **Response**: Array of Project pitch objects.

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
