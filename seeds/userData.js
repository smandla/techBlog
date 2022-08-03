const { User } = require("../models");
const userData = [
  {
    username: "sm",
    email: "sm@gmail.com",
    password: "12345567",
  },
  {
    username: "km",
    email: "skm@gmail.com",
    password: "12345678",
  },
];
const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
  });
module.exports = seedUsers;
