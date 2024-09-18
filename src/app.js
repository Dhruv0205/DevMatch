const express = require("express");

const app = express();

app.use("/job", (req, res) => {
    res.send("Welcome to job page");
  });
  
  app.use("/office", (req, res) => {
    res.send("Welcome to office");
  });

app.use("/", (req, res) => {
  res.send("Welcome to home page");
});


app.listen("0205", () => {
  console.log("server listening on port 0205");
});
