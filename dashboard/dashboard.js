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

// Initialize container array for blog data or retrieve from local storage
let container = JSON.parse(localStorage.getItem("contents")) || [];
let lastId = parseInt(localStorage.getItem("lastId")) || 1;

// Event listener for posting a new blog
postBlogBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let commentsHolder = JSON.parse(localStorage.getItem("commentHolder")) || [];

  // Increment the last used ID
  lastId++;

  let titles = blogTitle.value;
  let subTitles = subTitle.value;
  let subject = mainConcept.value;
  let caption = imageCaption.value;
  let Intro = blogIntro.value;
  let Content = blogContent.value;

  // Read image file and store to local storage
  const fr = new FileReader();
  fr.readAsDataURL(blogImage.files[0]);
  fr.addEventListener("load", () => {
    const imageUrl = fr.result;

    let like = 0;

    // Create blog object
    let blogContents = {
      id: lastId,
      Title: titles,
      subTitles: subTitles,
      subject: subject,
      image: imageUrl,
      caption: caption,
      Intro: Intro,
      like: like,
      Content: Content,
    };

    // Add blog object to container array
    container.push(blogContents);

    // Update data in local storage
    localStorage.setItem("contents", JSON.stringify(container));
    // Update last ID
    localStorage.setItem("lastId", lastId);

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
    showData();
  });
});

// Event listener for showing new blog form
newBlogBtn.addEventListener("click", () => {
  blogForm.style.visibility = "visible";
});

// Function to display blog data
function showData() {
  let formData = JSON.parse(localStorage.getItem("contents"));

  if (formData && formData.length > 0) {
    let containers = document.querySelector(".blog-container");
    containers.innerHTML = ""; // Clear existing content

    formData.forEach((item) => {
      let container = document.createElement("div");
      container.classList.add("blog-box");
      container.innerHTML = `
        <img src="${item.image}" alt="Blog Image" class="blog-image"> 
        <div class="blog-content">
          <p>${item.subject}</p>
          <img src="../images/editing.png" alt="edit-icon" class="icons" onclick="editBlog(${item.id})">
          <img src="../images/trash.png" alt="delete-icon" class="icons" onclick="deleteBlog(${item.id})">
          <h3>${item.Title}</h3>
          <p class="blog-descript">${item.Intro}</p>
          <span class="blog-comment">
            <i class="far fa-thumbs-up like-icon" onclick="counter(${item.id})"></i>
            <span class="like-holder" id="like-holder-${item.id}">${item.like}</span>
            <i class="far fa-comment" id="comment-icon"  onclick="showCommentForm(${item.id})"></i>
           
            <button class="read-more" id="read-more" onclick="fun(${item.id})">Read More</button>
          </span>
        </div>`;

      containers.appendChild(container);
    });
  }
}

showData();

// Function to delete a blog
function deleteBlog(id) {
  let formData = JSON.parse(localStorage.getItem("contents"));
  formData = formData.filter((item) => item.id !== id);
  localStorage.setItem("contents", JSON.stringify(formData));

  let commentsHolder = JSON.parse(localStorage.getItem("commentHolder")) || [];

  // Convert postId to number for comparison
  const postId = parseInt(id);

  commentsHolder = commentsHolder.filter(
    (comment) => parseInt(comment.postId) !== postId
  );
  localStorage.setItem("commentHolder", JSON.stringify(commentsHolder));

  location.reload();
}

// Function to edit a blog
function editBlog(id) {
  let formData = JSON.parse(localStorage.getItem("contents"));
  let selectedBlog = formData.find((item) => item.id === id);
  localStorage.setItem("editId", JSON.stringify(id));
  document.getElementById("main-concept").value = selectedBlog.subject;
  document.getElementById("btitle").value = selectedBlog.Title;
  document.getElementById("sub-title").value = selectedBlog.subTitles;
  document.getElementById("image-caption").value = selectedBlog.caption;
  document.getElementById("blog-intro-content").value = selectedBlog.Intro;
  document.getElementById("blogContent").value = selectedBlog.Content;
  blogForm.style.visibility = "visible";
  window.scrollTo(0, 0);
  document.getElementById("blogPost").textContent = "UPDATE";
}

// Function to update a blog
document.getElementById("blogPost").addEventListener("click", function () {
  let editId = JSON.parse(localStorage.getItem("editId"));
  let formData = JSON.parse(localStorage.getItem("contents"));
  let index = formData.findIndex((item) => item.id === editId);
  //if item is there
  if (index !== -1) {
    formData[index].subject = document.getElementById("main-concept").value;
    formData[index].Title = document.getElementById("btitle").value;
    formData[index].subTitles = document.getElementById("sub-title").value;
    formData[index].Intro = document.getElementById("blog-intro-content").value;
    formData[index].Content = document.getElementById("blogContent").value;

    // Check if a new image has been selected
    if (document.getElementById("image-file").files.length > 0) {
      const fr = new FileReader();
      fr.readAsDataURL(document.getElementById("image-file").files[0]);
      fr.addEventListener("load", () => {
        formData[index].image = fr.result;

        // Update the formData
        localStorage.setItem("contents", JSON.stringify(formData));
        location.reload();
      });
    } else {
      // Update the formData
      localStorage.setItem("contents", JSON.stringify(formData));
      location.reload();
    }
  }
});

// Function to increase like on blog as someone clicks on like icon
function counter(id) {
  let formData = JSON.parse(localStorage.getItem("contents"));
  let index = formData.findIndex((item) => item.id === id);

  // Increment the like count of the specific blog
  formData[index].like++;

  localStorage.setItem("contents", JSON.stringify(formData));

  document.getElementById(`like-holder-${id}`).textContent =
    formData[index].like;
}
