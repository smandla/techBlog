var addBlogBtn = document.getElementById("add-blog");
var addBlogFormEl = document.getElementById("add-blog-section");
var blogsEl = document.getElementById("dashboard_home");
var createBlogBtn = document.getElementById("create-blog");

const replaceBlogs = () => {
  blogsEl.style.display = "none";
  addBlogFormEl.style.display = "inline";
};

const submitFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#addblog-title").value.trim();
  const content = document.querySelector("#addblog-content").value.trim();

  if (title && content) {
    const response = await fetch("/dashboard/addBlog", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to log in.");
    }
  }
};

addBlogBtn.addEventListener("click", replaceBlogs);
createBlogBtn.addEventListener("submit", submitFormHandler);
