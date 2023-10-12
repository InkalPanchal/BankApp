const express = require("express");

const forgotPasswordController = require("../controller/forgotpassword");
const router = express.Router();

router.post("/fotgot-passwrod", forgotPasswordController.sendResetLink);

router.post("/reset-password/:token", forgotPasswordController.resetPassword);
module.exports = router;
