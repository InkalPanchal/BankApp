const mongoose = require("mongoose");

const TransactionHistorySchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      ref: "user",
    },
    Amount: {
      type: Number,
      trim: true,
    },
    TransactionType: {
      type: String,
      enum: ["Debit", "Credit", "Reward"],
    },
    AccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: true,
    },
  },
  { timestamps: true }
);

const TransactionHistoryModel = mongoose.model(
  "transactionhistory",
  TransactionHistorySchema
);
module.exports = TransactionHistoryModel;
