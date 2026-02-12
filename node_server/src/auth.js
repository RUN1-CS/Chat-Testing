import pool from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { storeSession } from "./tokens.js";

async function fetch_user(username) {
  const res = await pool.query(
    "SELECT id, password_hash FROM users WHERE username = $1",
    [username],
  );
  return res.rows[0];
}

async function insert_user(username, password_hash) {
  const res = await pool.query(
    "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, name",
    [username, password_hash],
  );
  return res.rows[0];
}

async function issueJWT(user) {
  const jti = crypto.randomBytes(16).toString("hex");

  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username,
      jti,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  await storeSession(jti, 3600);

  return { token, jti };
}

export async function login(username, password) {
  const user = await fetch_user(username);
  if (!user) {
    return { success: false, message: "User not found" };
  }

  const is_valid = await bcrypt.compare(password, user.password_hash);
  if (!is_valid) {
    return { success: false, message: "Invalid password" };
  }

  const jwt_data = await issueJWT(user);

  return { success: true, user, token: jwt_data.token, jti: jwt_data.jti };
}

export async function register(username, password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await insert_user(username, hash);
    const login_data = await login(username, password);
    if (!login_data.success) {
      return {
        success: false,
        message:
          "Registration succeeded but login failed: " + login_data.message,
      };
    }
    return {
      success: true,
      user,
      token: login_data.token,
      jti: login_data.jti,
    };
  } catch (err) {
    return { success: false, message: "Registration failed: " + err.message };
  }
}
