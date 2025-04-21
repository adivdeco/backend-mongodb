
const redisClient = require('../config/redis');

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;
    const cooldownKey = `cooldown:${ip}`;

    // 1. Check Cooldown First
    const cooldownTTL = await redisClient.ttl(cooldownKey);

    console.log(`Cooldown TTL: ${cooldownTTL}`);

    if (cooldownTTL > 0) {
      res.setHeader('Retry-After', cooldownTTL);
      return res.status(429).send(`🕐 Please wait ${cooldownTTL}s before your next request.`);
    }

// another logic

    // if (cooldownTTL === -2 || cooldownTTL === -1) {
    //     await redisClient.set(cooldownKey, '1', { EX: 10, overwrite: true });
    //   }
    //   console.log(`Request  allowed. wait 5s for next request.`);


    // 2. Rate Limiting Logic
    const reqCount = await redisClient.incr(ip);
    let ttl = await redisClient.ttl(ip);

    if (reqCount === 1) {
      await redisClient.expire(ip, 20); // set 20s window
      ttl = 20;
    }

    if (ttl === -1) {
      await redisClient.expire(ip, 20); // ensure expiry always exists
      ttl = 20;
    }

    console.log("no of req",reqCount);        // number of request
    // console.log(`TTL Left: ${ttl}s`);     // ratelimit time

    

    if (reqCount > 5) {
      res.setHeader('Retry-After', ttl);
      return res.status(429).send(`🚫 Too many requests. Try again in ${ttl} seconds.`);
    }

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
