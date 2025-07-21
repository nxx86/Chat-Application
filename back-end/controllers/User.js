const User = require("../models/User");

const createNewUser = async (req, res) => {
  const { name } = req.body;

  console.log("hello");
  console.log("name:", name);

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const result = await User.findOne({ name });
    if (result) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const newUser = await User.create({ name });
    console.log(newUser);
    return res.status(201).json({
      message: "User created successfully.",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
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

module.exports = { createNewUser, getAllUsers };
