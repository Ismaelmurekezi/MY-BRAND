//FORM VALIDATION

const login = document.getElementById("login");
const username = document.getElementById("username");
const password = document.getElementById("password");
const submitError = document.getElementById("submit-error");

function validateName() {
  const usernameValue = username.value.trim();

  if (usernameValue === "") {
    errorMessage(username, "username is required field");
  }
  if (!usernameValue.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    errorMessage(username, "Write full name");
    return false;
  } else {
    successMessage(username);
  }
}

function validatePassword() {
  const passwordValue = password.value.trim();

  if (passwordValue === "") {
    errorMessage(password, "Password is required field");
  } else if (passwordValue.length < 8) {
    errorMessage(password, "Password cannot less than 8");
  } else {
    successMessage(password);
  }
}

function validateForm() {
  if (!validateName() || !validatePassword()) {
    submitError.style.display = "block";
    submitError.innerHTML = "You are now good to go";

    setTimeout(function () {
      submitError.style.display = "none";
    }, 3000);
    return false;
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
