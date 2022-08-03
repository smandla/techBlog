const router = require("express").Router();

const { Blog, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

//get all blogs by creator
console.log("hello");
router.get("/:creator", withAuth, async (req, res) => {
  console.log("USERNAME", req.session.username);
  try {
    const dbBlogDataByCreator = await Blog.findAll({
      where: {
        creator: req.params.creator,
      },
    });

    const blogs = dbBlogDataByCreator.map((blog) => blog.get({ plain: true }));
    console.log("blogs", blogs);
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
  console.log("hello");
  console.log("creator", req.session.creator);
  console.log(req.session.loggedIn);
  try {
    console.log("USERNAME", req.session.username);
    const dbBlogDataByCreator = await Blog.findAll({
      where: {
        creator: req.session.creator,
      },

      include: [{ all: true, nested: true }],
    });
    // console.log(dbBlogDataByCreator);
    const blogs = dbBlogDataByCreator.map((blog) => blog.get({ plain: true }));
    console.log("blogs", blogs);
    // const blogs = [
    //   {
    //     post_title: "CoroNdscesddAH!",
    //     content: "When willwedwed this end..",
    //     creator: 1,
    //   },
    // ];
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
//get comments by blog id

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
//get update form

//delete post

module.exports = router;
