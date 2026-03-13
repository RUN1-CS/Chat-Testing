WebSocket = new WebSocket("ws://localhost:3000/ws");

const connection = document.getElementById("connection");

WebSocket.onopen = function () {
  connection.innerText = "Connected";
};

const login = document.getElementById("login_form");
const register = document.getElementById("reg_form");

login.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  WebSocket.send(
    JSON.stringify({
      type: "login",
      username: username,
      password: password,
    }),
  );
});

register.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("reg_username").value;
  const password = document.getElementById("reg_password").value;
  const password_confirm = document.getElementById(
    "reg_confirm_password",
  ).value;

  if (password !== password_confirm) {
    alert("Passwords do not match!");
  }

  WebSocket.send(
    JSON.stringify({
      type: "register",
      username: username,
      password: password,
    }),
  );
});

WebSocket.onmessage = function (event) {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case "login_response":
      if (data.success) {
        alert("Login successful!");
        document.getElementsByClassName("yourself")[0].id = data.user.id;
        document.getElementsByClassName("yourself")[0].innerText =
          data.user.name;
        data.cookie && (document.cookie = data.cookie);
      } else {
        alert(data.message);
      }
      break;
    case "register_response":
      if (data.success) {
        alert("Registration successful!");
        document.getElementsByClassName("yourself")[0].id = data.user.id;
        document.getElementsByClassName("yourself")[0].innerText =
          data.user.name;
      } else {
        alert(data.message);
      }
      break;
  }
};
