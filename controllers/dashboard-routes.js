const router = require("express").Router();

const { Blog, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

//get all blogs by creator
router.get("/:creator", withAuth, async (req, res) => {
  try {
    const dbBlogDataByCreator = await Blog.findAll({
      where: {
        creator: req.params.creator,
      },
    });
    const blogs = dbBlogDataByCreator.map((blog) => blog.get({ plain: true }));

    // res.status(200).json(blogs);
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
    });
    const blogs = dbBlogDataByCreator.map((blog) => blog.get({ plain: true }));
    // res.status(200).json(blogs);
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
router.get("/addBlog", async (req, res) => {
  console.log("logged in", req.session.loggedIn);
  console.log("creator", req.session.creator);
  return res.render("add-blog", {
    creator: req.session.creator,
    loggedIn: req.session.loggedIn,
  });
});

//TODO: Look into this...
//post new blog
router.post("/addBlog", withAuth, async (req, res) => {
  console.log("logged in", req.session.loggedIn);
  console.log("creator", req.session.creator);
  try {
    const dbBlogData = await Blog.create({
      post_title: req.body.post_title,
      content: req.body.content,
      creator: req.session.creator,
    });
    // const blog = dbBlogData.get({ plain: true });
    // console.log(blog);
    res.status(200).json(dbBlogData);
  } catch (error) {
    res.status(400).json(error);
  }
});

//TODO: get update form

//TODO: update form
router.put("/update/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!blogData[0]) {
      res.status(404).json({ message: "No exists " });
      return;
    }
    res.status(200).json(blogData);
  } catch (error) {
    res.status(500).json(error);
  }
});

//TODO: delete post

module.exports = router;
