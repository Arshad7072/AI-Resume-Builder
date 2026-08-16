const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/User");

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  try {

    const admin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (admin) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    console.log("✅ Admin created successfully.");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);

  }
};

createAdmin();