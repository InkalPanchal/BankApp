const express = require("express");
const TransacionController = require("../controller/transaction");
const VerifyToken = require("../Middlewares/VerifyToken");
const router = express.Router();

router.get(
  "/:id/token-required",
  VerifyToken,
  TransacionController.GetUserTransactions
);

module.exports = router;
