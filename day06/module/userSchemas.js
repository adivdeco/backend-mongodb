const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
});

userSchema.methods.getJWT = function(){
   const ans = jwt.sign({_id: this._id , email: this.email},
     process.env.Secreat_key ,
     { expiresIn: "30m" }
     
    );
  
   return ans
}

userSchema.methods.verifyPassward = async function(userpassward){
     const ans = await bcrypt.compare(userpassward , this.passward)
      return ans
}



const User = mongoose.model('user', userSchema);
module.exports = User;