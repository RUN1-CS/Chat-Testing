// node-server/src/index.js
import { WebSocketServer } from "ws";
import pool from "./db.js";
import { login, register } from "./auth.js";

async function fetch_user(session) {
  const res = await pool.query(
    "SELECT id, name FROM users WHERE session = $1",
    [session],
  );
  return res.rows[0];
}

const wss = new WebSocketServer({
  port: 3000,
  host: "0.0.0.0",
  path: "/ws",
});

wss.on("connection", (ws, req) => {
  console.log("WS client connected");

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

      default:
        console.warn("Unknown message type:", data.type);
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});

console.log("WS server running on ws://0.0.0.0:3000");
