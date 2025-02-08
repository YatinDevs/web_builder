const Template = require("../models/templateModel");

// Create a new template
const createTemplate = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Template name is required" });
    }

    const newTemplate = await Template.create({ name, description });

    res.status(201).json({
      message: "Template created successfully",
      template: newTemplate,
    });
  } catch (error) {
    console.error("Error creating template:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all templates
const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.findAll();
    res.status(200).json(templates);
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single template by ID
const getTemplateById = async (req, res) => {
  try {
    const { template_id } = req.params;

    const template = await Template.findByPk(template_id);

    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    res.status(200).json(template);
  } catch (error) {
    console.error("Error fetching template:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a template by ID
const updateTemplate = async (req, res) => {
  try {
    const { template_id } = req.params;
    const { name, description } = req.body;

    const template = await Template.findByPk(template_id);

    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    await template.update({ name, description });

    res
      .status(200)
      .json({ message: "Template updated successfully", template });
  } catch (error) {
    console.error("Error updating template:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a template by ID
const deleteTemplate = async (req, res) => {
  try {
    const { template_id } = req.params;

    const template = await Template.findByPk(template_id);

    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    await template.destroy();

    res.status(200).json({ message: "Template deleted successfully" });
  } catch (error) {
    console.error("Error deleting template:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
};
