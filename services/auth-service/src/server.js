require("dotenv").config({ path: "../../.env" });
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.AUTH_SERVICE_PORT || 4001;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "auth-service",
    timestamp: new Date().toISOString(),
  });
});

app.use("/", authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`auth-service listening on port ${PORT}`);
});
