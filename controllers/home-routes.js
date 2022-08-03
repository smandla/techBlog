const router = require("express").Router();

const { Blog, Comment } = require("../models");

/** GET all blogs and render to 'homepage' */
router.get("/", async (req, res) => {
  console.log(req.session.username);
  try {
    const dbBlogData = await Blog.findAll({
      include: [{ all: true }],
    });
    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
    console.log("BLOGS", blogs);
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
router.get("/blog/:id", async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });

    const blog = dbBlogData.get({ plain: true });

    res.render("blog", {
      blog,
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

//TODO: deal with link to dashboard

module.exports = router;
