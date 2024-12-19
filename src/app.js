const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:205",
    credentials: true,
  })
);
app.use(express.json()); //middleware given by express to convert into javascript object
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("database connected");
    app.listen("0205", () => {
      console.log("server listening on port 0205");
    });
  })
  .catch(() => {
    console.log("database not connected");
  });
