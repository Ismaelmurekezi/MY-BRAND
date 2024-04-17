const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
let submitError = document.getElementById("submit-error");

let names = document.getElementById("username");
let email = document.getElementById("email");
let message = document.getElementById("contact-message");

function validateName1() {
  let name = document.getElementById("username").value;

  if (name.length == " ") {
    nameError.innerHTML = "Name is required";
    return false;
  }
  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameError.innerHTML = "Write full name";
    return false;
  }
  nameError.style.display = "none";
  document.getElementById("username").style.border = "2px solid green";
  return true;
}

function validateEmail() {
  let email = document.getElementById("email").value;

  if (email.length == " ") {
    emailError.innerHTML = "Email is required";
    return false;
  }

  if (!email.match(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/)) {
    emailError.innerHTML = "Email invalid";
    return false;
  }

  emailError.style.display = "none";
  document.getElementById("email").style.border = "2px solid green";
  return true;
}

function validateMessage() {
  let message = document.getElementById("contact-message").value;
  let required = 30;
  let left = required - message.length;

  if (message.length == " ") {
    messageError.innerHTML = "Please enter message";
    return false;
  }

  if (left > 0) {
    messageError.innerHTML = left + "more character required";
    return false;
  }
  messageError.style.display = "none";
  document.getElementById("contact-message").style.border = "2px solid green";
  return true;
}

function validateForm(e) {
  e.preventDefault();
  if (
    !validateName() ||
    !validatePhone() ||
    !validateEmail() ||
    !validateMessage()
  ) {
    submitError.style.display = "block";
    submitError.innerHTML = "Please fix error to submit";
    setTimeout(function () {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
}

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
    `http://localhost:5000/api/blog/getBlogById/${blogId}`
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
            <p>${subject}</p>
            <h2>${title}</h2>
            <p class="blog-titles" id="header2">${subtitle}</p>
            <article class="article">${intro}</article>
            <article class="article">${content}</article>
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
      `http://localhost:5000/api/blog/${postId}/comment`,
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
});
