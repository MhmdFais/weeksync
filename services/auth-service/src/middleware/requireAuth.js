const { verifyToken } = require("../utils/jwt");

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "missing token" });
  }

  try {
    req.user = verifyToken(authHeader.split(" ")[1]);
    next();
  } catch {
    res.status(401).json({ error: "invalid or expired token" });
  }
}

module.exports = requireAuth;
