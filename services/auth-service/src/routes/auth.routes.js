const express = require("express");
const { validateRegister, validateLogin } = require("../middleware/validate");
const { register, login, me } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/me", me);

module.exports = router;
