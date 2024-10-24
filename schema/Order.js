const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    cartItems: [
      {
        productCart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Cart",
        },
      },
    ],
    totalAmount: {
      type: String,
    },
    delivery: {
      address: {
        type: String,
      },
    },
    payment: {
      currency: {
        type: String,
      },
      paymentStatus:{
        type:String,
        default:"Not paid",
      }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
