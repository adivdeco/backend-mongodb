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
    // isDeleted:{
    //     type:Boolean,
    //     default:false
    // },
    // deletedAt:{
    //     type:Date,
    //     default:null
    // },
    
  
    
  

   


});
//  what is methode =>> method is a function that is associated with an object, and it can be called on that object to perform some action or retrieve some information.
//  what is static =>> static method is a method that belongs to the class itself, rather than to instances of the class. It can be called on the class without creating an instance of the class.
//  what is instance =>> instance is a specific realization of any object, created based on the class definition. It contains the properties and methods defined in the class, and it can be used to access and manipulate data.
//  what is prototype =>> prototype is an object that is associated with every JavaScript function and object. It allows you to add properties and methods to a constructor function, which can then be shared among all instances of that constructor.
//  what is this =>> this is a special keyword in JavaScript that refers to the current context or object. It allows you to access properties and methods of the current object or instance.
//  what is this in mongoose =>> this refers to the current instance of the model, allowing you to access its properties and methods.
userSchema.methods.getJWT = function(){
   const ans = jwt.sign({_id: this._id , email: this.email}, process.env.Secreat_key )
  
   return ans
}

userSchema.methods.verifyPassward = async function(userpassward){
     const ans = await bcrypt.compare(userpassward , this.passward)
    //  console.log(userpassward , this.passward);
      return ans
}


//static method to hash the password before saving
// static function => it is used to create a method that can be called on the model itself, rather than on an instance of the model.
// userSchema.statics.hashPassword = async function(password) {
//     return await bcrypt.compare(password, this.passward);
//   };

// static method to check if the password is valid


const User = mongoose.model('user', userSchema);

module.exports = User;