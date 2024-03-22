//HAMBURGER MENU

const hamburgerMenu = document.getElementById("hamburgerMenu");
const navLinks = document.getElementById("navLinks");
let likeIcon = document.querySelectorAll(".likeIcon");

hamburgerMenu.addEventListener("click", () => {
  if (navLinks.classList.contains("show")) {
    navLinks.classList.remove("show");
  } else {
    navLinks.classList.add("show");
  }

  if (emailValue === "") {
    setErrorFor(email, "Email can't be blank");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Email is not valid");
  } else {
    setSuccessFor(email);
  }
});

//Displaying content into blog cards

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve form data from local storage
  let formData = JSON.parse(localStorage.getItem("contents"));

  if (formData && formData.length > 0) {
    let containers = document.querySelector(".blog-container");

    formData.forEach((item) => {
      let container = document.createElement("div");
      container.classList.add(".blog-boxes");

      container.innerHTML = `
                         <div class="blog-box">
                         <img src="${item.image}" alt="Blog Image" class="blog-image"> 
                            <div class="blog-content">

                <p>${item.subject}</p>
         
                <h3>${item.Title}</h3>
                <p class="blog-descript">${item.Intro}</p>
                <span class="blog-comment">

                            <i class="far fa-thumbs-up" id="like-icon" class="likeIcon"></i>

                    <span style="font-size: 13px; font-weight: 500px;">0</span>
                    <i class="fa-regular fa-comment-dots" id="commentIcon"></i>
                    <button class="read-more" id="read-more" onclick="fun(${item.id})">Read More</button>
                </span>
                         </div>
                    </div>
           

             
            `;

      containers.appendChild(container);
    });
  }
});

//FUNCTION TO GET CONTENT OF BLOG WHILE I CLICK ON READ MORE BUTTON

function fun(id) {
  let cont = JSON.parse(localStorage.getItem("contents"));
  let selectedBlog = cont.find((item) => item.id === id);

  // Redirect to blogdetail.html with query parameters
  window.location.href = `blogdetails.html?id=${selectedBlog.id}&subject=${selectedBlog.subject}&title=${selectedBlog.Title}&intro=${selectedBlog.Intro}&content=${selectedBlog.Content}&subTitles=${selectedBlog.subTitles}`;
}

document.getElementById("likeIcon").addEventListener("click", () => {
  alert("it is working");
});
