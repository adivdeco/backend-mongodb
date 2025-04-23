
const redis = require ('redis')

const redisClient = redis.createClient({
    username: 'default',
    password: '3B5aM1TsgBmY6KO7flZUGcYXxMFJGWJh',
    socket: {
        host: 'redis-10092.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 10092
    }
});



module.exports = redisClient