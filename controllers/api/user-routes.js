const router = require("express").Router();
const { User } = require("../../models");

//create new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    // save session.loggedIn = true
    req.session.save(() => {
      req.session.loggeedIn = true;
      res.status(200).json(dbUserData);
    });
  } catch (error) {
    res.status(500).json(err);
  }
});
module.exports = router;
