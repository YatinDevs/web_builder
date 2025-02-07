const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/refresh", authController.refreshToken);
router.post("/logout", authController.logout);
router.get("/me", authController.getEmp);

module.exports = router;
