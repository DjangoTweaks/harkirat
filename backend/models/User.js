const express = require("express");
const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    email: String, 
    firstName: String, 
    username: String, 
    password: String
})

const User = mongoose.model("User", UserSchema);

module.exports = {
    User
}


