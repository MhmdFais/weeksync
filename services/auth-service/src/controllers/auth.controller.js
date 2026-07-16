const { registerUser, loginUser } = require("../services/auth.service");
const { verifyToken } = require("../utils/jwt");

async function register(req, res, next) {
  try {
    const { user, token } = await registerUser(req.body);
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { user, token } = await loginUser(req.body);
    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
}

function me(req, res, next) {
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
