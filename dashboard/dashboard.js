let blogTitle = document.getElementById("btitle");
let subTitle = document.getElementById("sub-title");
let mainConcept = document.getElementById("main-concept");
let blogImage = document.getElementById("image-file");
let imageCaption = document.getElementById("image-caption");
let blogIntro = document.getElementById("blog-intro-content");
let blogContent = document.getElementById("blogContent");
let postBlogBtn = document.getElementById("blogPost");
let blogForm = document.getElementById("blog-form");
let likeHolder = document.getElementById("like-holder");

// Retrieve existing blog data  or initialize an empty array if none exists
let container = JSON.parse(localStorage.getItem("contents")) || [];
let lastId = parseInt(localStorage.getItem("lastId")) || 0;

postBlogBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Increment the last used ID
  lastId++;

  let titles = blogTitle.value;
  let subTitles = subTitle.value;
  let subject = mainConcept.value;
  // let image = blogImage.value;
  let caption = imageCaption.value;
  let Intro = blogIntro.value;
  let Content = blogContent.value;
  let like = likeHolder.value;

  // storing image to local storage

  const fr = new FileReader();
  fr.readAsDataURL(blogImage.files[0]);
  fr.addEventListener("load", () => {
    const imageUrl = fr.result;

    let blogContents = {
      Title: titles,
      subTitles: subTitles,
      subject: subject,
      image: imageUrl,
      like: like,
      caption: caption,
      Intro: Intro,
      Content: Content,
      id: lastId,
    };

    container.push(blogContents);

    // Update  data in local storage
    localStorage.setItem("contents", JSON.stringify(container));

    // Update the last used ID in local storage
    localStorage.setItem("lastId", lastId);

    // Reset form fields
    blogTitle.value = "";
    subTitle.value = "";
    mainConcept.value = "";
    blogImage.value = "";
    imageCaption.value = "";
    blogIntro.value = "";
    blogContent.value = "";

    document.getElementById("blog-form").style.visibility = "hidden";

    // Refresh the displayed blogs
    showData();
  });
});

//FUNCTION TO SHOW NEW BLOG FORM

newBlogBtn.addEventListener("click", () => {
  document.getElementById("blog-form").style.visibility = "visible";
});

//FUNCTION TO BLOG CONTENT

function showData() {
  // Retrieve form data from local storage
  let formData = JSON.parse(localStorage.getItem("contents"));

  if (formData && formData.length > 0) {
    let containers = document.querySelector(".blog-container");

    // Clear existing content
    containers.innerHTML = "";

    formData.forEach((item) => {
      let container = document.createElement("div");
      container.classList.add("blog-box");

      container.innerHTML = `
                    <img src="${item.image}" alt="Blog Image" class="blog-image"> 
                    <div class="blog-content">
                        <p>${item.subject}</p>
                        <img src="../images/pencil .png" alt="edit-icon" class="icons"  onclick="editBlog(${item.id})">
                        <img src="../images/trash.png" alt="delete-icon" class="icons" onclick="deleteBlog(${item.id})">
                        <h3>${item.Title}</h3>
                        <p class="blog-descript">${item.Intro}</p>
                        <span class="blog-comment" >
                            <i class="far fa-thumbs-up" id="like-icon"></i>
                            <span style="font-size: 13px; font-weight: 500px;" id="like-holder">0</span>
                          <i class="far fa-comment" id="comment-icon"></i>
                         <button class="read-more" id="read-more">Read More</button>
                        </span>
             
                </div>
            `;
      containers.appendChild(container);
    });
  }
}
showData();

//DELETING BLOG FUNCTIONALITY

function deleteBlog(id) {
  let formData = JSON.parse(localStorage.getItem("contents"));

  formData = formData.filter((item) => item.id !== id);

  localStorage.setItem("contents", JSON.stringify(formData));

  // Refresh the page to show updated data
  location.reload();
}

//EDIT FUNCTION
function editBlog(id) {
  let formData = JSON.parse(localStorage.getItem("contents"));
  let selectedBlog = formData.find((item) => item.id === id);

  // Set the id of the selected blog in local storage
  localStorage.setItem("editId", JSON.stringify(id));

  document.getElementById("main-concept").value = selectedBlog.subject;
  document.getElementById("btitle").value = selectedBlog.Title;
  document.getElementById("sub-title").value = selectedBlog.subTitles;
  // document.getElementById("image-file").value = selectedBlog.image;
  document.getElementById("image-caption").value = selectedBlog.caption;
  document.getElementById("blog-intro-content").value = selectedBlog.Intro;
  document.getElementById("blogContent").value = selectedBlog.Content;

  document.getElementById("blog-form").style.visibility = "visible";

  // Scroll to the top of the page to show the edit form
  window.scrollTo(0, 0);
  document.getElementById("blogPost").textContent = "UPDATE";
}

// UPDATE FUNCTION

document.getElementById("blogPost").addEventListener("click", function () {
  // alert("it is update");

  // Retrieve the ID of the blog being edited
  let editId = JSON.parse(localStorage.getItem("editId"));
  let formData = JSON.parse(localStorage.getItem("contents"));

  // Find the index of the blog post in the formData array
  let index = formData.findIndex((item) => item.id === editId);

  if (index !== -1) {
    // Update the blog post with the new values
    formData[index].subject = document.getElementById("main-concept").value;
    formData[index].Title = document.getElementById("btitle").value;
    formData[index].subTitles = document.getElementById("sub-title").value;
    // formData[index].image = document.getElementById("image-file").value;
    formData[index].caption = document.getElementById("image-caption").value;
    formData[index].Intro = document.getElementById("blog-intro-content").value;
    formData[index].Content = document.getElementById("blogContent").value;

    // Remove the blog post if its content is empty
    if (
      formData[index].subject === "" &&
      formData[index].Title === "" &&
      formData[index].subTitles === "" &&
      // formData[index].image === "" &&
      formData[index].caption === "" &&
      formData[index].Intro === "" &&
      formData[index].Content === ""
    ) {
      formData.splice(index, 1);
    }

    // Update the formData
    localStorage.setItem("contents", JSON.stringify(formData));

    localStorage.removeItem("editId");

    location.reload();
  }
});
let counter = 0;

document.getElementById("like-icon").addEventListener("click", () => {
  counter += 1;
  document.getElementById("like-holder").innerHTML = counter;
});

document.querySelector(".read-more").addEventListener("click", () => {
  alert("working");
  // document.location.href = "../blogdetails.html";
});
