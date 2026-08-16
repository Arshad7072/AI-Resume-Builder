const express = require("express");

const router = express.Router();

const { sendMessage } = require("../controllers/supportController");

router.post("/", sendMessage);

module.exports = router;