const mongoose = require("mongoose");

const connectDB = async() =>{
await mongoose.connect("mongodb+srv://dhruvsharma0205:sRiO5zgpfMC9LNbA@project-1.tnbpw.mongodb.net/Devmate");
}

module.exports = connectDB;