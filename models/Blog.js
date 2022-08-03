const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/connection");

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    creator: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },

      // comments?
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "blog",
  }
);
module.exports = Blog;
