WebSocket = new WebSocket("ws://localhost:3000/ws");

const connection = document.getElementById("connection");

WebSocket.onopen = function () {
  connection.innerText = "Connected";
};

const login = document.getElementById("login-form");
const register = document.getElementById("reg-form");

login.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

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
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;
  const password_confirm = document.getElementById(
    "reg-password-confirm",
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
    case login_response:
      if (data.success) {
        alert("Login successful!");
        document.getElementsByClassName("yourself")[0].id = data.user.id;
        document.getElementsByClassName("yourself")[0].innerText =
          data.user.name;
        data.cookie && (document.cookie = data.cookie);
      } else {
        alert("Login failed: " + data.message);
      }
      break;
    case register_response:
      if (data.success) {
        alert("Registration successful!");
        document.getElementsByClassName("yourself")[0].id = data.user.id;
        document.getElementsByClassName("yourself")[0].innerText =
          data.user.name;
      } else {
        alert("Registration failed: " + data.message);
      }
      break;
  }
};
