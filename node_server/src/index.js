// node-server/src/index.js

//TODO fix DB Connection
import { WebSocketServer } from "ws";

import pool from "./db.js";
import { login, register } from "./auth.js";

const wss = new WebSocketServer({
  port: 3000,
  host: "0.0.0.0",
  path: "/ws",
});

async function fetch_user(session) {
  const res = await pool.query(
    "SELECT id, name FROM users WHERE session = $1",
    [session],
  );
  return res.rows[0];
}

wss.on("connection", (ws, req) => {
  console.log("New client connected:", req.socket.remoteAddress);

  for (let client of wss.clients) {
    client.send(
      JSON.stringify({
        type: "message",
        sender: "System",
        reciever: "global",
        content: `New client connected: ${/*fetch_user(req.headers.cookie) ||*/ "guest"}`,
      }),
    );
  }

  ws.on("message", async (msg) => {
    let data;
    try {
      data = JSON.parse(msg);
    } catch (e) {
      console.error("Invalid JSON:", msg.toString());
      return;
    }

    switch (data.type) {
      case "fetch_user":
        ws.send(
          JSON.stringify({
            type: "user_data",
            user: await fetch_user(data.session),
          }),
        );
        break;

      case "ping":
        ws.send(JSON.stringify({ type: "pong" }));
        break;

      case "login":
        const login_data = await login(data.username, data.password);
        if (login_data.jti) {
          ws.send(
            JSON.stringify({
              type: "login_response",
              ...login_data,
              cookie: `jti=${login_data.jti}; Path=/; HttpOnly; SameSite=Strict`,
            }),
          );
        } else {
          ws.send(
            JSON.stringify({
              type: "login_response",
              ...login_data,
            }),
          );
        }
        break;

      case "register":
        const register_data = await register(data.username, data.password);
        ws.send(
          JSON.stringify({
            type: "register_response",
            ...register_data,
          }),
        );
        break;

      case "message":
        // This is not optimal way, this will be change with better db integration, but for now it works
        const msg_data = JSON.parse(msg);
        const msg_body = JSON.stringify({
          type: "message",
          sender: msg_data.sender,
          reciever: msg_data.reciever,
          content: msg_data.content,
        });
        for (const client of wss.clients) {
          client.send(msg_body);
        }
        /*pool.query(
          "INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)",
          [msg_data.sender_id, msg_data.receiver_id, msg_data.content],
        );*/
        break;

      case "create_session":
        // Placeholder for session creation logic, to be implemented in the future
        // For now, we just acknowledge the session creation
        break;

      default:
        console.warn("Unknown message type:", data.type);
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});

console.log("WS server running on ws://0.0.0.0:3000");
