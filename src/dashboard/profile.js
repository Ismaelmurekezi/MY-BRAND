// Function to fetch user data by ID
const fetchUserById = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/user/getUserById/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch user data:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

// Function to update user data by ID
const updateUserById = async (userId, userData) => {
  try {
    const response = await fetch(
      `https://my-brand-backend-ibtm.onrender.com/api/user/updateUserById/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userData),
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to update user data:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    return null;
  }
};

// Fetch user data and populate form fields
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const userId = "66276f01642261270f6c9477"; // Replace with the actual user ID
    const userData = await fetchUserById(userId);

    if (userData) {
      document.getElementById("username").value = userData.username;
      document.getElementById("email").value = userData.email;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});

// Update user profile
document.getElementById("update-btn").addEventListener("click", async () => {
  try {
    const userId = "66276f01642261270f6c9477"; // Replace with the actual user ID
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      return alert("Password and Confirm Password do not match");
    }

    const userData = { username, email, password }; // Create user data object

    const updatedUserData = await updateUserById(userId, userData);

    if (updatedUserData) {
      alert("User profile updated successfully");
      window.location.href = "/dashboard.html";
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
});
