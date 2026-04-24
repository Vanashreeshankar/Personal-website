import Project from "../models/project.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ _id: 1 }); // FIX
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
};
