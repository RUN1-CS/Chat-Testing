WebSocket = new WebSocket("ws://localhost:8080/ws");

WebSocket.onopen = function () {
  document.getElementById("connection").innerText = "Connected";
};

// WIP
// TODO: E2EE integration
// TODO: Rooms
document
  .getElementById("message-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    WebSocket.send(
      JSON.stringify({
        type: "message",
        reciever: document.getElementById("to-field").value,
        content: document.getElementById("message-input").value,
      }),
    );
    document.getElementById("message-input").value = "";
  });

WebSocket.onmessage = function (event) {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case "message":
      const messageList = document.getElementById("message-history");
      const messageItem = document.createElement("li");
      messageItem.textContent = `${data.sender}: ${data.content}`;
      messageList.appendChild(messageItem);
      break;
  }
};
