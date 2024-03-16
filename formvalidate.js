//FORM VALIDATION

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInput();
});

function validateInput() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (usernameValue === "") {
    errorMessage(username, "username is required field");
  } else if (!usernameValue.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    errorMessage(username, "Write full name");
    return false;
  } else {
    successMessage(username);
  }

  if (emailValue === "") {
    errorMessage(email, "Email is required field");
  } else if (!isEmail(emailValue)) {
    errorMessage(email, "Email is not valid");
  } else {
    successMessage(email);
  }

  if (passwordValue === "") {
    errorMessage(password, "Password is required field");
  } else if (passwordValue.length < 8) {
    errorMessage(password, "Password cannot less than 8");
  } else {
    successMessage(password);
  }

  if (confirmPasswordValue === "") {
    errorMessage(confirmPassword, "Password is required field");
  } else if (passwordValue !== confirmPasswordValue) {
    errorMessage(confirmPassword, "Passwords does not match");
  } else {
    successMessage(confirmPassword);
  }
}

function errorMessage(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;

  formControl.className = "form-control error";
}

function successMessage(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isEmail(email) {
  var regexPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  return regexPattern.test(email);
}
