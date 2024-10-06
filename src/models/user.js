const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName:{
        type: "String",
        required:true,
        minLength:3,
        maxLenght:50,
    },
    lastName:{
        type: "String",
        required:true,
        minLength:3,
        maxLenght:50,
    },
    
    email:{
        type: "String",
        unique:true,
        required:true,
        trim: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email " + value);
            }
        },
    },
    password:{
        type: "String",
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password should contain uppercase, lowercase, no and special character");
            }
        }
    },
    age:{
        type: "Number",
        minLength:16,
    },
    gender:{
        type: "String",
    },
    skills:[String],
    photoUrl:{
        type:"String",
        validate(value){
            validator.isURL(value);
        }
    }

}, {
    timestamps:true
})

module.exports = mongoose.model("User", userSchema);