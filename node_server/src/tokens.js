import jwt from "jsonwebtoken";
import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL);

export function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, decoded };
  } catch (err) {
    return { valid: false, error: err };
  }
}

export async function storeSession(jti, ttlSeconds) {
  await redis.setex(`jwt:${jti}`, ttlSeconds, "1");
}

export async function isSessionValid(jti) {
  return await redis.exists(`jwt:${jti}`);
}

export async function revokeSession(jti) {
  await redis.del(`jwt:${jti}`);
}
