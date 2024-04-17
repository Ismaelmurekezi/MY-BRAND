const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
let submitError = document.getElementById("submit-error");
// let names = document.getElementById("contact-name");
const fullName = document.getElementById("contact-name");
const email = document.getElementById("contact-email");
const message = document.getElementById("contact-message");

//validating name

function validateName() {
  let name = document.getElementById("contact-name").value;

  if (name.length == " ") {
    nameError.innerHTML = "Name is required";
    return false;
  }
  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameError.innerHTML = "Full name please";
    return false;
  }
  nameError.style.display = "none";
  fullName.style.border = "2px solid green";
  return true;
}

//validating email

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

//Function to check length of message

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

//Function to send message (post)

document.getElementById("submit-btn").addEventListener("click", async (e) => {
  e.preventDefault();

  const names = fullName.value;
  const emails = email.value;
  const messages = message.value;

  if (validateName() || validateEmail() || validateMessage()) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: names,
          email: emails,
          message: messages,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Thanks your message sent successfull`);
      } else {
        console.log("Failed to submit message");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred while submitting the message");
    }
    document.getElementById("contact-name").value = "";
    document.getElementById("contact-email").value = "";
    document.getElementById("contact-message").value = "";
  }
});
