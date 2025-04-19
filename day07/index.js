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
const authrouter = require('./routes/log_reg_logout') // to load the authentication routes
const userrouter = require('./routes/user_data_finder') // to load the user data routes
const redisClient = require('./config/redis')
const rateLimiter = require('./middleware/rateLimiter')

app.use(express.json()) // to parse the json data from the request body
app.use(cookieParser()) // to parse the cookies from the request
app.set('trust proxy', true);
app.use(rateLimiter)

// routes

app.use('/auth' , authrouter) 
app.use('/usr' , userrouter) 





const InitlizeConnection = async ()=>{
    try {

        // await redisClient.connect();
        // console.log("redis is connected");
        
        // await main()
        // console.log("db is connected");

        Promise.all([redisClient.connect(),main()])
        console.log("redis & db are connected...");
        

        app.listen(process.env.PORT, () => {
            console.log('server is running on port ')
        }) 
        
    } catch (error) {
        console.log("error" + error);
         
    }
}

InitlizeConnection()

// main()
// .then( async () => {
//     console.log('connected to database')

//     app.listen(process.env.PORT, () => {
//         console.log('server is running on port ')
//     })    
// })
// .catch((err) => {
//     console.log(err)
// })



