const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");
const { signToken } = require("../utils/jwt");

const SALT_ROUNDS = 10;

class AuthError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

async function registerUser({ name, email, password, role }) {
  const existing = await userRepository.findByEmail(email);
  if (existing) {
    throw new AuthError("an account with this email already exists", 409);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const finalRole = role === "manager" ? "manager" : "member";

  const user = await userRepository.create({
    name,
    email,
    passwordHash,
    role: finalRole,
  });
  const token = signToken(user);

  return { user, token };
}

async function loginUser({ email, password }) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new AuthError("invalid email or password", 401);
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    throw new AuthError("invalid email or password", 401);
  }

  const token = signToken(user);
  delete user.password_hash;

  return { user, token };
}

async function listUsers() {
  return userRepository.findAll();
}

module.exports = { registerUser, loginUser, listUsers, AuthError };
