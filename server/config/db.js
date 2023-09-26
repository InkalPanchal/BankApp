const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/BankApp")
  .then((success) => console.log("success"))
  .catch((err) => console.log(err));

module.exports = mongoose;
