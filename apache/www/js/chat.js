import { fetch_user } from "./index.js";
// WIP
// TODO: E2EE integration
// TODO: Rooms
document
  .getElementById("message-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const user = await fetch_user();
    WebSocket.send(
      JSON.stringify({
        type: "message",
        sender: user !== undefined ? user : "guest",
        reciever: document.getElementById("to-field").value,
        content: document.getElementById("message-input").value,
      }),
    );
    document.getElementById("message-input").value = "";
  });
