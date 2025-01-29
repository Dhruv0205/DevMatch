const JWT = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req, res, next) =>{
       try{
         const cookies = req.cookies;
         const{Token} = cookies;
       
        if(!Token){
            return res.status(401).send("please Login");
        }

        const decodedData = await JWT.verify(Token, process.env.JWT_SECRET);
        
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