var addBlogBtn = document.getElementById("add-blog");

const replaceBlogs = () => {
  var blogsEl = document.getElementById("dashboard_home");
  blogsEl.style.display = "none";
  var addBlogFormEl = document.getElementById("add-blog-section");
  addBlogFormEl.style.display = "inline";
};
addBlogBtn.addEventListener("click", replaceBlogs);
