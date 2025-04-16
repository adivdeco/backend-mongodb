const express = require('express');

const app = express();
const main = require('./database');
const User = require('./module/userSchemas');
const validateUser = require('./utils/validator');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser') // to parse the cookies from the request
const jwt = require('jsonwebtoken');
const userAuth = require('./middleware/userAuth') // to authenticate the user


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
    const people = await User.findOne({emailid:req.body.emailID})
        if(!people){
            throw new Error("invasslid Crentials")
        }

        // comparing passward
     const passMatch = await bcrypt.compare(req.body.passward ,people.passward)
        if(!passMatch){
             throw new Error("invalid Crentials")
        }
       

        // jwt tocken

        const tocken = jwt.sign({_id: people._id , email: people.email}, "adiv1234" )
        res.cookie("tocken",tocken)  //=> name of the cookie , value of the cookie in the browser in {code form} create using given secret key & payload

        res.send("login successfully")
    }catch(err){
        res.send("Error "+ err.message)
    }
}
)

app.get("/user" ,userAuth, async (req, res) => {
   try{
    // authonticateion

    res.send(req.data)
}

     catch(err){
        res.send("Error"+ err.message)
    }

})

app.get("/alluser" ,async (req, res) => { 
    try{
        const data = await User.find({})
        res.send(data)
    }
    catch(err){
        res.send("Error "+ err.message)
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



