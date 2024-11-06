const express = require("express");
const z = require("zod");
const app = express();
const { User } = require("../models/User");
const { Accounts } = require("../models/Account");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { isAuthorizedCheck } = require("../middlewares/authMiddleware");

const secret_jwt = process.env.JWT_SECRET;
const saltingRounds = 10;
const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  username: z.string(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const updateCredsSchema = z.object({
  firstName: z.string().optional(),
  username: z.string().optional(),
  password: z.string().min(8).optional(),
});

function getRndBankBalance(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

router.get("/hello", isAuthorizedCheck, (req, res) => {
  res.send("hello");
});

router.post("/signup", async (req, res, next) => {
  const data = signupSchema.safeParse(req.body);

  if (data.success != true) {
    return res.status(411).send({
      msg: "invalid inputs",
    });
  }

  const { email, firstName, username, password } = data.data;

  //check if user present
  const isUserPresent = await User.findOne({ email: email });

  if (isUserPresent !== null) {
    return res.status(411).send({
      msg: "User Already Present",
    });
  }

  try {
    // hash the password
    const salt = await bcrypt.genSalt(saltingRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const userSignup = await User.create({
      email: email,
      firstName: firstName,
      username: username,
      password: hashedPassword,
    }).then(async (user) => {
      const jwt = jsonwebtoken.sign(
        { userId: user._id.toString() },
        secret_jwt
      );

      const bankBalance = getRndBankBalance(1, 1001);
      //     console.log(bankBalance)

      const accountBalanceInit = await Accounts.create({
        userId: user._id,
        balance: bankBalance,
      });

      res.status(200).send({
        msg: "User Created Successfully",
        token: jwt,
        bankBalance: bankBalance,
      });
    });
  } catch (err) {
    res.status(500).send({
      msg: "Internal Error",
    });
  }
});

router.post("/signin", async (req, res) => {
  const validateData = loginSchema.safeParse(req.body);

  if (!validateData.success) {
    res.status(411).json({
      msg: "incorrect inputs",
    });
  }

  const { email, password } = validateData.data;

  const userData = await User.findOne({ email: email });

  if (userData === null) {
    return res.status(411).json({
      error: "Email or password is incorrect or missing",
    });
  }

  const isPasswordValid = bcrypt.compare(password, userData.password);

  if (isPasswordValid === false) {
    return res.status(401).json({
      error: "Password is Incorrect",
    });
  }

  const jwt = jsonwebtoken.sign(
    { userId: userData._id.toString() },
    secret_jwt
  );

  res.status(200).json({
    token: jwt,
  });
});

router.put("/updateCreds", isAuthorizedCheck, async (req, res) => {
  // firstName, username, password

  const validatedData = updateCredsSchema.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      error: "Invalid Inputs, Please Check your inputs and try again.",
    });
  }

  const { firstName, username, password } = validatedData.data;
  const userId = req.userId;

  if (validatedData.data.password) {
    const saltingRounds = 10;
    const salt = await bcrypt.genSalt(saltingRounds);
    const hashedPassword = await bcrypt.hash(validatedData.data.password, salt);
    validatedData.data.password = hashedPassword;
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      validatedData.data
    );
    res.status(200).json({
      msg: "Successfully Changed Parameters",
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      error: "Error while updating information",
    });
  }
});

router.get("/bulk", isAuthorizedCheck, async (req, res) => {
  const filter = req.query.filter;

  if (!filter) {
    return res.status(400).json({
      error: "Bad Request",
    });
  }

  const filteredUsers = await User.find(
    {
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { username: { $regex: filter, $options: "i" } },
      ],
    },
    "firstName username"
  );
  res.json({
    users: filteredUsers,
  });
});

module.exports = router;
