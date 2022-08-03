const { Blog } = require("../models");
const blogData = [
  {
    post_title: "Warriors in 6!",
    content: "Warriors did it again!",
    creator: 1,
  },
  {
    post_title: "CoroNAH!",
    content: "When will this end..",
    creator: 2,
  },
];

const seedBlog = async (req, res) => {
  try {
    const data = await Blog.bulkCreate(blogData, { individualHooks: true });
    return data;
  } catch (err) {
    console.log(err);
  }
};
module.exports = seedBlog;
