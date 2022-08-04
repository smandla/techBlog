const router = require("express").Router();

const { Blog, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.post("/:id", withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      ...req.body,
      creator: req.session.creator,
    });
    res.status(200).json(dbCommentData);
  } catch (error) {
    res.status(400).json(error);
  }
});
module.exports = router;
