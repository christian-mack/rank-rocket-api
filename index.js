const express = require("express");
const dotenv = require("dotenv");

// Routes
const generateContentRoute = require("./api/generate-content");
const loginRoute = require("./api/login");
const registerRoute = require("./api/register");

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api", generateContentRoute);
app.use("/api", registerRoute);
app.use("/api", loginRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
