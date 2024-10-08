const asyncHandler = require("express-async-handler");
const User = require("../schema/User");
const getAllUsers = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

const signUp = asyncHandler(async (req, res) => {
  const { name, username, email, phone, password } = req.body;
  try {
    const create = await User.create({
      name,
      username,
      email,
      phone,
      password,
    });
    res.status(200).json({
      message: "signUp successful",
      create,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to create user",
      error,
    });
  }
});

const login = asyncHandler(async(req, res)=>{
    const {username,password}=req.body;
    try {
        
    } catch (error) {
        
    }
})
module.exports = {
  getAllUsers,
  signUp,
};
