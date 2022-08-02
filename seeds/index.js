const sequelize = require("../config/connection");
const seedBlog = require("./blogData");
// const seedComment = require("../");

const seedAll = async () => {
  await sequelize.sync({ forcee: true });
  await seedBlog();

  process.exit(0);
};
seedAll();
