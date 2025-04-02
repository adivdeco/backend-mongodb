

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:20,
        validate(value){
            if(value.includes(' ')){
                throw new Error('name should not contain space')
            }
        }
        
    },
   phone:{
    type:Number,
   },
   age:{
    type:Number,
    min:10,
    max:80
   },
   email:{
    type:String,
    }
   


});

const User = mongoose.model('user', userSchema);

module.exports = User;