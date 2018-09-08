const mongoose =require('mongoose');
const validator =require('validator');
const jwt =require('jsonwebtoken');
const _=require('lodash');

var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            // validator :(value)=>{
            //         return validator.isEmail(value);
            // },
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email'

        }
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            require:true
        },
        token:{
            type:String,
            require:true
        }
    }]
});


//override method the existing to customize the return properties of user
UserSchema.methods.toJSON =function(){
    var user =this;
    var userObject =user.toObject();

    return _.pick(userObject ,['_id','email']);
}


//custom method added
UserSchema.methods.generarteAuthToken=function(){
 var user=this;
 var access ='auth';
 var token =jwt.sign({
     _id:user._id.toHexString(),
     access
    },'abc123').toString();

    //user.tokens.push({access,token}); //old time
    user.tokens= user.tokens.concat([{access,token}]);
    
  return  user.save().then(()=>{
    return token;
    });
};
var User=mongoose.model('User', UserSchema);

module.exports ={ User };