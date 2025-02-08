const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Website = require("./websiteModel");

const NavSection = sequelize.define(
  "NavSection",
  {
    section_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    website_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Website,
        key: "website_id",
      },
    },

    titleUserName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caLogo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    caContactNo1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    caContactNo2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    caEmailid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    navItems: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    tableName: "NavSections",
    timestamps: true,
  }
);

module.exports = NavSection;

NavSection.associate = (models) => {
  NavSection.belongsTo(models.Website, {
    foreignKey: "website_id",
    as: "website",
  });
};
