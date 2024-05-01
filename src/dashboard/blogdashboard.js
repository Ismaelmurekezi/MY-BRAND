let blogTitle = document.getElementById("btitle");
let subTitle = document.getElementById("sub-title");
let mainConcept = document.getElementById("main-concept");
let blogImage = document.getElementById("image-file");
let imageCaption = document.getElementById("image-caption");
let blogIntro = document.getElementById("blog-intro-content");
let blogContent = document.getElementById("blogContent");
let postBlogBtn = document.getElementById("blogPost");
let blogForm = document.getElementById("blog-form");
let newBlogBtn = document.getElementById("newBlogBtn");
let likeHolders = document.querySelectorAll(".like-holder");

// Event listener for Create a new blog
postBlogBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  // Read image file and store to local storage
  const fr = new FileReader();
  fr.readAsDataURL(blogImage.files[0]);
  fr.addEventListener("load", async () => {
    try {
      const imageUrl = fr.result;

      const formData = new FormData();
      formData.append("title", blogTitle.value);
      formData.append("subject", mainConcept.value);
      formData.append("subtitle", subTitle.value);
      formData.append("intro", blogIntro.value);
      formData.append("caption", imageCaption.value);
      formData.append("content", blogContent.value);
      formData.append("image", blogImage.files[0]);

      const token = localStorage.getItem("token");
      // Send form data to backend API
      const response = await fetch(
        "https://my-brand-backend-ibtm.onrender.com/api/blog/create",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const newBlog = await response.json();
        console.log(newBlog);
        alert("New blog created successfully");
        location.reload();

        // Reset form fields
        blogTitle.value = "";
        subTitle.value = "";
        mainConcept.value = "";
        blogImage.value = "";
        imageCaption.value = "";
        blogIntro.value = "";
        blogContent.value = "";

        blogForm.style.visibility = "hidden";

        // Refresh the displayed blogs
      } else {
        console.error("Failed to create blog:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  });
});

// Event listener for showing new blog form
newBlogBtn.addEventListener("click", () => {
  blogForm.style.visibility = "visible";
});

// Function to display blog posts card in Admin dashboard
function showData() {
  fetch("https://my-brand-backend-ibtm.onrender.com/api/blog/getAllBlogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let containers = document.querySelector(".blog-container");
      let blogs = data.length;
      // console.log(blogs);

      document.getElementById("allblogs").innerHTML = blogs;
      document.getElementById("blogs").innerHTML = blogs;

      data.forEach((item) => {
        let container = document.createElement("div");
        container.classList.add(".blog-boxes");

        container.innerHTML = `
                <div class="blog-box">
                    <img src="${item.image}" alt="Blog Image" class="blog-image">
                    <div class="blog-content">
                        <p>${item.subject}</p>
                        <img src="/assets/editing.png" alt="edit-icon" class="icons" onclick="editBlog('${item._id}')"/>
                        <img src="/assets/trash.png" alt="delete-icon" class="icons" onclick="deleteBlog('${item._id}')">
                        <h3>${item.title}</h3>
                        <p class="blog-descript">${item.intro}</p>
                        <span class="blog-comment">
                              <i class="far fa-thumbs-up like-icon" id="like-icon-${item._id}" onclick="handleLike('${item._id}')"></i>
                              <span class="like-holder" id="like-holder-${item._id}">${item.likes}</span>
                            <i class="fa-regular fa-comment-dots" id="commentIcon"></i>
                            <a href="../blogdetails.html?id=${item._id}"><button class="read-more" id="read-more">Read More</button></a>
                        </span>
                    </div>
                </div>
            `;

        containers.appendChild(container);
      });
    })
    .catch((error) => {
      console.error("Error fetching blog content:", error);
    });
}

showData();

// Function to delete a blog

async function deleteBlog(id) {
  try {
    const token = localStorage.getItem("token");
    // console.log(token);

    // Sending a Delate request to backend API
    const response = await fetch(
      `https://my-brand-backend-ibtm.onrender.com/api/blog/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      alert(`Blog with ID ${id} deleted successfully`);
      //reload the page to have changes
      location.reload();
    } else {
      console.error(
        `Failed to delete blog with ID ${id}:`,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
}

async function editBlog(id) {
  try {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");
    // console.log(token);

    // Retrieve the blog data from the backend API
    const response = await fetch(
      `https://my-brand-backend-ibtm.onrender.com/api/blog/getBlogById/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch blog data");
    }

    const blogData = await response.json();

    // Populate the form fields with the blog data
    document.getElementById("main-concept").value = blogData.subject;
    document.getElementById("btitle").value = blogData.title;
    document.getElementById("sub-title").value = blogData.subtitle;
    document.getElementById("image-caption").value = blogData.caption;
    document.getElementById("blog-intro-content").value = blogData.intro;
    document.getElementById("blogContent").value = blogData.content;

    blogForm.style.visibility = "visible";

    // Scroll to the top of the page
    window.scrollTo(0, 0);

    document.getElementById("blogPost").textContent = "UPDATE";

    // FUNCTIONALITY FOR UPDATING THE BLOG

    document.getElementById("blogPost").addEventListener("click", function () {
      // Create FormData object to send data to backend
      const formData = new FormData();
      formData.append("subject", document.getElementById("main-concept").value);
      formData.append("title", document.getElementById("btitle").value);
      formData.append("subtitle", document.getElementById("sub-title").value);
      formData.append(
        "caption",
        document.getElementById("image-caption").value
      );
      formData.append(
        "intro",
        document.getElementById("blog-intro-content").value
      );
      formData.append("content", document.getElementById("blogContent").value);

      // Check if a new image has been selected
      const imageFile = document.getElementById("image-file").files[0];
      if (imageFile) {
        formData.append("image", imageFile);
      }

      fetch(
        `https://my-brand-backend-ibtm.onrender.com/api/blog/update/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      )
        .then((response) => {
          if (!response.ok) {
            console.log("Failed to update blog", error);
          }
          alert("Blog updated successfully");
          location.reload();
        })
        .catch((error) => {
          console.error("Error updating blog:", error);

          blogForm.style.visibility = "hidden";
        });
    });
  } catch (error) {
    console.error("Error editing blog:", error);
  }
}

//handle like functionality on blog

async function handleLike(blogId) {
  const likeIcon = document.getElementById(`like-icon-${blogId}`);
  const likeCount = document.getElementById(`like-holder-${blogId}`);

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://my-brand-backend-ibtm.onrender.com/api/blog/${blogId}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to like/unlike blog");
    }

    const data = await response.json();
    likeCount.textContent = data.likes; // Update like count

    // Toggle like icon color
    likeIcon.classList.toggle("liked");
  } catch (error) {
    console.error("Error liking/unliking blog:", error);
  }
}

//checking if token is expired and alert user

function checkTokenExpiration() {
  const token = localStorage.getItem("token");
  const loggedUserString = localStorage.getItem("loggedUser");
  const loggedUser = loggedUserString ? JSON.parse(loggedUserString) : null;

  if (token && loggedUser) {
    const expirationTime = localStorage.getItem("tokenExpiration");
    const currentTime = new Date().getTime();
    // console.log(loggedUser.message);

    //Showing off the admin name
    let userEmail = loggedUser.email;
    const username = userEmail.slice(0, userEmail.indexOf("@"));
    document.getElementById("admin").innerHTML = username;

    if (expirationTime && currentTime > parseInt(expirationTime)) {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedUser");
      localStorage.removeItem("tokenExpiration");

      alert("Your session has expired. Please log in again.");
    }
  }
}

window.addEventListener("load", checkTokenExpiration);

//CODE TO RUN THE POP UP MESSAGE

document.getElementById("submit-btn").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("popup").style.visibility = "visible";
  setTimeout(() => {
    document.getElementById("popup").style.visibility = "hidden";
  }, 3000);
});

//blogdetail content

window.addEventListener("DOMContentLoaded", async () => {
  // Extract blog ID from URL parameter
  const params = new URLSearchParams(window.location.search);
  const blogId = params.get("id");

  // Fetch full details of blog post from backend api
  const response = await fetch(
    `https://my-brand-backend-ibtm.onrender.com/api/blog/${blogId}`
  );
  if (response.ok) {
    const blogData = await response.json();

    const {
      subject,
      title,
      subtitle,
      intro,
      content,
      caption,
      image,
      comments,
    } = blogData;
    console.log(comments);
    comments.forEach;

    document.querySelector(".more-detail-blog").innerHTML = `
    <div class="blog-post-content">
    <p>${subject}</p>
    <h2>${title}</h2>
    <p class="blog-titles" id="header2">${subtitle}</p>
    <article class="article">${intro}</article>
    <article class="article">${content}</article>
    </div>
    <figure class="blog-image-container">
    <img src="${image}" alt="Blog Image" class="blog-image1">
   <figcaption><i>${caption}</i></figcaption>
    </figure>
        `;

    // Display comments
    let commentsContainer = document.querySelector(".comments-container");
    commentsContainer.innerHTML = "";

    if (comments && comments.length > 0) {
      comments.forEach((comment) => {
        const createdAtDate = new Date(comment.createdAt);
        const createdAtTime = createdAtDate.toLocaleTimeString();
        const createdAtDateString = createdAtDate.toLocaleDateString();
        let commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `
                    <div class="single-comment">
                        <p class="comment-user">${comment.userEmail}</p>
                        <p class="comment-message">${comment.text}</p>
                        <p class="comment-message"><span class="commented-time" id="time" >Commented At:</span> ${createdAtTime}</p>
                        <p class="comment-time"><span class="commented-time">Date:</span> ${createdAtDateString}</p>
                    </div>
                `;
        commentsContainer.appendChild(commentElement);
      });
    } else {
      commentsContainer.innerHTML = "<p>No comments yet for this post.</p>";
    }
  } else {
    console.error("Failed to fetch blog data");
  }
});

//Messaging form function

document.getElementById("submit-btn").addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const name = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    // Validate input fields
    if (!name || !email || !message) {
      throw new Error("Please fill in all fields");
    }

    // Retrieve the blog post ID associated with the comment from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    // Create comment object
    const commentData = {
      postId: postId,
      userEmail: email,
      username: name,
      text: message,
    };

    // console.log(commentData);
    const token = localStorage.getItem("token");
    // Send POST request to backend API to add comment
    const response = await fetch(
      `https://my-brand-backend-ibtm.onrender.com/api/blog/${postId}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
      }
    );

    if (response.ok) {
      alert("Comment added successfully");
    } else {
      // Handle error response from backend
      const errorData = await response.json();
      console.log(errorData.message || "Failed to add comment");
    }
  } catch (error) {
    console.error("Error:", error.message);
    // Display error message to the user
    document.getElementById("submit-error").textContent = error.message;
  }
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("contact-message").value = "";
  location.reload();
});

//LOGGING USER OUT

const logoutButton = document.getElementById("logouts");

logoutButton.addEventListener("click", async function () {
  try {
    const response = await fetch(
      "https://my-brand-backend-ibtm.onrender.com/api/user/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      alert("logged out successful");
      localStorage.removeItem("token");
      localStorage.removeItem("loggedUser");
      localStorage.removeItem("tokenExpiration");
      window.location.href = "/index.html";
    } else {
      console.error("Logout failed:", await response.text());
    }
  } catch (error) {
    console.error("An error occurred during logout:", error);
  }
});
