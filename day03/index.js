const express = require('express');

const app = express();
const main = require('./database');
const User = require('./module/userSchemas');



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
    // if(!req.body.name){
    //     return res.status(400).send({message:"please provide name"})
    // }
    // if(!req.body.age){
    //     return res.status(400).send({message:"please provide age"})
    // } 
  const mandatoryField = ["name","age","gender"]
//   const isValid = mandatoryField.every((field)=>Object.keys(req.body).includes(field))
  

  const isValid = mandatoryField.every((field) => {
    return req.body[field] !== undefined
  })
 if(!isValid){
   throw new Error("please provide all mandatory fields")
}
//     // const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(req.body.email)
    // if(!isValidEmail){
    //     return res.status(400).send({message:"please provide valid email"})
    // }

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



