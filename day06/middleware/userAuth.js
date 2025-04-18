const jwt = require("jsonwebtoken")
const User = require("../module/userSchemas")
const redisClient = require("../config/redis")

const userAuth = async (req, res, next) => {
try{
    const {tocken} = req.cookies
    if(!tocken){
        throw new Error("invalid tocken")
    }

    
    const payload =jwt.verify(tocken,process.env.Secreat_key)
    const {_id} = payload

    if(!_id){
        throw new Error("id is missing")
    }

    const data = await User.findById(_id)
     if(!data){
        throw new Error("user not found");
        }
        req.data = data;

       
        const Blocktocken = await redisClient.exists(`tocken${tocken}`)
        if (Blocktocken) {
            throw new Error ("tocken chorr")
            
        }


next()

} 
catch (err) {
    res.status(401).send({ message: "Unauthorized: " + err.message });
}}

module.exports = userAuth;



