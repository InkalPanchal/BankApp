const AccountModel = require("../models/Account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const globalConfig = require("../Authentication/global.config");
const Transaction = require("../models/Transaction");
const nodemailer = require("nodemailer");

class UserController {
  static async CreateSavingAccount(req, res) {
    try {
      console.log(req.body);
      const userExists = await UserModel.findOne({ _id: req.body.UserId });
      if (userExists) {
        const newAccount = new AccountModel({
          AccountType: "Saving",
          BankName: "MyBank",
          UserId: req.body.UserId,
          TotalBalance: 0,
        });
      }
    } catch (ex) {
      res.status(500).json({
        msg: "Error while creating new user.",
        error: ex.message,
      });
    }
  }

  static async Login(req, res) {
    try {
      const { Email, Password } = req.body;
      const users = await UserModel.find();
      // console.log(users);
      const userExists = await UserModel.findOne({ Email: Email });
      if (userExists) {
        const userId = userExists._id;
        const isMatch = await bcrypt.compare(
          Password.toString(),
          userExists.Password
        );
        if (isMatch) {
          const token = jwt.sign({ Email, userId }, globalConfig.secretKey, {
            algorithm: globalConfig.algorithm,
            expiresIn: globalConfig.expiredIn,
          });
          res.cookie("token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          console.log("res", res);
          res.status(200).json({
            msg: "User logged in successfully.",
            data: userExists,
            token: token,
          });
        } else {
          res.status(401).json({
            error: "Email/Password is invalid.",
          });
        }
      } else {
        res.status(404).json({
          error: "User is not exist.",
        });
      }
    } catch (ex) {
      res.status(400).json({
        msg: "Error while login the user.",
        error: ex.message,
      });
    }
  }
  static async LogOut(req, res) {
    try {
      req.session = null;
      return res.status(200).json({ msg: "You've been signed out!" });
    } catch (err) {
      this.next(err);
    }
  }
  static async DepositFunds(req, res) {
    try {
      // console.log(token);
      const { userId } = req.body;
      var { amount } = req.body;
      const user = await UserModel.findById(userId);
      if (user) {
        const existedTran = await Transaction.find({
          UserId: userId,
          TransactionType: "Credit",
        });

        var transaction;
        if (existedTran.length === 0 && amount > 100) {
          var reward = amount * 0.1;
          // console.log("amount:>", amount);
          const rewardTran = new Transaction({
            UserId: userId,
            Amount: reward,
            TransactionType: "Reward",
          });
          transaction = new Transaction({
            UserId: userId,
            Amount: amount,
            TransactionType: "Credit",
          });

          await rewardTran.save();
        } else {
          transaction = new Transaction({
            UserId: userId,
            Amount: amount,
            TransactionType: "Credit",
          });
        }

        if (reward) {
          amount = amount + reward;
        }
        user.Balance += amount;
        await user.save();
        await transaction.save();
        return res.status(200).json({
          msg: "Funds deposited successfully",
          data: user,
        });
      }
      res.status(404).json({
        error: "User not found.",
      });
    } catch (ex) {
      res.status(400).json({
        msg: "Error while deposit funds.",
        error: ex.message,
      });
    }
  }

  static async TransferFunds(req, res) {
    try {
      const { receiverId, senderId, amount } = req.body;

      const receiver = await UserModel.findById(receiverId);
      const sender = await UserModel.findById(senderId);

      if (!sender || !receiver) {
        return res.status(404).json({
          error: "Sender or Receiver not found.",
        });
      }

      if (sender.Balance < amount) {
        return res.status(422).json({
          msg: "Insufficient balance.",
        });
      }

      var currentDate = new Date();
      const sendersAllTrans = await Transaction.find({
        UserId: senderId,
      });
      let totalAmount = 0;
      for (let i = 0; i < sendersAllTrans.length; i++) {
        if (
          sendersAllTrans[i].createdAt.toLocaleDateString() ===
            currentDate.toLocaleDateString() &&
          sendersAllTrans[i].TransactionType === "Debit"
        ) {
          totalAmount += sendersAllTrans[i].Amount;
        }
      }
      // console.log(totalAmount);
      if (totalAmount + amount <= 50000) {
        sender.Balance -= amount;
        receiver.Balance += amount;
        const receiverTran = new Transaction({
          UserId: receiverId,
          Amount: amount,
          TransactionType: "Credit",
        });
        const senderTran = new Transaction({
          UserId: senderId,
          Amount: amount,
          TransactionType: "Debit",
        });
        await sender.save();
        await receiver.save();
        await receiverTran.save();
        await senderTran.save();
        // sendEmail();
        res.status(200).json({
          msg: "Fund transfered successfully",
          data: `${sender.Name} has transfered ${amount} funds to ${receiver.Name}`,
        });
      } else {
        res.status(422).json({
          error: "Your daily limit exceeds.",
        });
      }
    } catch (ex) {
      res.status(400).json({
        msg: "Error while transfer funds.",
        error: ex.message,
      });
    }
  }
}

module.exports = UserController;
