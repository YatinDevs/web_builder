const express = require("express");
const {
  createNavSection,
  getNavSections,
  getNavSectionById,
  updateNavSection,
  deleteNavSection,
} = require("../controllers/navSectionController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createNavSection);
router.get("/", getNavSections);
router.get("/:id", getNavSectionById);
router.put("/:id", updateNavSection);
router.delete("/:id", deleteNavSection);

module.exports = router;
