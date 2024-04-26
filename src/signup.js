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
  }
  // else if (!usernameValue.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
  //   errorMessage(username, "Valid username please");
  //   return false;
  // }
  else {
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

//User registration functionality

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Validate form fields
  const isUsernameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  // If all fields are valid, submit the form
  if (
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid
  ) {
    try {
      const formData = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        confirmPassword: confirmPassword.value.trim(),
      };

      // Send POST request to the backend API endpoint
      const response = await fetch(
        "https://my-brand-backend-ibtm.onrender.com/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("User registered successfully!");

        window.location.href = "./login.html";
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert(errorData.message || "Failed to register user");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while registering user");
    }
  }
});
