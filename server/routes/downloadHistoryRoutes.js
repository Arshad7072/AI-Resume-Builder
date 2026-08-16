const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addDownloadHistory,
  getDownloadHistory,
} = require("../controllers/downloadHistoryController");

router.post("/", authMiddleware, addDownloadHistory);

router.get("/", authMiddleware, getDownloadHistory);

module.exports = router;