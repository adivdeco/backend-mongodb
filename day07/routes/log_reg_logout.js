const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../module/userSchemas')
const validateUser = require('../utils/validator')
const redisClient = require('../config/redis')
const jwt = require('jsonwebtoken');
const userAuth = require('../middleware/userAuth')

 
const authrouter = express.Router()


authrouter.post('/register',async (req, res) => {

    try{
     
     validateUser(req.body);  
     
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
    const people = await User.findOne({email:req.body.email})
        if(!people){
            throw new Error("invasslid Crentials")
        }
     const passMatch = await people.verifyPassward(req.body.passward)  
    if(!passMatch){
                  throw new Error("invalid pass")}

                  
        const tocken = people.getJWT() 
        res.cookie("tocken",tocken,{
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
          
        })

        res.send("login successfully")

        
    }catch(err){
        res.send("Error "+ err.message)
    }
}
)

authrouter.post('/logout',userAuth, async (req, res) => {
    try{
        const {tocken} = req.cookies;
        
       const payload = jwt.decode(tocken);
       console.log(payload);
       
       await redisClient.set(`tocken${tocken}`,"blocked")
    //    await redisClient.expire(`tocken${tocken}`,1800) //# time in sec
       await redisClient.expireAt(`tocken${tocken}`,payload.exp)

        res.cookie("tocken" , null ,{expires: new Date(Date.now()),
        }) 
        res.send("logout successfully")
    }catch(err){
        res.send("Error "+ err.message)
    }
})

module.exports = authrouter
