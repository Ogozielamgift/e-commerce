const asyncHandler = require("express-async-handler");
const User = require("../schema/User");
const bcrypt = require("bcrypt");
const getAllUsers = asyncHandler(async (req, res) => {
  const getAllUsers = await User.find().sort({ createdAt: -1 });
  res.status(200).json(getAllUsers);
});

const signUp = asyncHandler(async (req, res) => {
  const { name, username, email, phone, password } = req.body;
  try {
    const userExist = await User.findOne({
      username,
      email,
    });
    if (userExist) {
      res.status(508).json({
        message: "User already Exist",
      });
    }
    const create = await User.create({
      name,
      username,
      email,
      phone,
      password,
    });
    res.status(200).json({
      message: "signUp successful",
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to create user",
      error,
    });
  }
});
const getSingleUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  try {
    const gozie = await User.findOne({ username });
    if (!gozie) {
      res.status(608).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "Successful",
      gozie,
    });
  } catch (error) {
    res.status(404).json({
      message: "Ishi okpushirigi?",
      error,
    });
  }
});
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params; //where to pass your parameters and request.body
  // const {isAdmin}=req.body
  const { name, username, email, phone } = req.body;
  try {
    const updateData = await User.findByIdAndUpdate(id);
    if (!updateData) {
      res.status(708).json({
        message: "Content not found",
      });
    }
    updateData.phone = phone || updateData.phone;
    updateData.username = username || updateData.username;
    updateData.name = name || updateData.name;
    updateData.email = email || updateData.email;
    await updateData.save();
    res.status(200).json({
      message: "Update successful",
      updateData,
    });
  } catch (error) {
    res.status(404).json({
      message: "unable to update",
      error,
    });
  }
});
const resetpassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const updateData = await User.findByIdAndUpdate(id);
    if (!updateData) {
      res.status(708).json({
        message: "Content not found",
      });
    }
    updateData.password = password || updateData.password;
    await updateData.save();
    res.status(200).json({
      message: "Update successful",
      updateData,
    });
  } catch (error) {
    res.status(404).json({
      message: "unable to update",
      error,
    });
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params; //to pass id as parameter
  try {
    const deleteRequest = await User.findByIdAndDelete(id);
    if (!deleteRequest) {
      res.status(901).json({
        message: "content not found",
      });
    }
    res.status(300).json({
      message: "Delete successful",
    });
  } catch (error) {
    res.status(404).json({
      message: "unable to delete",
      error,
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    const loginUser = await User.findOne({
      username,
    });
    if (!loginUser) {
      res.status(700).json({
        message: "No username found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, loginUser.password);
    if (!passwordMatch) {
      res.status(800).json({
        message: "wrong password",
      });
    }
    res.status(200).json({
      message: "login successful",
    });
  } catch (error) {
    res.status(404).json({
      message: "unable to login",
    });
  }
});
module.exports = {
  getAllUsers,
  signUp,
  login,
  getSingleUser,
  updateUser,
  deleteUser,
  resetpassword,
};
