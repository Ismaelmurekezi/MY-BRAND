//FUNCTION TO DISPLAY MESSAGE IN THE TABLE

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://my-brand-backend-ibtm.onrender.com/api/user/getAllUsers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let containers = document.querySelector(".blog-container");
      let table = document.querySelector(".feedbackTable");
      let allUsers = data.length;
      document.getElementById("allUsers").innerHTML = allUsers;
      document.getElementById("allUser").innerHTML = allUsers;
      data.forEach((item) => {
        let container = document.createElement("tr");
        container.classList.add("data-row");
        // console.log(data);
        container.innerHTML = `
                         
                      <td style="width:300px";>${item.username}</td>
                      <td style="width:300px";>${item.email}</td>
                      <td style="width:400px";>
                          <div class="action-column">
                          <span style="color: #36C0C9; font-weight: 600;cursor:pointer" onclick="showUser('${item._id}')">View</span>
                          <span style="color: #fe0000;font-weight:600; cursor:pointer" id="delete-feeback" onclick="deleteUserById('${item._id}')" >Delete</span>
                          </div>
                      </td>

              `;

        table.appendChild(container);
      });
    })
    .catch((error) => {
      console.error("Error fetching blog content:", error);
    });
});

const deleteUserById = async (id) => {
  try {
    // Sending a Delate request to backend API
    const response = await fetch(
      `https://my-brand-backend-ibtm.onrender.com/api/user/deleteUser/${id}`,
      {
        method: "DELETE",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );

    if (response.ok) {
      alert(`Do you want to delete this user`);
      location.reload();
    } else {
      console.error(
        `Failed to delete user with ID ${id}:`,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

//Displaying single user

const showUser = async (id) => {
  try {
    const response = await fetch(
      `https://my-brand-backend-ibtm.onrender.com/api/user/getUserById/${id}`,
      {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }
    );

    if (!response.ok) {
      alert("Failed to like/unlike blog");
    }

    const Messages = await response.json();

    //Displaying message

    document.getElementById("message-box").style.visibility = "visible";

    document.getElementById("visitorName").innerHTML = Messages.username;
    document.getElementById("visitorEmail").innerHTML = Messages.email;
    // document.getElementById("visitorMessage").innerHTML = Messages.message;
  } catch (error) {
    console.error("User not:", error);
  }
};

//Button to dismiss the user displayed
document.getElementById("dismiss-btn").addEventListener("click", () => {
  document.getElementById("message-box").style.visibility = "hidden";
  // location.reload();
});

//checking if token is expired and alert user

function checkTokenExpiration() {
  const token = localStorage.getItem("token");
  const loggedUserString = localStorage.getItem("loggedUser");
  const loggedUser = loggedUserString ? JSON.parse(loggedUserString) : null;

  if (token && loggedUser) {
    const expirationTime = localStorage.getItem("tokenExpiration");
    const currentTime = new Date().getTime();
    // console.log(loggedUser.message);

    //Showing off the admin name
    let userEmail = loggedUser.email;
    const username = userEmail.slice(0, userEmail.indexOf("@"));
    document.getElementById("admin").innerHTML = username;

    if (expirationTime && currentTime > parseInt(expirationTime)) {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedUser");
      localStorage.removeItem("tokenExpiration");

      alert("Your session has expired. Please log in again.");
    }
  }
}

window.addEventListener("load", checkTokenExpiration);

const logoutButton = document.getElementById("loggingout");

logoutButton.addEventListener("click", async function () {
  try {
    const response = await fetch(
      "https://my-brand-backend-ibtm.onrender.com/api/user/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      alert("logged out successful");
      localStorage.removeItem("token");
      localStorage.removeItem("loggedUser");
      localStorage.removeItem("tokenExpiration");
      window.location.href = "/index.html";
    } else {
      console.error("Logout failed:", await response.text());
    }
  } catch (error) {
    console.error("An error occurred during logout:", error);
  }
});
