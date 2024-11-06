const express = require("express");
const app = express();
const {
  isAuthorizedCheck,
} = require("../../backend/middlewares/authMiddleware");
const { Accounts } = require("../models/Account");
const { User } = require("../models/User");
const { default: mongoose } = require("mongoose");
const accountRouter = express.Router();

accountRouter.get("/balance", isAuthorizedCheck, async (req, res) => {
  const userId = req.userId;

  try {
    const balance = await Accounts.findOne({ userId: userId });
    res.status(200).json({
      userId: userId,
      balance: balance.balance,
    });
  } catch (error) {
    res.status(400).json({
      error: "internal error",
    });
  }
});

accountRouter.post("/transfer", isAuthorizedCheck, async (req, res) => {
  // { to:string, amount:number }

  // person sending money - userid => name + bank account balance (subtract from this bank account balance)
  // person receiving money - name + bank account balance (add to this bank account balance)

  const userId = req.userId;
  const sendTo = req.body.to;
  const amntToBeSent = req.body.amount;

  const fetchReceiverName = await User.findOne({ username: sendTo });
  console.log(fetchReceiverName);
  if (!fetchReceiverName) {
    return res.status(400).json({
      error: "Invalid Username",
    });
  }

  const sender = await Accounts.findOne({ userId: userId });

  const senderBankBalance = sender.balance;

  const remainingAmount = senderBankBalance - amntToBeSent;

  if (remainingAmount < 0) {
    return res.status(400).json({
      error: "Insufficient Balance",
    });
  }

  // transfer logic, deduct from sender, add to receiver

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deductionFromSender = await Accounts.updateOne(
      { userId: userId },
      { balance: remainingAmount }
    );

    const receiverUserId = fetchReceiverName._id;
    const RemittanceToReceiver = await Accounts.updateOne(
      { userId: receiverUserId },
      { $inc: { balance: amntToBeSent } }
    );
    session.commitTransaction();
  } catch (error) {
    session.abortTransaction();
    res.status(400).json({
      error: "Error With Transaction",
    });
  } finally {
    session.endSession();
    res.status(200).json({
      msg: "Successfully Transferred.",
    });
  }
});

module.exports = accountRouter;
