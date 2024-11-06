const express = require("express");
const mongoose = require("mongoose");
const User = require("./User");

const AccountsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: {
    type: Number,
    required: true,
  },
});

const Accounts = mongoose.model("Accounts", AccountsSchema);

module.exports = {
  Accounts,
};
