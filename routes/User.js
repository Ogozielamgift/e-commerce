const express = require("express");
const {
  signUp,
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
} = require("../controller/User");

const router = express.Router();
router.get("/", getAllUsers);
router.post("/", signUp);
router.get("/:username", getSingleUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", login);
module.exports = router;
