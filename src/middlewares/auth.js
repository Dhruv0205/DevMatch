const JWT = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req, res, next) =>{
       try{
         const cookies = req.cookies;
         const{Token} = cookies;
       
        if(!Token){
            throw new Error("Invalid Token");
        }

        const decodedData = await JWT.verify(Token, "MumbaiTrip@2024");
        
        const{_id} = decodedData;
        const user = await User.findById(_id); 

        if(!user){
            throw new Error("User not found");
        }

        req.user = user;
        next();

       }catch(err){
        res.status(400).send("Error: "+ err.message);
       }
}


module.exports = {userAuth};