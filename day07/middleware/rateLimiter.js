const redisClient = require('../config/redis')

const rateLimiter = async (req,res,next)=>{

    try {
        const ip = req.ip;

        const no_ofreq = await redisClient.incr(ip)        
        console.log("Request count:", no_ofreq);

        let ttl = await redisClient.ttl(ip)    // ⏳ How many seconds are left before this key (IP) automatically expires?”

        if(no_ofreq === 1){
            await redisClient.expire(ip,20)  //in sec 
            ttl = 20;
          }

           if (ttl === -1) {                   //* checks if .exp() is miss from hear it get added
            await redisClient.expire(ip , 20)  //10s
            ttl = 20;
        }

        if (no_ofreq>5) {
            console.log(`User ${ip} excedded rate-limit, Wait ${ttl} seconds`);
              
            // Set Retry-After header for client
            res.setHeader('Retry-After', ttl);
      return res.status(429).send(`Too many requests. Try again after ${ttl} seconds.`);
            } 
  
    next()
}


   catch (error) {
    console.error("RateLimiter Error:"+error);
    res.status(500).send("Error: " + error.message);
}

}


module.exports = rateLimiter