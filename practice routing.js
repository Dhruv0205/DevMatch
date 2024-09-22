// const {adminAuth} = require("./middlewares/auth");

/*
app.get("/user", (req,res,next)=>{
    console.log("user authentication getting checked");
    const token = "xyzafs";
    if(token=="xyz")
    {
        console.log("user is authenticated");
        next();
    }
    else{
        res.status(401).send("token mismatch");
    }
} ,(req,res)=>{
  console.log(req.query);  
  res.send({first: "dhruv", position: "Software Engineer"});
})

app.use("/admin", adminAuth);

app.use("/admin/updateData", (req,res)=>{
    res.send("Data update successfully");
})


app.use("/admin/deleteData", (req,res)=>{
    res.send("Data deleted successfully");
})


app.get("/user/:userid/:phone/:address", (req,res)=>{
    console.log(req.params);  
    res.send({UserID:req.params.userid, address:req.params.address, number:req.params.phone});
  })

app.post("/user", (req,res)=>{
    res.send("data saved successfully");
  })
  
//according to this b is optional u can use ac as well abc both can work  
app.use("/ab?c", (req, res) => {
    res.send("Welcome bhai page");
});

// if in a path there is a  anywhere than it will  work it's a regex
app.use(/a/, (req, res) => {
    res.send("Welcome dost page");
  });

//if we try to runn acd it will show error but i we run ad or abcd it will run
app.use("/a(bc)?d", (req, res) => {
    res.send("Welcome yaar page");
  });

//it say we can use as many b as we can but be cannot other letter than b between b and c
app.use("/ab+c", (req, res) => {
    res.send("Welcome dost page");
  });

// it  says u can use different letter between b and c it will work
app.use("/ab*c", (req, res) => {
    res.send("Welcome to home page");
  });
  
// according to this if you  write any thing that ends with fly is will run  
  app.use(/.*fly$/, (req, res) => {
    res.send("hello fly");
  });

*/  
