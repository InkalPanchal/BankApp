const mongoose = require("mongoose");
// const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Username is required."],
      minlength: [3, "Name should be atleast 3 characters long."],
      maxlength: [20, "Name should not exeeds above 20 characters"],
      trim: true,
    },
    Email: {
      type: String,
      required: [true, "Email is required"],
      maxlength: [25, "Email should not exeeds above 20 characters"],
      trim: true,
    },
    MobileNo: {
      type: Number,
      maxlength: [10, "Mobile number should be only 10 digits long"],
      minlength: [10, "Mobile number should be only 10 digits long"],
      required: [true, "Mobile number is required"],
    },
    DOB: {
      type: String,
      required: [true, "Date of birth is required."],
    },
    Password: {
      type: String,
      minlength: [8, "Password should be atleast 8 characters long."],
      miaxLength: [32, "Password should not exeeds above 32 characters"],
      required: [true, "Please enter password"],
    },
    // Balance: {
    //   type: Number,
    // },
  },
  { timestamps: true }
);

// UserSchema.pre('save',(next)=>{
//     Password = bcrypt.

// })
const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
