WebSocket = new WebSocket("ws://localhost:3000/ws");

const connection = document.getElementById("connection");

export async function fetch_user() {
  if (!WebSocket || WebSocket.readyState !== WebSocket.OPEN) {
    console.warn("WebSocket is not open. Cannot fetch user data.");
    return undefined;
  }
  const cookie = await cookieStore.get("session");
  if (cookie) {
    WebSocket.send(
      JSON.stringify({
        type: "fetch_user",
        session: cookie.value,
      }),
    );
  } else {
    return undefined;
  }
  const user_cookie = await cookieStore.get("username");
  return user_cookie ? user_cookie.value : undefined;
}

await fetch_user();
cookieStore.set({
  name: "username",
  value: "guest" + Math.floor(Math.random() * 1000),
});

function create_session() {
  //placeholder for session creation logic, to be implemented in the future
  cookieStore.set({
    name: "session",
    value: "session" + Math.random().toString(36).substring(2),
  });
  WebSocket.send(
    JSON.stringify({
      type: "create_session",
      session: cookieStore.get("session").value,
    }),
  );
}

WebSocket.onopen = function () {
  create_session();
  connection.innerText = "Connected";
};

WebSocket.onmessage = async function (event) {
  const data = JSON.parse(event.data);
  console.log("Message received:", data);
  const messageList = document.getElementById("chat-history");
  switch (data.type) {
    case "user_data":
      document.getElementsByClassName("yourself")[0].id = data.user.id;
      document.getElementsByClassName("yourself")[0].innerText = data.user.name;
      cookieStore.set({
        name: "username",
        value: data.user.name,
      });
      break;
    case "message":
      const user = cookieStore.get("username")
        ? cookieStore.get("username").value
        : "guest";
      if (data.reciever !== "global" && data.reciever !== user) break;
      const messageItem = document.createElement("li");
      messageItem.textContent = `${data.sender}: ${data.content}`;
      messageList.appendChild(messageItem);
      break;
    case "loadmsgs":
      //WIP
      break;
  }
};

WebSocket.onclose = function () {
  connection.innerText = "Disconnected";
  console.log("Retrying connection in 5 seconds...");
  setTimeout(() => {
    location.reload();
  }, 5000);
};

document.addEventListener("DOMContentLoaded", function () {
  fetch_user();
});
