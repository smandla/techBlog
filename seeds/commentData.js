const { Comment } = require("../models");
const commentData = [
  {
    blog_id: 1,
    user_id: 1,
    content: "West Coast! Best Coast!!",
  },
  {
    blog_id: 2,
    user_id: 2,
    content: "2 years... too much...",
  },
];

const seedComment = () => Comment.bulkCreate(commentData);
module.exports = seedComment;
