//FORM VALIDATION

const login = document.getElementById("login");
const email = document.getElementById("username");
const password = document.getElementById("password");
const submitError = document.getElementById("submit-error");
const form = document.getElementById("forms");

//Login function

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = {
      email: email.value.trim(),
      password: password.value.trim(),
    };

    // Send request for user authentication
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
      localStorage.setItem("loggedUser", JSON.stringify(userData));
      setTokenExpiration(1);
      alert("Log in successfully");

      // Check if the username is "mark" and redirect to the dashboard page
      if (userData.email === "ismael@gmail.com") {
        window.location.href = "./dashboard/dashboard.html";
      } else {
        window.location.href = "/index.html";
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

function setTokenExpiration(expirationMinutes) {
  const expirationTime =
    new Date().getTime() + expirationMinutes * 60 * 60 * 1000;

  localStorage.setItem("tokenExpiration", expirationTime);
}

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
