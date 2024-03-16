const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
let submitError = document.getElementById("submit-error");

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

document.getElementById("submit-btn").addEventListener("click", (e) => {
  e.preventDefault();

  document.getElementById("popup").style.visibility = "visible";
  setTimeout(() => {
    document.getElementById("popup").style.visibility = "hidden";
  }, 3000);
});
