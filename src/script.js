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

//Functionality for getting all blogs from database

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://my-backend-i1bg.onrender.com/api/blog/getAllBlogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log("data");
      let containers = document.querySelector(".blog-container");

      data.forEach((item) => {
        let container = document.createElement("div");
        container.classList.add(".blog-boxes");
        // console.log(item);

        container.innerHTML = `
                <div class="blog-box">
                    <img src="${item.image}" alt="Blog Image" class="blog-image">
                    <div class="blog-content">
                        <p>${item.subject}</p>
                        <h3>${item.title}</h3>
                        <p class="blog-descript">${item.intro}</p>
                        <span class="blog-comment">
                                <i class="far fa-thumbs-up like-icon" onclick="toggleLike('${item._id}', this)"></i>
                             <span class="like-holder" id="like-holder-${item._id}">${item.likes}</span>
                            <i class="fa-regular fa-comment-dots" id="commentIcon"></i>
                            <a href="./blogdetails.html?id=${item._id}"><button class="read-more" id="read-more">Read More</button></a>
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
});

//Blog like functionality

async function toggleLike(blogId, iconElement) {
  try {
    const token = localStorage.getItem("token");

    // Send request to backend to like or unlike the blog
    const response = await fetch(
      `http://localhost:5000/api/blog/${blogId}/like`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      alert("Failed to toggle like");
    }

    // Update like count in UI
    const likeHolder = document.getElementById(`like-holder-${blogId}`);
    let likeCount = parseInt(likeHolder.textContent);

    // Check if the user has already liked the blog
    if (iconElement.classList.contains("liked")) {
      likeHolder.textContent = likeCount - 1;
      iconElement.classList.remove("liked");
      location.reload();
    } else {
      likeHolder.textContent = likeCount + 1;
      iconElement.classList.add("liked");
      location.reload();
    }
  } catch (error) {
    console.error("Error toggling like:", error);
  }
}

function checkTokenExpiration() {
  const token = localStorage.getItem("token");
  const loggedUserString = localStorage.getItem("loggedUser");
  const loggedUser = loggedUserString ? JSON.parse(loggedUserString) : null;

  if (token && loggedUser) {
    // Access the email property from the loggedUser object
    let userEmail = loggedUser.email;
    const username = userEmail.slice(0, userEmail.indexOf("@"));
    document.getElementById("names").innerHTML = username;
    // const email = loggedUser.email;
    // document.getElementById("names").innerHTML = email;

    const expirationTime = localStorage.getItem("tokenExpiration");
    const currentTime = new Date().getTime();
    document.getElementById("login").style.display = "none";
    document.getElementById("names").style.display = "block";

    if (expirationTime && currentTime > parseInt(expirationTime)) {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedUser");
      localStorage.removeItem("tokenExpiration");
      document.getElementById("names").style.display = "none";
      document.getElementById("login").style.display = "block";

      alert("Your session has expired. Please log in again.");
    }
  }
}

window.addEventListener("load", checkTokenExpiration);

function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdown-content");
  if (dropdownContent.style.display === "none") {
    dropdownContent.style.display = "block";
  } else {
    dropdownContent.style.display = "none";
  }
}

//Adding logout functionality to the home page

const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", async function () {
  try {
    const response = await fetch("http://localhost:5000/api/user/logout", {
      method: "POST",
    });

    if (response.ok) {
      const responseData = await response.json();
      alert(responseData.message);
      localStorage.removeItem("token");
      localStorage.removeItem("loggedUser");
      localStorage.removeItem("tokenExpiration");
      document.getElementById("profile").style.visibility = "hidden";
      location.reload();
    } else {
      console.error("Logout failed:", await response.text());
    }
  } catch (error) {
    console.error("An error occurred during logout:", error);
  }
});

// Function to retrieve user ID from token stored in local storage
function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (token) {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    console.log(decodedPayload);
    return decodedPayload?.data?._id;
  }
  return null;
}
