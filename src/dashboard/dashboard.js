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

      // Send form data to backend API
      const response = await fetch("http://localhost:5000/api/blog/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newBlog = await response.json();
        console.log(newBlog);
        alert("New blog created successfully");

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
        location.reload();
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
  fetch("http://localhost:5000/api/blog/getAllBlogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let containers = document.querySelector(".blog-container");

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
                            <a href="./blogdetails.html?id=${item.id}"><button class="read-more" id="read-more">Read More</button></a>
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
      `http://localhost:5000/api/blog/delete/${id}`,
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
      `http://localhost:5000/api/blog/getBlogById/${id}`,
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

    // Change the button text to "UPDATE"
    document.getElementById("blogPost").textContent = "UPDATE";

    // Add an event listener to the update button to update the Blog
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

      // Sending request to update the blog
      fetch(`http://localhost:5000/api/blog/update/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            console.log("Failed to update blog", error);
          }
          // Blog success updated
          console.log("Blog updated successfully");
          location.reload();
        })
        .catch((error) => {
          console.error("Error updating blog:", error);

          blogForm.style.visibility = "hidden";
        });
    });
  } catch (error) {
    console.error("Error editing blog:", error);
    // Handle error (e.g., display error message to user)
  }
}

// //Function to edit the blog

// async function editBlog(id) {
//   try {
//     // Retrieve the blog data from the backend API
//     const response = await fetch(
//       `http://localhost:5000/api/blog/getBlogById/${id}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch blog data");
//     }

//     const blogData = await response.json();

//     // Populate the form fields with the blog data
//     document.getElementById("main-concept").value = blogData.subject;
//     document.getElementById("btitle").value = blogData.title;
//     document.getElementById("sub-title").value = blogData.subtitle;
//     document.getElementById("image-caption").value = blogData.caption;
//     document.getElementById("blog-intro-content").value = blogData.intro;
//     document.getElementById("blogContent").value = blogData.content;

//     blogForm.style.visibility = "visible";

//     // Scroll to the top of the page
//     window.scrollTo(0, 0);

//     // Change the button text to "UPDATE"
//     document.getElementById("blogPost").textContent = "UPDATE";

//     // Add an event listener to the update button to update the Blog
//     document.getElementById("blogPost").addEventListener("click", function () {
//       // Create FormData object to send data to backend
//       const formData = new FormData();
//       formData.append("subject", document.getElementById("main-concept").value);
//       formData.append("title", document.getElementById("btitle").value);
//       formData.append("subtitle", document.getElementById("sub-title").value);
//       formData.append(
//         "caption",
//         document.getElementById("image-caption").value
//       );
//       formData.append(
//         "intro",
//         document.getElementById("blog-intro-content").value
//       );
//       formData.append("content", document.getElementById("blogContent").value);

//       // Check if a new image has been selected
//       const imageFile = document.getElementById("image-file").files[0];
//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       // Sending request to update the blog
//       fetch(`http://localhost:5000/api/blog/update/${id}`, {
//         method: "PUT",
//         body: formData,
//       })
//         .then((response) => {
//           if (!response.ok) {
//             console.log("Failed to update blog", error);
//           }
//           // Blog success updated
//           console.log("Blog updated successfully");
//           location.reload();
//         })
//         .catch((error) => {
//           console.error("Error updating blog:", error);

//           blogForm.style.visibility = "hidden";
//         });
//     });
//   } catch (error) {
//     console.error("Error editing blog:", error);
//   }
// }

//handle like functionality on blog

async function handleLike(blogId) {
  const likeIcon = document.getElementById(`like-icon-${blogId}`);
  const likeCount = document.getElementById(`like-holder-${blogId}`);

  try {
    const response = await fetch(
      `http://localhost:5000/api/blog/${blogId}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

// // Function to delete a blog
// function deleteBlog(id) {
//   let formData = JSON.parse(localStorage.getItem("contents"));
//   formData = formData.filter((item) => item.id !== id);
//   localStorage.setItem("contents", JSON.stringify(formData));

//   let commentsHolder = JSON.parse(localStorage.getItem("commentHolder")) || [];

//   // Convert postId to number for comparison
//   const postId = parseInt(id);

//   commentsHolder = commentsHolder.filter(
//     (comment) => parseInt(comment.postId) !== postId
//   );
//   localStorage.setItem("commentHolder", JSON.stringify(commentsHolder));

//   location.reload();
// }

// // Function to edit a blog
// function editBlog(id) {
//   let formData = JSON.parse(localStorage.getItem("contents"));
//   let selectedBlog = formData.find((item) => item.id === id);
//   localStorage.setItem("editId", JSON.stringify(id));
//   document.getElementById("main-concept").value = selectedBlog.subject;
//   document.getElementById("btitle").value = selectedBlog.Title;
//   document.getElementById("sub-title").value = selectedBlog.subTitles;
//   document.getElementById("image-caption").value = selectedBlog.caption;
//   document.getElementById("blog-intro-content").value = selectedBlog.Intro;
//   document.getElementById("blogContent").value = selectedBlog.Content;
//   blogForm.style.visibility = "visible";
//   window.scrollTo(0, 0);
//   document.getElementById("blogPost").textContent = "UPDATE";
// }

// // Function to update a blog
// document.getElementById("blogPost").addEventListener("click", function () {
//   let editId = JSON.parse(localStorage.getItem("editId"));
//   let formData = JSON.parse(localStorage.getItem("contents"));
//   let index = formData.findIndex((item) => item.id === editId);
//   //if item is there
//   if (index !== -1) {
//     formData[index].subject = document.getElementById("main-concept").value;
//     formData[index].Title = document.getElementById("btitle").value;
//     formData[index].subTitles = document.getElementById("sub-title").value;
//     formData[index].Intro = document.getElementById("blog-intro-content").value;
//     formData[index].Content = document.getElementById("blogContent").value;

//     // Check if a new image has been selected
//     if (document.getElementById("image-file").files.length > 0) {
//       const fr = new FileReader();
//       fr.readAsDataURL(document.getElementById("image-file").files[0]);
//       fr.addEventListener("load", () => {
//         formData[index].image = fr.result;

//         // Update the formData
//         localStorage.setItem("contents", JSON.stringify(formData));
//         location.reload();
//       });
//     } else {
//       // Update the formData
//       localStorage.setItem("contents", JSON.stringify(formData));
//       location.reload();
//     }
//   }
// });

// // Function to increase like on blog as someone clicks on like icon
// function counter(id) {
//   let formData = JSON.parse(localStorage.getItem("contents"));
//   let index = formData.findIndex((item) => item.id === id);

//   // Increment the like count of the specific blog
//   formData[index].like++;

//   localStorage.setItem("contents", JSON.stringify(formData));

//   document.getElementById(`like-holder-${id}`).textContent =
//     formData[index].like;
// }
