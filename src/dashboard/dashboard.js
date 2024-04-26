//FUNCTION TO DISPLAY MESSAGE IN THE TABLE

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/api/messages/getAllMessages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let containers = document.querySelector(".blog-container");
      let table = document.querySelector(".feedbackTable");
      let messages = data.length;
      // console.log(messages);
      document.getElementById("allmessages").innerHTML = messages;
      document.getElementById("allmessage").innerHTML = messages;
      data.forEach((item) => {
        let container = document.createElement("tr");
        container.classList.add("data-row");
        container.innerHTML = `
                         
                      <td>${item.username}</td>
                      <td>${item.email}</td>
                      <td class="descript"><p id="row">${item.message}</p></td>
                      <td>
                          <div class="action-column">
                          <span style="color: #36C0C9; font-weight: 600;cursor:pointer" onclick="showMessage('${item._id}')">View</span>
                          <span style="color: #fe0000;font-weight:600; cursor:pointer" id="delete-feeback" onclick="deleteMessageById('${item._id}')" >Delete</span>
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

//FUNCTION TO MESSAGE BASED ON IT ID

const deleteMessageById = async (id) => {
  try {
    // Sending a Delate request to backend API
    const response = await fetch(
      `http://localhost:5000/api/messages/deleteMessage/${id}`,
      {
        method: "DELETE",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      alert(responseData.message);
      location.reload();
    } else {
      console.error(
        `Failed to delete blog with ID ${id}:`,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
};

//Function to display single message from table

const showMessage = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/messages/getMessageById/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      alert("Failed to view the message");
    }

    const Messages = await response.json();

    //Displaying message

    document.getElementById("message-box").style.visibility = "visible";

    document.getElementById("visitorName").innerHTML = Messages.username;
    document.getElementById("visitorEmail").innerHTML = Messages.email;
    document.getElementById("visitorMessage").innerHTML = Messages.message;
  } catch (error) {
    console.error("Not able to display message:", error);
  }
};
//Dismiss the message being displayed from message table

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

//LOGGING USER OUT

const logoutButton = document.getElementById("logoutBtns");

logoutButton.addEventListener("click", async function () {
  try {
    const response = await fetch("http://localhost:5000/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
