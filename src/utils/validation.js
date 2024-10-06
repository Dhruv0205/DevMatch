const validator = require("validator");

const validateSignUpData = (req) =>{
 const{firstName, lastName, password, email} = req.body;

 if(!firstName || !lastName ){
    throw new Error("Name not valid");
 }
  else if(!validator.isEmail(email))
  {
    throw new Error("Email not valid");
  }

  else if(!validator.isStrongPassword(password))
  {
    throw new Error("Password is not strong");
  }
};

module.exports = {validateSignUpData,};