const { Comment } = require("../models");
const commentData = [
  {
    content: "Warriors did it again!",
  },
  {
    content: "When will this end..",
  },
];

const seedComment = () => Comment.bulkCreate(commentData);
module.exports = seedComment;
