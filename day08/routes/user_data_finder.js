const express =require('express');
const User = require('../module/userSchemas');
const userAuth = require('../middleware/userAuth'); // to authenticate the user

const userrouter = express.Router();


userrouter.get("/user" ,userAuth, async (req, res) => {
    try{ 
     res.send(req.data)
 }
 
      catch(err){
         res.send("Error"+ err.message)
     }
 })
 
 userrouter.get("/alluser" ,async (req, res) => { 
     try{
         const data = await User.find({})
         res.send(data)
     }
     catch(err){
         res.send("Error "+ err.message)
     }
 })

 module.exports = userrouter