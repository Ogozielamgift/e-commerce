const express = require("express");
const { signUp } = require("../controller/User");

const router = express.Router();
// router.get("/", getAllContents);
router.post("/", signUp);
// router.get("/:id", getSingleContent);
// router.put("/:id", updateContent);
// router.delete("/:id", deleteContent);
module.exports = router;