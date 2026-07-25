import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { name, email, whatsapp, message } = req.body;

  if (!name || (!email && !whatsapp)) {
    return res.status(400).json({
      error: "Name and at least one contact method (Email or WhatsApp) are required.",
    });
  }

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
    to: "bibekchauhan100@gmail.com",
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

  try {
    await transporter.sendMail(mailOptions);
    return res.status(201).json({
      success: true,
      message: "Message sent successfully to your email!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(201).json({
      success: true,
      message: "Message received, but failed to send email notification.",
      emailError: error.message,
    });
  }
}
