"use Strict";

const { mongoose } = require("../configs/dbConnection");

// {
//     "userId": "949813294910fdsa90d"
//     "token": "...tokenKey..."
// }

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personnel",
      required: true,
      index: true,
      unique: true,
    },
    token: {
      type: String,
      trim: true,
      required: true,
      index: true,
      unique: true,
    },
  },
  { collection: "token", timestamps: true }
);

module.exports = mongoose.model("Token ", TokenSchema);
