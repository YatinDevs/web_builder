const Website = require("../models/websiteModel");
const { Op } = require("sequelize");

// Create a new website
const createWebsite = async (req, res) => {
  try {
    const { user_id, template_id, subdomain } = req.body;

    if (!user_id || !template_id || !subdomain) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if subdomain is already taken
    const existingWebsite = await Website.findOne({ where: { subdomain } });
    if (existingWebsite) {
      return res.status(400).json({ error: "Subdomain is already taken" });
    }

    const newWebsite = await Website.create({
      user_id,
      template_id,
      subdomain,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Website created successfully",
      website: newWebsite,
    });
  } catch (error) {
    console.error("Error creating website:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all websites
const getAllWebsites = async (req, res) => {
  try {
    const websites = await Website.findAll();
    res.status(200).json(websites);
  } catch (error) {
    console.error("Error fetching websites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a website by ID
const getWebsiteById = async (req, res) => {
  try {
    const { website_id } = req.params;
    const website = await Website.findByPk(website_id);
    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }
    res.status(200).json(website);
  } catch (error) {
    console.error("Error fetching website:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update website status
const updateWebsite = async (req, res) => {
  try {
    const { website_id } = req.params;
    const { status } = req.body;

    const website = await Website.findByPk(website_id);
    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }

    await website.update({ status });

    res.status(200).json({ message: "Website updated successfully", website });
  } catch (error) {
    console.error("Error updating website:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a website
const deleteWebsite = async (req, res) => {
  try {
    const { website_id } = req.params;
    const website = await Website.findByPk(website_id);
    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }

    await website.destroy();
    res.status(200).json({ message: "Website deleted successfully" });
  } catch (error) {
    console.error("Error deleting website:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createWebsite,
  getAllWebsites,
  getWebsiteById,
  updateWebsite,
  deleteWebsite,
};
