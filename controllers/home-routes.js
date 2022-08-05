const router = require("express").Router();

const { Blog, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

/** GET all blogs and render to 'homepage' */
router.get("/", async (req, res) => {
  // console.log(req.session.username);
  try {
    const dbBlogData = await Blog.findAll({
      include: [{ all: true }],
    });
    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
    // console.log("BLOGS", blogs);
    res.render("homepage", {
      blogs,
      loggedIn: req.session.loggedIn,
      creator: req.session.creator,
      username: req.session.username,
    });
  } catch (error) {
    //   console.log(error);
    res.status(500).json(error);
  }
});
/** GET blog by ID and render to  */
router.get("/blog/:id", withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [{ model: User, nested: true }],
        },
        { model: User },
      ],
    });

    const blog = dbBlogData.get({ plain: true });
    const comments = blog.comments;
    console.log(comments);

    res.render("blog", {
      blog,
      comments,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
/** */
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
