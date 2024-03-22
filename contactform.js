const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
let submitError = document.getElementById("submit-error");
let names = document.getElementById("contact-name");
const fullName = document.getElementById("contact-name");
const email = document.getElementById("contact-email");
const message = document.getElementById("contact-message");

function validateName() {
  let name = document.getElementById("contact-name").value;

  if (name.length == " ") {
    nameError.innerHTML = "Name is required";
    return false;
  }
  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameError.innerHTML = "Enter full name please";
    return false;
  }
  nameError.style.display = "none";
  names.style.border = "2px solid green";
  return true;
}

function validateEmail() {
  let email = document.getElementById("contact-email").value;

  if (email.length == " ") {
    emailError.innerHTML = "Email is required";
    return false;
  }

  if (!email.match(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/)) {
    emailError.innerHTML = "Email invalid";
    return false;
  }

  emailError.style.display = "none";
  document.getElementById("contact-email").style.border = "2px solid green";
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
  messageError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  return true;
}

document.getElementById("submit-btn").addEventListener("click", (e) => {
  e.preventDefault();
  let store = JSON.parse(localStorage.getItem("comments")) || [];
  let lastMessageId = parseInt(localStorage.getItem("messageId")) || 0;

  lastMessageId++;

  let names = fullName.value;
  let emails = email.value;
  let messages = message.value;

  if (validateName() || validateEmail() || validateMessage()) {
    let comment = {
      names: names,
      email: emails,
      message: messages,
      lastMessageId: lastMessageId,
    };

    store.push(comment);
    localStorage.setItem("comments", JSON.stringify(store));
    localStorage.setItem("messageId", lastMessageId);
    return true;
  } else {
    alert(" it not working, ");
  }
});
