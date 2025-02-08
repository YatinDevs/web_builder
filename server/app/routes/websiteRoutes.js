const express = require("express");
const {
  createWebsite,
  getAllWebsites,
  getWebsiteById,
  updateWebsite,
  deleteWebsite,
} = require("../controllers/websiteController");

const router = express.Router();

router.post("/", createWebsite);
router.get("/", getAllWebsites);
router.get("/:website_id", getWebsiteById);
router.put("/:website_id", updateWebsite);
router.delete("/:website_id", deleteWebsite);

module.exports = router;
