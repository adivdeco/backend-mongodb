

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    first_name:{
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
    last_name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:20
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        maxLength: 10,
        minLength: 10,
        validate(value) {
            if (value.length !== 10) {
                throw new Error('phone number should be 10 digits')
            }
        }
    },

    city:{
        type:String,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:15
    },
    age:{
        type:Number,
        required:true,
        min:18,
        max:70,
        validate(value){
            if(value<18){
                throw new Error('age should be 18+ to get registered')
            }
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        // validate(value){
        //     if(){
        //         throw new Error('email should contain @')
        //     }
        // }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:8,
        maxLength:20,
        validate(value){
            if(value.includes(' ')){
                throw new Error('password should not contain space')
            }
        }
    },
  
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },

});

const User = mongoose.model('user', userSchema);

module.exports = User;