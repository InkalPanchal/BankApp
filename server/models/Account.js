const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    AccountNo: {
      type: Number,
      required: true,
    },
    AccountType: {
      type: String,
      required: true,
      enum: ["Saving", "Current"],
    },
    BankName: {
      type: String,
      required: true,
    },
    IFSC: {
      type: String,
      required: true,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    TotalBalance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const AccountModel = mongoose.model("account", AccountSchema);

module.exports = AccountModel;
