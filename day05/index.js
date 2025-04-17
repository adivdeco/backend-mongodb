const express = require('express');

const app = express();
const main = require('./database');
const User = require('./module/userSchemas');
const validateUser = require('./utils/validator');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser') // to parse the cookies from the request
const jwt = require('jsonwebtoken');
const userAuth = require('./middleware/userAuth') // to authenticate the user
require('dotenv').config() // to load the environment variables from .env file@@
const authrouter = require('./routes/log_reg') // to load the authentication routes
const userrouter = require('./routes/user_data_finder') // to load the user data routes


app.use(express.json()) // to parse the json data from the request body
app.use(cookieParser()) // to parse the cookies from the request



const spark = new User ({name:"hell and clean"})   // this is just to check if the model is working or not
console.log(spark.name)




app.use('/auth' , authrouter) 
app.use('/usr' , userrouter) 








main()
.then( async () => {
    console.log('connected to database')

    app.listen(process.env.PORT, () => {
        console.log('server is running on port ')
    })    
})
.catch((err) => {
    console.log(err)
})



