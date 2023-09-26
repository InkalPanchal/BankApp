const { default: jwtDecode } = require("jwt-decode");
const Transaction = require("../models/Transaction");

class TransactionController {
  static async GetUserTransactions(req, res) {
    try {
      //   const token = jwtDecode(req.headers["authentication"]);
      //   if (token.userId === req.params.id) {
      const userTransactions = await Transaction.find({
        UserId: req.params.id,
      })
        .populate("account")
        .sort({ createdAt: -1 });

      if (userTransactions.length > 0) {
        res.status(200).json({
          msg: "Transaction history found.",
          data: userTransactions,
        });
      } else {
        res.status(404).json({
          error: "Transaction history not found.",
        });
      }
      //   } else {
      //     res.status(403).json({
      //       msg: "Forbidden A ccess",
      //     });
      //   }
    } catch (ex) {
      res.status(400).json({
        msg: "Error while fetching transaction history",
        error: ex,
      });
    }
  }
}

module.exports = TransactionController;
