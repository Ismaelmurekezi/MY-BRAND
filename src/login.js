//FORM VALIDATION

const login = document.getElementById("login");
const email = document.getElementById("username");
const password = document.getElementById("password");
const submitError = document.getElementById("submit-error");
const form = document.getElementById("forms");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = {
      email: email.value.trim(),
      password: password.value.trim(),
    };

    // Send POST request to the backend API endpoint for user authentication
    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Check if the request was successful
    if (response.ok) {
      const userData = await response.json();
      localStorage.setItem("token", userData.token);
      // Check if the username is "mark" and redirect to the dashboard page
      if (userData.email === "kamali@gmail.com") {
        window.location.href = "./dashboard/dashboard.html";
      } else {
        window.location.href = "./index.html";
      }
    } else {
      const errorData = await response.json();
      console.error("Error data:", errorData);
      alert(errorData.message || "Failed to login");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while logging in");
  }
});

//error sign display

function errorMessage(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;

  formControl.className = "form-control error";
}

// //success sign display

function successMessage(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

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
