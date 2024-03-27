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

// document.getElementById("submit-btn").addEventListener("click", (e) => {
//   e.preventDefault();

//   document.getElementById("popup").style.visibility = "visible";
//   setTimeout(() => {
//     document.getElementById("popup").style.visibility = "hidden";
//   }, 3000);
// });

 // Retrieve query parameters
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const subject = urlParams.get("subject");
const title = urlParams.get("title");
const intro = urlParams.get("intro");
const content = urlParams.get("content");
const caption = urlParams.get("caption");
const subTitles = urlParams.get("subTitles");
const image = urlParams.get("image");

// Populate blog detail content
document.querySelector(".more-detail-blog").innerHTML = `
            <p>${subject}</p>
            <h2>${title}</h2>
            <p class="blog-titles" id="header2">${subTitles}</p>
            <article class="article"> ${intro}</article>

                    <p class="blog-title">${intro}</p>
                    <article class="article">${content}</article>
                   <figure class="blog-image-container">
                    <img src="${image}" alt="wireframe-image" class="blog-image1">
                    <figcaption><i>${caption}</i></figcaption>
                </figure>

    `;

let commentsHolder = [];

document.getElementById("submit-btn").addEventListener("click", (e) => {
  e.preventDefault();

  let name = names.value;
  let emails = email.value;
  let messages = message.value;

  // Retrieve the blog post ID associated with the comment
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  let comment = {
    postId: postId,
    names: name,
    email: emails,
    message: messages,
  };
  // Store the comment along with the blog post ID in local storage
  let commentsHolder = JSON.parse(localStorage.getItem("commentHolder")) || [];
  commentsHolder.push(comment);
  localStorage.setItem("commentHolder", JSON.stringify(commentsHolder));

  names.value = "";
  email.value = "";
  message.value = "";
});

document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the current blog post ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  let comments = JSON.parse(localStorage.getItem("commentHolder"));

  let commentsContainer = document.querySelector(".comments-container");

  commentsContainer.innerHTML = "";

  if (comments && comments.length > 0) {
    let postComments = comments.filter((comment) => comment.postId === postId);

    if (postComments.length > 0) {
      postComments.forEach((comment) => {
        let commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `
         <div class="single-comment">
          <p class="comment-user"> ${comment.email}</p>
          <p class="comment-message">${comment.message}</p>
          <div>
        `;
        commentsContainer.appendChild(commentElement);
      });
    } else {
      // If there are no comments  display a message
      commentsContainer.innerHTML = "<p>No comments yet for this post.</p>";
    }
  } else {
    // If there are no comments at all, display a message
    commentsContainer.innerHTML = "<p>No comments yet.</p>";
  }
});
