const router = require("express").Router();

const { Blog, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

//get all blogs by creator
console.log("hello");
router.get("/:creator", withAuth, async (req, res) => {
  try {
    const dbBlogDataByCreator = await Blog.findAll({
      where: {
        creator: req.params.creator,
      },
    });
    const blogs = dbBlogDataByCreator.map((blog) => blog.get({ plain: true }));

    res.status(200).json(blogs);
    res.render("dashboard", {
      blogs,
      loggedIn: req.session.loggedIn,
      creator: req.session.creator,
      username: req.session.username,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all blogs by creator
router.get("/", withAuth, async (req, res) => {
  try {
    const dbBlogDataByCreator = await Blog.findAll({
      where: {
        creator: req.session.creator,
      },

      include: [{ all: true, nested: true }],
    });
    const blogs = dbBlogDataByCreator.map((blog) => blog.get({ plain: true }));
    res.render("dashboard", {
      blogs,
      loggedIn: req.session.loggedIn,
      creator: req.session.creator,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//TODO: get post form GET /creator/addBlog
router.get("/:creator/addBlog", async (req, res) => {
  return res.render("add-blog", {
    creator: req.session.creator,
    loggedIn: req.session.loggedIn,
  });
});

//post new blog
router.post("/", withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.create({
      post_title: req.body.post_title,
      content: req.body.content,
      creator: req.body.creator,
    });
    res.status(200).json(dbBlogData);
  } catch (error) {
    res.status(400).json(error);
  }
});

//TODO: get update form

//TODO: update form

//TODO: delete post

module.exports = router;
