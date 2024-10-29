const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    isVerified: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      street: {
        type: String,
      },
      suite: {
        type: String,
      },
      city: {
        type: String,
      },
      zipcode: {
        type: String,
      },
      geo: {
        lat: {
          type: String,
        },
        lng: {
          type: String,
        },
      },
    },
    phone: {
      type: Number,
      required: true,
    },
    website: {
      type: String,
      default: "https://google.com",
    },
    company: {
      name: {
        type: String,
      },
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 12,
    },
    carts: [],
    // carts:{
    //   type:Array
    // }
    profilepic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("User", UserSchema);
