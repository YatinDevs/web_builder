const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Template = sequelize.define(
  "Template",
  {
    template_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Templates",
    timestamps: true,
  }
);

Template.associate = (models) => {
  Template.hasMany(models.Website, {
    foreignKey: "template_id",
    as: "websites",
  });
};
module.exports = Template;
