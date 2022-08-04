const router = require("express").Router();

const { Blog, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/:id", withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      ...req.body,
      user_id: req.session.creator,
      blog_id: Number(req.params.id),
    });
    res.status(200).json(dbCommentData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/update/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log(commentData);
    if (!commentData[0]) {
      res.status(404).json({ message: "NO exists " });
      return;
    }
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(400).json({ message: "id does not exist" });
      return;
    }
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
