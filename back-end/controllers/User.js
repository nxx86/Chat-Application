const User = require("../models/User");
const bcrypt = require("bcrypt");
const transporter = require("../config/nodemailer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
//registre
const registreUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Your Username is Invalid" });
  }
  if (!email) {
    return res.status(400).json({ message: "Your Email is Invalid" });
  }
  if (!password) {
    return res.status(400).json({ message: "Your Password is Invalid" });
  }

  try {
    const result = await User.findOne({ email });
    if (result) {
      return res.status(409).json({ message: "User already exists!" });
    }
    // hashing the password
    const hashPwd = await bcrypt.hash(password, 10);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashCode = await bcrypt.hash(code, 10);
    const html = fs.readFileSync(
      path.join(__dirname, "../views/index.html"),
      "utf8"
    );
    await transporter.sendMail({
      from: `"chat app" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email",
      html: html.replace("{{code}}", code),
    });

    const newUser = new User({
      name,
      email,
      password: hashPwd,
      verficationCodeHash: hashCode,
    });
    await newUser.save();
    return res.status(201).json({
      message:
        "User registered successfully. Please check your email for the verification code.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
//Email verification
const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  if (!code) {
    return res.status(400).json({ message: "Your Code is empty" });
  }
  if (!email) {
    return res.status(400).json({ message: "Your Email is Invalid" });
  }
  try {
    const searchedUser = await User.findOne({ email });
    if (!searchedUser) {
      return res.status(400).json({ message: "User Not Found" });
    }
    if (searchedUser.isVerified)
      return res.status(400).json({ message: "User Already Verified" });
    const result = await bcrypt.compare(code, searchedUser.verficationCodeHash);
    if (result) {
      searchedUser.isVerified = true;
      searchedUser.verficationCodeHash = undefined;
      await searchedUser.save();
      res.status(200).json({ message: "Email is verified" });
    } else {
      res.status(400).json({ message: "Code is Wrong" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Your Email is Invalid" });
  }
  if (!password) {
    return res.status(400).json({ message: "Your Password is Invalid" });
  }
  try {
    const searchedUser = await User.findOne({ email });
    if (!searchedUser) {
      res.status(400).json({ message: "The User Not found" });
    }
    const result = await bcrypt.compare(password, searchedUser.password);
    if (result) {
      if (!searchedUser.isVerified) {
        res.status(400).json({ message: "Please Verify Your Email" });
      }
      const accessToken = jwt.sign(
        { userId: searchedUser._id, email: searchedUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { userId: searchedUser._id, email: searchedUser.email },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );
      searchedUser.refreshToken = refreshToken;
      searchedUser.save();

      res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        })
        .json({
          accessToken,
          user: searchedUser,
          message: "Login Was Successful",
        });
    } else {
      res.status(400).json({ message: " Password Is Wrong" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const result = await User.find({});
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

module.exports = { registreUser, getAllUsers, verifyCode };
