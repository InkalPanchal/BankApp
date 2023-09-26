const express = require("express");
const app = express();
const mongoose = require("./config/db");
const UserRoute = require("./routes/UserRoutes");
const TransactionRoute = require("./routes/TransactionRoute");
const ForgotPasswordRoute = require("./routes/ForgotPasswordRoute");
const cors = require("cors");
const bodyParser = require("body-parser");
// const cookieSession = require("cookie-session");
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
const emailController = require("./controller/sendMail");
dotenv.config();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// emailController.sendEmail();
//routes
app.use("/users", UserRoute);
app.use("/transactions", TransactionRoute);
app.use("/forgotpassword", ForgotPasswordRoute);
app.listen(PORT, (err, res) => {
  if (err) console.log("Error listening server");
  else console.log(`Server is listening on port ${PORT}.`);
});
