var editBlogBtn = document.getElementById("update-blog");

const updateFormHandler = (event) => {
  event.preventDefault();

  const title = document.getElementById("editblog-title").value.trim();
  // const content = document.getElementById("editblog-content").value.trim();
  // const path = window.location.pathname
  // const id = window.location.toString().split("/")[
  //   window.location.toString().split("/").length - 1
  // ];
  // if (title && content) {
  //   const response = await fetch(`/dashboard/update/${id}`, {
  //     method: "PUT",
  //     body: JSON.stringify({ post_title: title, content }),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   if (response.ok) {
  //     document.location.replace("/dashboard");
  //   } else {
  //     alert("Failed to log in.");
  //   }
  // }
};

editBlogBtn.addEventListener("submit", updateFormHandler);
