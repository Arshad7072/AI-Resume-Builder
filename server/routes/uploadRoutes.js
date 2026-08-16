const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

const {
  uploadPhoto,
} = require("../controllers/uploadController");

router.post(
  "/photo",
  authMiddleware,
  upload.single("photo"),
  uploadPhoto
);

module.exports = router;