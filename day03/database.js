
const mongoose = require('mongoose');

async function main(){
    await mongoose.connect("mongodb+srv://sadiv120:82111512hk@adivdeco.fh1i03w.mongodb.net/user");

    
}

module.exports = main;