//FORM VALIDATION

// const { userInfo } = require("os");

const login = document.getElementById("login");
const username = document.getElementById("username");
const password = document.getElementById("password");
const submitError = document.getElementById("submit-error");
const form = document.getElementById("forms");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  verifyUser();
});

// function validateName() {
//   const usernameValue = username.value.trim();

//   if (usernameValue === "") {
//     errorMessage(username, "username is required field");
//     return false;
//   } else if (!usernameValue.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
//     errorMessage(username, "Write full name");
//     return false;
//   } else {
//     successMessage(username);
//     return true;
//   }
// }

// function validatePassword() {
//   const passwordValue = password.value.trim();

//   if (passwordValue === "") {
//     errorMessage(password, "Password is required field");
//     return false;
//   } else if (passwordValue.length < 8) {
//     errorMessage(password, "Password cannot less than 8");
//     return false;
//   } else {
//     successMessage(password);
//     return true;
//   }
// }

function verifyUser() {
  let user1 = JSON.parse(localStorage.getItem("userInfo"));

  //check if inputed userInfo is same to those in localstorage

  if (username.value === user1.username && password.value === user1.password) {
    document.getElementById("popups").style.visibility = "visible";

    setTimeout(() => {
      document.getElementById("popups").style.visibility = "hidden";
      window.location.href = "./dashboard/dashboard.html";
    }, 3000);
  } else {
    alert("Invalid ");
  }
}

//error sign display

function errorMessage(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;

  formControl.className = "form-control error";
}

//success sign display

function successMessage(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
