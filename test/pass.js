

const bcrypt = require("bcrypt")

const passward = "adiv05102006"

async function hashing() {
    
    const salt = await bcrypt.genSalt(12)
    const hashpass = await bcrypt.hash(passward,salt)  // what is the salt round =>2^10 run this 10 times
    
    
    // console.log(hashpass)
    // console.log(salt);
    
    
    
    const isMatch = await bcrypt.compare(passward, hashpass)
    console.log(isMatch)
}
hashing()
// const bcrypt = require("bcrypt")