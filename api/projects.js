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

  const { name, email, whatsapp, projectTitle, projectDesc, budget } = req.body;

  if (!name || !projectTitle || !projectDesc) {
    return res.status(400).json({
      error: "Name, Project Title, and Project Description are required.",
    });
  }

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

  return res.status(201).json({
    success: true,
    message: "Project idea pitched successfully!",
    data: newProject,
  });
}
