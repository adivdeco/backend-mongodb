const express = require('express');

const app = express();
const main = require('./database');
const User = require('./module/userSchemas');
const validateUser = require('./utils/validator');

app.use(express.json()) // to parse the json data from the request body


const spark = new User ({name:"hell and clean"})   // this is just to check if the model is working or not
console.log(spark.name)

app.get("/user" , async (req, res) => {
    const data = await User.find({})
    res.send({message:"hear is all data",data})
})

app.get('/user/:id', async (req, res) => {
   try{ const data = await User.findById(req.params.id)
    res.send(data)
   }
   catch(err){
    res.send("Error"+ err.message)
   }
})

app.post('/user',async (req, res) => {

   try{
    
    validateUser(req.body);  //pass req.body to the function

     await User.create(req.body)
    res.send("user created successfully")
}
catch(err){
    res.send("Error "+ err.message)
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



