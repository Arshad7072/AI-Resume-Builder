const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

// Load Environment Variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // React Vite
    credentials: true,
}));

// temporary test route to check if the request body is being received correctly

const authMiddleware = require("./middleware/authMiddleware");

// Protected Route
app.get("/profile", authMiddleware, (req, res) => {

    res.status(200).json({
        success: true,
        message: "Welcome to AI Resume Builder",
        user: req.user
    });

});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Resume Builder API Running..."
    });
});

// Auth Routes

app.use("/api/auth", require("./routes/authRoutes"));

// temporary test route to check if the request body is being received correctly

// app.post("/test", (req, res) => {
//     console.log("Content-Type:", req.headers["content-type"]);
//     console.log("Body:", req.body);

//     res.json(req.body);
// });



// 404 Route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});