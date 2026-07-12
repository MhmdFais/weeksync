const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.AUTH_DB_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle Postgres client", err);
  process.exit(1);
});

module.exports = pool;
