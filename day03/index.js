const express = require('express');

const app = express();
const main = require('./database');
const User = require('./module/userSchemas');
const validateUser = require('./utils/validator');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser') // to parse the cookies from the request
const jwt = require('jsonwebtoken');

app.use(express.json()) // to parse the json data from the request body
app.use(cookieParser()) // to parse the cookies from the request

const spark = new User ({name:"hell and clean"})   // this is just to check if the model is working or not
console.log(spark.name)


app.post('/register',async (req, res) => {

    try{
     
     validateUser(req.body);  //pass req.body to the function
     
     // converting passward to hash
     req.body.passward = await bcrypt.hash(req.body.passward, 10)
 
      await User.create(req.body)
     res.send("user created successfully")
 }
 catch(err){
     res.send("Error "+ err.message)
           }
 })


app.post('/login',async (req, res) => {
    try{
    //    const people = await User.findById(req.body._id)
    const people = await User.findOne({email:req.body.email})
    // console.log(people.email);
    
        if(!people){
            throw new Error("invasslid Crentials")
        }

        // comparing passward
     const passMatch = await bcrypt.compare(req.body.passward ,people.passward)
        if(!passMatch){
             throw new Error("invalid Crentials")
        }
       

        // jwt tocken

        const tocken = jwt.sign({_id: people._id , email: people.email}, "adiv1234" , {expiresIn:100})
        res.cookie("tocken",tocken)

        res.send("login successfully")
    }catch(err){
        res.send("Error "+ err.message)
    }
}
)

app.get("/user" , async (req, res) => {
   try{
    const data = await User.find({})
   
    const payload =jwt.verify(req.cookies.tocken,"adiv1234")
    if(!payload){
        return res.status(401).send({message:"unauthorized"})
    }
    console.log(payload);
    
   
    // console.log(req.cookies);
    res.send({message:"hear is all data",data})
}

     catch(err){
        res.send("Error"+ err.message)
    }

})

app.get('/user/:id', async (req, res) => {
   try{ const data = await User.findById(req.params.id)
    res.send(data)
   }
   catch(err){
    res.send("Error"+ err.message)
   }
})

app.delete('/user/:id', async (req, res) => {
    try{
        const data = await User.findByIdAndDelete(req.params.id)
        res.send({message:"user deleted successfully",data})
    }
    catch(err){
        res.send("Error"+err.message)
    }
}
)

app.patch('/user', async (req, res) => {
 if(!req.body._id){
    return res.status(400).send({message:"please provide id"})
 }
    try{
    const{ _id,...rest} = req.body
 await User.findByIdAndUpdate(_id,rest,{runValidators:true})
   res.send("user updated successfully");
  } 
  catch(err){
    res.send("Error"+err.message)
  }   
})


main()
.then( async () => {
    console.log('connected to database')

    app.listen(3000, () => {
        console.log('server is running on port 3000')
    })    
})
.catch((err) => {
    console.log(err)
})



