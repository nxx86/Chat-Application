const express = require("express");
const router = express.Router();
const { createNewUser, getAllUsers } = require("../controllers/User");

router.post("/", createNewUser).get("/", getAllUsers);

module.exports = router;
