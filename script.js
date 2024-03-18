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
                            <img src="../images/virtualimage.png" alt="virtual machine" class="blog-image">
                            <div class="blog-content">

                <p>${item.subject}</p>
         
                <h3>${item.Title}</h3>
                <p class="blog-descript">${item.Intro}</p>
                <span class="blog-comment">
                    <img src="../images/like.png" alt="like-icon" id="likeIcon" class="icons">
                    <span style="font-size: 13px; font-weight: 500px;">45</span>
                    <i class="fa-regular fa-comment-dots"></i>
                    <a href="./blogdetails.html"><button class="read-more">Read More</button></a>
                </span>
                         </div>
                    </div>
           

             
            `;

      containers.appendChild(container);
    });
  }
});
