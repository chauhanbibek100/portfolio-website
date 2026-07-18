import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "database.json");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

// POST contact form submission
app.post("/api/contact", (req, res) => {
  const { name, email, whatsapp, message } = req.body;
  if (!name || (!email && !whatsapp)) {
    return res
      .status(400)
      .json({
        error:
          "Name and at least one contact method (Email or WhatsApp) are required.",
      });
  }

  const db = readDB();
  const newContact = {
    id: Date.now().toString(),
    name,
    email: email || "",
    whatsapp: whatsapp || "",
    message: message || "",
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
    subject: `New Portfolio Message from ${name}`,
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
      return res
        .status(201)
        .json({
          success: true,
          message: "Message saved, but failed to send email.",
          data: newContact,
          emailError: error.message,
        });
    } else {
      console.log("Email sent:", info.response);
      return res
        .status(201)
        .json({
          success: true,
          message: "Message sent successfully to your email!",
          data: newContact,
        });
    }
  });
});

// POST project pitch form submission
app.post("/api/projects", (req, res) => {
  const { name, email, whatsapp, projectTitle, projectDesc, budget } = req.body;
  if (!name || !projectTitle || !projectDesc) {
    return res
      .status(400)
      .json({
        error: "Name, Project Title, and Project Description are required.",
      });
  }

  const db = readDB();
  const newProject = {
    id: Date.now().toString(),
    name,
    email: email || "",
    whatsapp: whatsapp || "",
    projectTitle,
    projectDesc,
    budget: budget || "Not specified",
    createdAt: new Date().toISOString(),
  };

  db.projects.push(newProject);
  writeDB(db);

  res
    .status(201)
    .json({
      success: true,
      message: "Project idea pitched successfully!",
      data: newProject,
    });
});

// GET all contact messages (for dev verification)
app.get("/api/contacts", (req, res) => {
  const db = readDB();
  res.json(db.contacts);
});

// GET all project pitches (for dev verification)
app.get("/api/projects", (req, res) => {
  const db = readDB();
  res.json(db.projects);
});

app.listen(PORT, () => {
  console.log(`Portfolio backend server running on http://localhost:${PORT}`);
});
