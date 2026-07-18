const express = require("express");
const { validateRegister, validateLogin } = require("../middleware/validate");
const requireAuth = require("../middleware/requireAuth");
const requireRole = require("../middleware/requireRole");
const {
  register,
  login,
  me,
  listAllUsers,
} = require("../controllers/auth.controller");

const router = express.Router();

// Public
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

// Authenticated
router.get("/me", requireAuth, me);

// Authenticated + manager only
router.get("/users", requireAuth, requireRole("manager"), listAllUsers);

module.exports = router;
