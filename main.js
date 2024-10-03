const express = require("express");
const cors = require("cors");
const color = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./Config/db.js");
// const contentRoutes = require("./routes/Content");
const bodyparser = require("body-parser");
const app = express();
connectDB();
const port = process.env.port;
app.use(cors());
app.use(bodyparser.json());
// app.use("/Contents", contentRoutes);
app.listen(port, () => console.log(`server running on port ${port}`.black));
