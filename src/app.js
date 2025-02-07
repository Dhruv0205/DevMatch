const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
require('dotenv').config();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow the frontend on this origin
    credentials: true, // Allow cookies/credentials to be sent
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allow PATCH method
  })
);

app.use(express.json());  // Middleware to parse JSON request bodies
app.use(cookieParser());  // Middleware to parse cookies

// Routers
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const initalizeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

// Route Middleware
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);
const server = http.createServer(app);
initalizeSocket(server);

// Connect to the database and start the server
connectDB()
  .then(() => {
    console.log("Database connected");
    server.listen(process.env.PORT, () => {  // Corrected to listen on port 8000
      console.log("Server listening on port 8000");
    });
  })
  .catch(() => {
    console.log("Database not connected");
  });
