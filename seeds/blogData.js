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
    creator: 3,
  },
];

const seedBlog = () => Blog.bulkCreate(blogData);
module.exports = seedBlog;
