const express = require('express');

const app = express();
const main = require('./database');
const Book = require('./module/bookschema');


app.use(express.json()) // to parse the json data from the request body



app.get('/book', async (req, res) => {
   await Book.find({}).then((data) => {
        res.send(data)
    })
})

app.post('/book',async (req, res) => {
    // const data =  new Book(req.body) // req.body is the data sent from the client
    //   await data.save()
//                   or
   const data = await Book.create(req.body)
    res.send({message:"all set" , data})
})
 
app.delete('/book/:name' , async (req , res)=>{
    const name = req.params.name
   const data = await Book.deleteOne({name:name})
   
    res.send({message:"data-deleated" , data})

})

 app.put('/book/:name', async (req, res) => {
    const name = req.params.name
    const data = await Book.updateOne({name:name},{$set:req.body})
    // $set is used to update the data in the database
    res.send({message:"data-updated", data})
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



