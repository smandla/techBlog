const { Comment } = require("../models");
const commentData = [
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

const seedComment = () => Comment.bulkCreate(commentData);
module.exports = seedComment;
