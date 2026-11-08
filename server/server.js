require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const greetingRoutes = require("./routes/greetingRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Diwali Magic 2026 API is running! 🪔",
  });
});

app.use("/api/greetings", greetingRoutes);

// Handle upload and other middleware errors
app.use((error, req, res, next) => {
  console.error(error.message);

  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "Photo must be 5 MB or smaller.",
    });
  }

  if (error.message === "Only image files are allowed.") {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong on the server.",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();