const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/db");

// Load Environment Variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// ======================
// Middlewares
// ======================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Upload Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ======================
// Routes
// ======================

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Resume Builder API Running...",
  });
});

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Resume Routes
app.use("/api/resume", require("./routes/resumeRoutes"));

// Download History Routes
app.use("/api/download-history", require("./routes/downloadHistoryRoutes"));

// Dashboard Routes
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// Upload Routes
app.use("/api/upload", require("./routes/uploadRoutes"));

 

// profile routes
const profileRoutes = require("./routes/profileRoutes");

app.use("/api/profile", profileRoutes);

// setting routes
const settingsRoutes = require("./routes/settingsRoutes");

app.use("/api/settings", settingsRoutes);


// support routes

const supportRoutes = require("./routes/supportRoutes");

app.use("/api/support", supportRoutes);

// Ai routes 
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/ai", aiRoutes);


// admin panel

const adminRoutes = require("./routes/adminRoutes");

app.use("/api/admin", adminRoutes);

// ======================
// 404 Route
// ======================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ======================
// Start Server
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
