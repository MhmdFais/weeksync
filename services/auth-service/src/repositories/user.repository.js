const pool = require("../db");

async function findByEmail(email) {
  const result = await pool.query(
    "SELECT id, name, email, password_hash, role FROM auth.users WHERE email = $1",
    [email],
  );
  return result.rows[0] || null;
}

async function create({ name, email, passwordHash, role }) {
  const result = await pool.query(
    `INSERT INTO auth.users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at`,
    [name, email, passwordHash, role],
  );
  return result.rows[0];
}

module.exports = { findByEmail, create };
