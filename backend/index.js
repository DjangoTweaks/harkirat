require("dotenv").config(); 
const express = require("express");
const { mongoDBconnection } = require("./db");
const app = express();
const rootRouter = require("./routes/API/v1")
const userRouter = require("./routes/User")
const accountRouter = require("./routes/Account");
const cors = require("cors");
const z = require("zod");
const port = process.env.PORT; 



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/v1", rootRouter); 
app.use("/api/v1/user", userRouter); 
app.use("/api/v1/account", accountRouter);

mongoDBconnection(
  "mongodb+srv://akshat123:Akshat12345@cluster0.9frcojs.mongodb.net/paytm"
);



app.listen(port, ()=>{
  console.log("Listening to port", port);
});
