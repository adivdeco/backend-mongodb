

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
    max:80, 
    validate(value){
        if(value < 10 || value > 80){
            throw new Error('age should be between 10 and 80')
        }
    }
   },
   gender:{
    type:String,
    enum:["male","femal","other"],
    required:true,
   },
   email:{
    type:String,
    },
    passward:{
        type:String,
        required:true,
        validate(value){
            if(value.includes(' ')){
                throw new Error('passward should not contain space')
            }
        }
    },
    photo:{
        type:String,
        default:"annomaous img.png"
    },
    createdat:{
        type:Date,
        default:Date.now
    },
    updatedat:{
        type:Date,
        default:Date.now
    },
    // isDeleted:{
    //     type:Boolean,
    //     default:false
    // },
    // deletedAt:{
    //     type:Date,
    //     default:null
    // },
  
    
  

   


});

const User = mongoose.model('user', userSchema);

module.exports = User;