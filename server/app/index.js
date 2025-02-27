require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan"); // logger
// Required Dependencies

// db setup
const sequelize = require("./utils/db");

// Models setup

const User = require("./models/userModel");
const Token = require("./models/tokenModel");
const Template = require("./models/templateModel");
const Website = require("./models/websiteModel");
const NavSection = require("./models/navSectionModel");
const models = { User, Token, Template, Website, NavSection };

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Server
const app = express();

// CORS policy
const corsOptions = {
  origin: [
    "http://192.168.0.241:5173",
    "http://localhost:5173",
    "http://localhost:5174",
    "*",
  ],
  credentials: true,
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get("/dev", (req, res) => {
  res.send("Website Template App");
});

// Routes
const authRoutes = require("./routes/authRoutes");
const templateRoutes = require("./routes/templateRoutes");
const navSectionRoutes = require("./routes/navSectionRoutes");
const websiteRoutes = require("./routes/websiteRoutes");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/template", templateRoutes);
app.use("/api/v1/template/navSection", navSectionRoutes);
app.use("/api/v1/websites", websiteRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
    return sequelize.sync();
  })
  .then(() => {
    console.log("Models have been synchronized with the database.");

    const PORT = process.env.NODE_DOCKER_PORT || process.env.NODE_LOCAL_PORT;

    app.listen(PORT, () => {
      console.log(`Server is Running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
