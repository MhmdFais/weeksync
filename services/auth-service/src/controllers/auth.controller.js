const {
  registerUser,
  loginUser,
  AuthError,
} = require("../services/auth.service");
const { verifyToken } = require("../utils/jwt");

async function register(req, res) {
  try {
    const { user, token } = await registerUser(req.body);
    res.status(201).json({ user, token });
  } catch (err) {
    if (err instanceof AuthError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Register error:", err);
    res.status(500).json({ error: "internal server error" });
  }
}

async function login(req, res) {
  try {
    const { user, token } = await loginUser(req.body);
    res.status(200).json({ user, token });
  } catch (err) {
    if (err instanceof AuthError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Login error:", err);
    res.status(500).json({ error: "internal server error" });
  }
}

function me(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "missing token" });
  }
  try {
    const decoded = verifyToken(authHeader.split(" ")[1]);
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ error: "invalid or expired token" });
  }
}

module.exports = { register, login, me };
