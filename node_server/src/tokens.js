const jwt = require("jsonwebtoken");
const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL);

function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, decoded };
  } catch (err) {
    return { valid: false, error: err };
  }
}

async function storeSession(jti, ttlSeconds) {
  await redis.setex(`jwt:${jti}`, ttlSeconds, "1");
}

async function isSessionValid(jti) {
  return await redis.exists(`jwt:${jti}`);
}

async function revokeSession(jti) {
  await redis.del(`jwt:${jti}`);
}

module.exports = { verifyJWT, storeSession, isSessionValid, revokeSession };
