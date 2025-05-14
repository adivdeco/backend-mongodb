
const redisClient = require('../config/redis');

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;
    const cooldownKey = `cooldown:${ip}`;
    const key = `ratelimiter:${ip}`;

    // 1. Check Cooldown First
    const cooldownTTL = await redisClient.ttl(cooldownKey);
    // console.log(`Cooldown TTL: ${cooldownTTL}`);
    if (cooldownTTL > 0) {
      res.setHeader('Retry-After', cooldownTTL);
      return res.status(429).send(`🕐 Please wait ok. ${cooldownTTL}s before your next request.`);
    }

// 2. Check Rate Limit

const curentTime = Math.floor(Date.now() / 1000);
const widowSize = 60; // 60sec
const maxRequests = 10; // 100 requests per hour
const windowStart = curentTime - widowSize;

    await redisClient.zRemRangeByScore(key , 0 , windowStart); // Remove old requests from the sorted set mean: mann lo abhi 1 bja hai or windowsize 1 ghanta hai to 12 bje se pehle ki sabhi requests ko hata do
    // jo bche ga vo zcard me count hoga
const num_of_req = await redisClient.zCard(key)  // Count the number of requests left after removing old requests
console.log(`Number of requests in the last : ${num_of_req} seconds`);

    if(num_of_req>=maxRequests){
        res.setHeader('Retry-After', 3600);
        return res.status(429).send(`🕐 Please wait ${60}s before your next request.`);
    }

    await redisClient.zAdd(key, [{score:curentTime , value:`curentTime${Math.floor(Math.random()*curentTime)}`}]) // Add the current request to the sorted set
    await redisClient.expire(key, widowSize); // Set the expiration time for the sorted set



    

    //  Set Cooldown AFTER the request is allowed

    await redisClient.set(cooldownKey, '1', {
        EX:5,  // 10 seconds cooldown
        overwrite:true
    }); 

    console.log(`Request  allowed. wait 5s for next request.`);

    next();

  } catch (err) {
    console.error("RateLimiter Error:", err);
    res.status(500).send("Server error");
  }
};

module.exports = rateLimiter;
