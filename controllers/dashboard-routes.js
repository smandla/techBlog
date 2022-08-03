const router = require("express").Router();

const { Blog, Comment, User } = require("../models");

//get all blogs by creator
router.get("/:creator", async (req, res) => {
  try {
    const dbBlogDataByCreator = await Blog.findAll({
      where: {
        creator: req.params.creator,
      },
    });
    console.log(dbBlogDataByCreator);
    const blogs = dbBlogDataByCreator.map((blog) => blog.get({ plain: true }));
    res.render("dashboard", {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all blogs by creator
router.get("/", async (req, res) => {
  console.log("hello");
  console.log(req.session.creator);
  console.log(req.session.loggedIn);
  try {
    const dbBlogDataByCreator = await Blog.findAll({
      where: {
        creator: req.session.creator,
      },
    });
    console.log(dbBlogDataByCreator);
    const blogs = dbBlogDataByCreator.map((blog) => blog.get({ plain: true }));
    // const blogs = [
    //   {
    //     post_title: "CoroNdscesddAH!",
    //     content: "When willwedwed this end..",
    //     creator: 1,
    //   },
    // ];
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

module.exports = router;
