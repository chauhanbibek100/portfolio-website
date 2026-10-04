import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "database.json");

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet()); // Sets secure HTTP headers
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : '*'
}));
app.use(express.json({ limit: "10kb" })); // Prevent large payload attacks

// Rate Limiting to prevent spam/DDoS
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: { error: "Too many requests from this IP, please try again later." }
});
app.use("/api/", apiLimiter);

// Initialize JSON database if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(
    DB_PATH,
    JSON.stringify({ contacts: [], projects: [] }, null, 2),
  );
}

// Helper to read DB
const readDB = () => {
  try {
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { contacts: [], projects: [] };
  }
};

// Helper to write DB
const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Simple API Key middleware for protected routes
const requireAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  const VALID_KEY = process.env.ADMIN_API_KEY || "dev-admin-key-change-me";
  if (apiKey !== VALID_KEY) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  next();
};

// POST contact form submission
app.post("/api/contact", (req, res) => {
  let { name, email, whatsapp, message } = req.body;
  if (!name || (!email && !whatsapp)) {
    return res.status(400).json({
      error:
        "Name and at least one contact method (Email or WhatsApp) are required.",
    });
  }

  name = String(name).substring(0, 100).trim();
  email = email ? String(email).substring(0, 100).trim() : "";
  whatsapp = whatsapp ? String(whatsapp).substring(0, 50).trim() : "";
  message = message ? String(message).substring(0, 2000).trim() : "";

  const db = readDB();
  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    whatsapp,
    message,
    createdAt: new Date().toISOString(),
  };

  db.contacts.push(newContact);
  writeDB(db);

  // Setup email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "bibekchauhan100@gmail.com", // Your receiving email
    subject: `You've got Message from ${name}`,
    text: `
      You have received a new message from your portfolio contact form!
      
      Name: ${name}
      Email: ${email || "Not provided"}
      WhatsApp: ${whatsapp || "Not provided"}
      
      Message:
      ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      // We still return 201 because the database save was successful
      return res.status(201).json({
        success: true,
        message: "Message saved, but failed to send email.",
        data: newContact,
        emailError: error.message,
      });
    } else {
      console.log("Email sent:", info.response);
      return res.status(201).json({
        success: true,
        message: "Message sent successfully!",
        data: newContact,
      });
    }
  });
});

// POST project pitch form submission
app.post("/api/projects", (req, res) => {
  let { name, email, whatsapp, projectTitle, projectDesc, budget } = req.body;
  if (!name || !projectTitle || !projectDesc) {
    return res.status(400).json({
      error: "Name, Project Title, and Project Description are required.",
    });
  }

  name = String(name).substring(0, 100).trim();
  email = email ? String(email).substring(0, 100).trim() : "";
  whatsapp = whatsapp ? String(whatsapp).substring(0, 50).trim() : "";
  projectTitle = String(projectTitle).substring(0, 150).trim();
  projectDesc = String(projectDesc).substring(0, 2000).trim();
  budget = budget ? String(budget).substring(0, 100).trim() : "Not specified";

  const db = readDB();
  const newProject = {
    id: Date.now().toString(),
    name,
    email,
    whatsapp,
    projectTitle,
    projectDesc,
    budget,
    createdAt: new Date().toISOString(),
  };

  db.projects.push(newProject);
  writeDB(db);

  res.status(201).json({
    success: true,
    message: "Project idea pitched successfully!",
    data: newProject,
  });
});

// GET all contact messages (Protected)
app.get("/api/contacts", requireAuth, (req, res) => {
  const db = readDB();
  res.json(db.contacts);
});

// GET all project pitches (Protected)
app.get("/api/projects", requireAuth, (req, res) => {
  const db = readDB();
  res.json(db.projects);
});

app.listen(PORT, () => {
  console.log(`Portfolio backend server running on http://localhost:${PORT}`);
});
