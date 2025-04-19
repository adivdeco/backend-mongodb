const redisClient = require('../config/redis')

const rateLimiter = async (req,res,next)=>{

    try {
        const ip = req.ip;

        const no_ofreq = await redisClient.incr(ip)        
        console.log("Request count:", no_ofreq);

        let ttl = await redisClient.ttl(ip)
 
        if (ttl === -1) {
            await redisClient.expire(ip , 10) //10s
            ttl = 10;
        }


        if(no_ofreq === 1){
            await redisClient.expire(ip,20)  //in sec 
          }

        if (no_ofreq>10) {
            console.log(`User ${ip} excedded rate-limit, Wait ${ttl} seconds`);
              
            // Set Retry-After header for client
            res.setHeader('Retry-After', ttl);
      return res.status(429).send(`Too many requests. Try again after ${ttl} seconds.`);
            
        } 

        // if (no_ofreq > 10) {
        //     const ttl = await redisClient.ttl(ip); // get time left
        //     console.log(`User ${ip} exceeded rate limit. Wait ${ttl} seconds.`);
        //     return res.status(429).send(`Too many requests. Try again in ${ttl} seconds.`);
        //   }
  
    next()
}


   catch (error) {
    console.error("RateLimiter Error:"+error);
    res.status(500).send("Error: " + error.message);
}

}


module.exports = rateLimiter