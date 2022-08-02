const sequelize = require('../config/connection');
// const seedBlog = require('./galleryData');
// const seedComment = require("../");

const seedAll = async () => {
    await sequelize.sync({ forcee: true })
    await
}
