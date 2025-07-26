const express = require("express");
const router = express.Router();
const {
  registreUser,
  getAllUsers,
  verifyCode,
} = require("../controllers/User");

router.post("/verify", verifyCode);
router.post("/", registreUser).get("/", getAllUsers);

module.exports = router;
