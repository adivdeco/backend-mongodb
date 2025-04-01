const express = require('express');

const app = express();
const main = require('./database');
const User = require('./module/user');



app.use(express.json()) // to parse the json data from the request body


const spark = new User ({name:"hell and clean"})   // this is just to check if the model is working or not
console.log(spark.name)

/

app.post('/user',async (req, res) => {
    const data = User.create(req.body)
    res.send({message:"all set" , data})
                 
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



