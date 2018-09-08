var {User} =require('./../models/user');

//middleware function
var authenticate =(req ,res,next)=>{
    
    var token =req.header('X-auth');

    User.findByToken(token).then((user)=>{
        if(!user){
    
            return Promise.reject();
        }
        
        req.user=user;
        req.token=token;
        next();
    }).catch(()=>{
    
        res.status(401).send('Authorization denied');
    });
};

module.exports ={authenticate};