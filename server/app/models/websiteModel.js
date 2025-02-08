const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Template = require("./templateModel");
const User = require("./userModel");

const Website = sequelize.define(
  "Website",
  {
    website_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Template,
        key: "template_id",
      },
    },
    subdomain: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "deployed"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "Websites",
    timestamps: true,
  }
);

Website.associate = (models) => {
  Website.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  Website.belongsTo(models.Template, {
    foreignKey: "template_id",
    as: "template",
  });
  Website.hasMany(models.NavSection, {
    foreignKey: "website_id",
    as: "navSections",
  });
};
module.exports = Website;
