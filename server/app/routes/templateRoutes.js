const express = require("express");
const {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/templateController");

const router = express.Router();

// Define routes
router.post("/", createTemplate); // Create Template
router.get("/", getAllTemplates); // Get All Templates
router.get("/:template_id", getTemplateById); // Get Template by ID
router.put("/:template_id", updateTemplate); // Update Template
router.delete("/:template_id", deleteTemplate); // Delete Template

module.exports = router;
