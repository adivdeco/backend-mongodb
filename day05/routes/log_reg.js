const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../module/userSchemas')
const validateUser = require('../utils/validator')

 
const authrouter = express.Router()


authrouter.post('/register',async (req, res) => {

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


authrouter.post('/login',async (req, res) => {
    try{
    //    const people = await User.findById(req.body._id)
    const people = await User.findOne({email:req.body.email})
        if(!people){
            throw new Error("invasslid Crentials")
        }

        // comparing passward

      // const passMatch = await bcrypt.compare(req.body.passward ,people.passward)

     const passMatch = await people.verifyPassward(req.body.passward) // # userauth m verifyPassward fun, hai or wha p .y function people ki passward ko comp krta hai   
    if(!passMatch){
                  throw new Error("invalid pass")
         }
         console.log(passMatch);
         
    
    
        

        // jwt tocken

        const tocken = people.getJWT() // # userauth m getJWT function hai or wha p y function people ki id or email ko sign krta hai
        // const tocken = jwt.sign({_id: people._id , email: people.email}, process.env.Secreat_key )
        res.cookie("tocken",tocken,{
            httpOnly: true, // Secure the cookie
            secure: process.env.NODE_ENV === "production", })
            //   //=> name of the cookie , value of the cookie in the browser in {code form} create using given secret key & payload

        res.send("login successfully")

        
    }catch(err){
        res.send("Error "+ err.message)
    }
}
)

authrouter.post('/logout',async (req, res) => {
    try{
        res.cookie("tocken" , null ,{expires: new Date(Date.now()),
            httpOnly: true, // Secure the cookie
        }) 
        res.send("logout successfully")
    }catch(err){
        res.send("Error "+ err.message)
    }
})

module.exports = authrouter
