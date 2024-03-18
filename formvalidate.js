//FORM VALIDATION

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // validateInput();
  validateForm1();
});

//functions to validate form fields

function validateName() {
  const usernameValue = username.value.trim();

  if (usernameValue === "") {
    errorMessage(username, "username is required field");
    return false;
  } else if (!usernameValue.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    errorMessage(username, "Valid username please");
    return false;
  } else {
    successMessage(username);
    return true;
  }
}

function validateEmail() {
  const emailValue = email.value.trim();

  if (emailValue === "") {
    errorMessage(email, "Email is required field");
    return false;
  } else if (!isEmail(emailValue)) {
    errorMessage(email, "Email is not valid");
    return false;
  } else {
    successMessage(email);
    return true;
  }
}

function isEmail(email) {
  var regexPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  return regexPattern.test(email);
}

function validatePassword() {
  const passwordValue = password.value.trim();

  if (passwordValue === "") {
    errorMessage(password, "Password is required field");
    return false;
  } else if (passwordValue.length < 8) {
    errorMessage(password, "Password cannot less than 8");
    return false;
  } else {
    successMessage(password);
    return true;
  }
}

function validateConfirmPassword() {
  const confirmPasswordValue = confirmPassword.value.trim();
  const passwordValue = password.value.trim();

  if (confirmPasswordValue === "") {
    errorMessage(confirmPassword, "cPassword is required field");
    return false;
  } else if (passwordValue !== confirmPasswordValue) {
    errorMessage(confirmPassword, "Passwords does not match");
    return false;
  } else {
    successMessage(confirmPassword);
    return true;
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

const validateForm = () => {
  if (validateName() && validateEmail()) {
    alert("Hello");
  } else {
    alert("Hi");
  }
};

function validateForm1() {
  const isUsernameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmedPasswordValid = validateConfirmPassword();

  // If both username and password are valid
  if (
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmedPasswordValid
  ) {
    // Saving username to localStorage
    const userInfo = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    let user = JSON.stringify(userInfo);

    alert("Username saved to localStorage successfully!");
    localStorage.setItem("userInfo", user);

    window.location.href = "./dashboard/dashboard.html";

    username.value = null;
    email.value = null;
    password.value = null;
    confirmPassword.value = null;
  } else {
    alert("Form is not valid. Please check your inputs.");
  }
}
