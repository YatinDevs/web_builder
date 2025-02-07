const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");
const Employee = require("../models/employeeModel");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokenUtils");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingEmployee = await Employee.findOne({ where: { email } });
    if (existingEmployee) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await Employee.create({
      username,
      email,
      password: hashedPassword,
      role: "employee",
    });

    const accessToken = generateAccessToken(employee);
    const refreshToken = generateRefreshToken(employee);

    await Token.create({
      employeeId: employee.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    setAuthCookies(res, accessToken, refreshToken);

    res
      .status(201)
      .json({ message: "User created and logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ where: { email } });

    if (!employee || !(await bcrypt.compare(password, employee.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(employee);
    const refreshToken = generateRefreshToken(employee);

    await Token.destroy({ where: { employeeId: employee.id } }); // Invalidate old refresh tokens
    await Token.create({
      employeeId: employee.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    setAuthCookies(res, accessToken, refreshToken);

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.status(401).json({ error: "No refresh token provided" });

    const tokenData = await Token.findOne({ where: { token: refreshToken } });
    if (!tokenData || tokenData.expiresAt < new Date())
      return res
        .status(401)
        .json({ error: "Invalid or expired refresh token" });

    const employee = await Employee.findByPk(tokenData.employeeId);
    const newAccessToken = generateAccessToken(employee);
    const newRefreshToken = generateRefreshToken(employee);

    await Token.destroy({ where: { token: refreshToken } }); // Rotate refresh token
    await Token.create({
      employeeId: employee.id,
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    setAuthCookies(res, newAccessToken, newRefreshToken);

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.status(400).json({ error: "No refresh token provided" });

    await Token.destroy({ where: { token: refreshToken } });

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getEmp = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken)
      return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const employee = await Employee.findByPk(decoded.id, {
      attributes: ["id", "username", "email", "role"],
    });

    if (!employee) return res.status(404).json({ error: "User not found" });

    res.json({ employee });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Helper function to set cookies
const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
