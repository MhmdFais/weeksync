const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const { signToken, verifyToken } = require("../utils/jwt");
const { validateRegister, validateLogin } = require("../middleware/validate");

const router = express.Router();
const SALT_ROUNDS = 10;

// POST /register
router.post("/register", validateRegister, async (req, res) => {
  const { name, email, password, role } = req.body;
  const finalRole = role === "manager" ? "manager" : "member";

  try {
    const existing = await pool.query(
      "SELECT id FROM auth.users WHERE email = $1",
      [email],
    );
    if (existing.rows.length > 0) {
      return res
        .status(409)
        .json({ error: "an account with this email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await pool.query(
      `INSERT INTO auth.users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [name, email, passwordHash, finalRole],
    );

    const user = result.rows[0];
    const token = signToken(user);

    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "internal server error" });
  }
});

// POST /login
router.post("/login", validateLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT id, name, email, password_hash, role FROM auth.users WHERE email = $1",
      [email],
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: "invalid email or password" });
    }

    const token = signToken(user);
    delete user.password_hash;

    res.status(200).json({ user, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "internal server error" });
  }
});

// GET /me — quick sanity check
router.get("/me", async (req, res) => {
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
});

module.exports = router;
