const adminAuth = (req, res, next) =>{
    console.log("admin authorization is getting checked");
    const token = "xyaz";
    const isAuthorized = token == "xyz";

   if(isAuthorized)
   {
    console.log("admin is authorized");
    next();
   }
   else{
    console.log("omfoo ky yr!!");
    res.status(401).send("admin is unauthorized");
   }
}

module.exports = {adminAuth};