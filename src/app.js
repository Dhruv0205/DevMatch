const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173/",  // Allow the frontend on this origin
  credentials: true,                // Allow cookies/credentials to be sent
}));

app.use(express.json());  // Middleware to parse JSON request bodies
app.use(cookieParser());  // Middleware to parse cookies

// Routers
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

// Route Middleware
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Connect to the database and start the server
connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen("0205", () => {  // Corrected to listen on port 205
      console.log("Server listening on port 205");
    });
  })
  .catch(() => {
    console.log("Database not connected");
  });
