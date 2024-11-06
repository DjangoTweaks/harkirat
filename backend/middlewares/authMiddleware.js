const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const secret_token = process.env.JWT_SECRET;
async function isAuthorizedCheck(req, res, next) {
  const authorization_header = req.headers.authorization;

  if (!authorization_header) {
    return res.status(403).json({
      error: "Required Headers not present",
    });
  }

  const tokenArray = authorization_header.split(" ");
  if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
    return res.status(403).json({
      error: "Incorrect Header Format",
    });
  }

  try {
    const tokenChecker = jsonwebtoken.verify(tokenArray[1], secret_token);
    // console.log(tokenChecker.userId)
    req.userId = tokenChecker.userId; 
  } catch (error) {
    return res.status(403).json({
      error: "Invalid Token",
    });
  }


  next();
}

module.exports = { isAuthorizedCheck };
