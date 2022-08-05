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
      include: [{ model: User, attributes: { exclude: ["password"] } }],
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

router.get("/addBlog", async (req, res) => {
  return res.render("add-blog", {
    creator: req.session.creator,
    loggedIn: req.session.loggedIn,
  });
});

router.post("/addBlog", withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.create({
      post_title: req.body.title,
      content: req.body.content,
      creator: req.session.creator,
    });
    res.status(200).json(dbBlogData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/update/:id", async (req, res) => {
  return res.render("edit-blog", {
    creator: req.session.creator,
    loggedIn: req.session.loggedIn,
  });
});
router.put("/update/:id", withAuth, async (req, res) => {
  console.log("hello in put");
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log(blogData);
    if (!blogData[0]) {
      res.status(404).json({ message: "No exists " });
      return;
    }
    res.status(200).json(blogData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log("Data to be DELETED: ", blogData);
    if (!blogData) {
      res.status(400).json({ message: "Id does not exist!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
