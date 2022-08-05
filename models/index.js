const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");
User.hasMany(Blog, {
  foreignKey: "creator",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: "creator",
  onDelete: "CASCADE",
});

Blog.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
});

// Comment.hasOne(User, {
//   foreignKey: "comment_id",
// });

// comment belongs to one user
// users have many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, { foreignKey: "user_id" });
module.exports = { User, Blog, Comment };
