const submitButton = document.getElementById("submit");
const errorMessage = document.getElementById("error-message");

let users = [
  { username: "admin", password: "1234" },
  { username: "user1", password: "1234" },
  { username: "user2", password: "1234" },
];

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  clearError();

  let userName = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let user = users.find(function (user) {
    return user.username === userName && user.password === password;
  });

  if (user) {
    console.log("Login Successful");
    window.location.href = "index.html";
    document.getElementById("myForm").reset();
  } else {
    console.log("Login not successful");
    displayerror();
    document.getElementById("myForm").reset();
  }
});

function displayerror() {
  const partyDetailsElement = document.createElement("div");
  partyDetailsElement.classList.add("errorMessage");
  partyDetailsElement.innerHTML = `
      <h2>Incorrect Credentials</h2>
    `;
  errorMessage.appendChild(partyDetailsElement);
}
function displaySuccess() {
  const partyDetailsElement = document.createElement("div");
  partyDetailsElement.classList.add("successMessage");
  partyDetailsElement.innerHTML = `
      <h2>Your PDF has been downloaded!</h2>
    `;
  errorMessage.appendChild(partyDetailsElement);
}
function clearError() {
  errorMessage.textContent = "";
}
