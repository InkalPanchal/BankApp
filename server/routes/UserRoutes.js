const express = require("express");
const UserController = require("../controller/user");
const VerifyToken = require("../Middlewares/VerifyToken");
const router = express.Router();

router.post("/add", UserController.CreateAccount);
router.post("/login", UserController.Login);
router.get("/", UserController.GetUsers);
router.post(
  "/deposit/token-required",
  VerifyToken,
  UserController.DepositFunds
);
router.post(
  "/transfer/token-required",
  VerifyToken,
  UserController.TransferFunds
);
router.get("/user/:id", UserController.GetUserById);

// router.post("/reset-password/:token", UserController);
module.exports = router;
