const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");
User.hasMany(Blog, {
  foreignKey: "user_id",
});

Blog.belongsTo(User, {
  foreignKey: "user_id",
});

Blog.hasMany(Comment, {
  foreignKey: "blog_id",
});

Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
});

// Comment.hasOne(User, {
//   foreignKey: "comment_id",
// });

// comment belongs to one user
// users have many comments
User.hasMany(Comment, { foreignKey: "username" });

Comment.belongsTo(User, { foreignKey: "username" });
module.exports = { User, Blog, Comment };
