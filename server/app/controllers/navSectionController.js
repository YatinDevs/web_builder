const NavSection = require("../models/navSectionModel");
const Website = require("../models/websiteModel");

exports.createNavSection = async (req, res) => {
  try {
    console.log(req.user);
    let userId = req.user.id;
    let {
      website_id,
      titleUserName,
      caLogo,
      caContactNo1,
      caContactNo2,
      caEmailid,
      navItems,
    } = req.body;

    // Fetch the most recent website_id if not provided
    if (!website_id) {
      let latestWebsite = await Website.findOne({
        where: { user_id: userId },
        order: [["createdAt", "DESC"]],
      });

      if (!latestWebsite) {
        return res
          .status(404)
          .json({ error: "No website found for this user" });
      }

      website_id = latestWebsite.website_id;
    }
    // Validate required fields
    if (!titleUserName || !navItems) {
      return res.status(400).json({
        error: " titleUserName, and navItems are required",
      });
    }

    // Check if the website exists
    let website = await Website.findByPk(website_id);
    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }

    // Create new NavSection
    let navSection = await NavSection.create({
      website_id,
      titleUserName,
      caLogo,
      caContactNo1,
      caContactNo2,
      caEmailid,
      navItems, // JSON data
    });

    res
      .status(201)
      .json({ message: "NavSection created successfully", navSection });
  } catch (error) {
    console.error("Error creating NavSection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getNavSections = async (req, res) => {
  try {
    const navSections = await NavSection.findAll({
      include: [
        {
          model: Website,
          as: "website",
          attributes: ["website_id", "name", "subdomain", "templateId"],
        },
      ],
    });

    res.status(200).json({
      message: "NavSections retrieved successfully",
      data: navSections,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single navigation section by ID
exports.getNavSectionById = async (req, res) => {
  try {
    const navSection = await NavSection.findByPk(req.params.id);
    if (!navSection) {
      return res.status(404).json({ error: "NavSection not found" });
    }

    res
      .status(200)
      .json({ message: "NavSection retrieved successfully", data: navSection });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a navigation section
exports.updateNavSection = async (req, res) => {
  try {
    const { id } = req.params;
    const navSection = await NavSection.findByPk(id);

    if (!navSection) {
      return res.status(404).json({ error: "NavSection not found" });
    }

    await navSection.update(req.body);
    res
      .status(200)
      .json({ message: "NavSection updated successfully", data: navSection });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a navigation section
exports.deleteNavSection = async (req, res) => {
  try {
    const { id } = req.params;
    const navSection = await NavSection.findByPk(id);

    if (!navSection) {
      return res.status(404).json({ error: "NavSection not found" });
    }

    await navSection.destroy();
    res.status(200).json({ message: "NavSection deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
