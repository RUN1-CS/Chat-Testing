WebSocket = new WebSocket("ws://localhost:3000/ws");

const connection = document.getElementById("connection");

WebSocket.onopen = function () {
  connection.innerText = "Connected";
};

WebSocket.onmessage = function (event) {
  const data = JSON.parse(event.data);
  console.log("Message received:", data);
  switch (data.type) {
    case "user_data":
      document.getElementsByClassName("yourself")[0].id = data.user.id;
      document.getElementsByClassName("yourself")[0].innerText = data.user.name;
      break;
  }
};

function fetch_user() {
  cookieStore.get("session").then((cookie) => {
    if (cookie) {
      WebSocket.send(
        JSON.stringify({
          type: "fetch_user",
          session: cookie.value,
        }),
      );
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch_user();
});
