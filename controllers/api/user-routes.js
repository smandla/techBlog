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
    // console.log(dbUserData);
    const data = dbUserData.get({ plain: true });
    console.log(data.username);
    req.session.save(() => {
      req.session.creator = data.id;
      req.session.loggedIn = true;
      res.status(200).json(dbUserData);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({ where: { email: req.body.email } });
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }
    const data = dbUserData.get({ plain: true });
    console.log(data.id);
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }
    req.session.save(() => {
      //save user for session
      req.session.username = data.username;
      req.session.creator = data.id;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;
