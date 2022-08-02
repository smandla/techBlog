const router = require("express").Router();

const { Blog, Comment } = require("../models");

//TODO: GET all existing blogs for homepage
router.get("/", async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: [
        {
          model: Comment,
        },
      ],
    });
    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
    res.render("homepage", {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    //   console.log(error);
    res.status(500).json(error);
  }
});

// TODO: deal with log ,in?
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//TODO: deal with link to dashboard
module.exports = router;
