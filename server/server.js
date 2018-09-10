require('./config/config');

const express =require('express');
 const bodyParser =require('body-parser');
 const {ObjectID} =require('mongodb');
 const _=require('lodash');
 const bcrypt =require('bcryptjs');
 
 var {mongoose} =require('./db/mongoose');
 var { Todo } =require('./models/todo');
 var { User } =require('./models/user');
 var {authenticate} =require('./middleware/authenticate');




 var  app =express();

 //for deployment
 const port =process.env.PORT ||3000;
//const port =process.env.PORT ;


  //for deployment

//post
app.use(bodyParser.json());

//app.post('/todos',(req, res)=>{
app.post('/todos',authenticate,(req, res)=>{

    var todo =new Todo({
        text: req.body.text,
        _creator:req.user._id
    });

    todo.save().then((doc)=>{
        res.send(doc);

    },(e)=>{
    res.status(400).send(e);
    });

//    console.log(req.body);
});


//get
// app.get('/todos',(req,res)=>{
    app.get('/todos',authenticate,(req,res)=>{
    Todo.find({
        _creator:req.user._id
    }).then((todos)=>{
        res.send({todos});
    },(err)=>{
res.status(400).send(err);
    });
});


//Get/todo/123

app.get('/todos/:id',authenticate,(req,res)=>{
var id=req.params.id;
if(!ObjectID.isValid(id))
{
    return  res.status(404).send();
}

Todo.findOne({
    _id:id,
    _creator:req.user._id
}).then((todo)=>{

    if(!todo){

        return res.status(404).send({});
    }
    res.status(200).send({todo});
},(err)=>{
    if(err)
    {
        res.status(400).send('Internal Server Error');
    }
}).catch((e)=>{
    res.status(400).send();
});
//     Todo.findById(id).then((todo)=>{

//     if(!todo){

//         return res.status(404).send({});
//     }
//     res.status(200).send({todo});
// },(err)=>{
//     if(err)
//     {
//         res.status(400).send('Internal Server Error');
//     }
// }).catch((e)=>{
//     res.status(400).send();
// });
 
//res.send(req.params);
});



//delete todo
app.delete('/todos/:id',authenticate,(req,res)=>{

    var id= req.params.id;

    if(!ObjectID.isValid(id)){
      
        return  res.status(404).send('object id is not valid');
    }

    Todo.findOneAndRemove({
        _id:id,
        _creator:req.user._id
    }).then((todo)=>{
        if(!todo)
        {
           return res.status(404).send("todo is not present in db");
        }
    
       // res.status(404).send(todo);
       res.status(200).send({todo});
        },(err)=>{
            if(err)
            {
                return   res.status(400).send('Internal server error');
            }
        }).catch((e)=>{
            return   res.status(400).send(e);
        });
//     Todo.findByIdAndRemove(id).then((todo)=>{
//     if(!todo)
//     {
//        return res.status(404).send("todo is not present in db");
//     }

//    // res.status(404).send(todo);
//    res.status(200).send({todo});
//     },(err)=>{
//         if(err)
//         {
//             return   res.status(400).send('Internal server error');
//         }
//     }).catch((e)=>{
//         return   res.status(400).send(e);
//     });
});

//update todo
app.patch('/todos/:id',authenticate,(req,res)=>{

    var id =req.params.id;
    var body =_.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
      
        return  res.status(404).send('object id is not valid');
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt =new Date().getTime();
    }
    else{
        body.completed=false;
        body.completedAt=null;

    }

    // Todo.findByIdAndUpdate(id,{
    //     $set:body
    // },{
    //     new:true
    // }).then((todo)=>{
        Todo.findOneAndUpdate({
            _id:id,
            _creator:req.user._id
        },{
        $set:body
    },{
        new:true
    }).then((todo)=>{
     if(!todo){
         return res.status(404).send('Object not found');
     }
     res.status(200).send({todo});
    }).catch((e)=>{
        res.status(400).send('Internal server error');
    });
    
});


//POST /users
app.post('/users',(req, res)=>{

    var body =_.pick(req.body,['email','password']);

    var user =new User(body);
    
    user.save().then(()=>{
       // res.send(doc);
    return  user.generarteAuthToken();
    }).then((token)=>{
     res.status(200).header('X-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
        });

//    console.log(req.body);
});


//private route
app.get('/users/me',authenticate,(req,res)=>{
// var token =req.header('X-auth');

// User.findByToken(token).then((user)=>{
//     if(!user){

//         return Promise.reject();
//     }
//     res.send(user);
// }).catch(()=>{

//     res.status(401).send('Authorization denied');
// });

res.send(req.user);

});




//Post 
app.post('/users/login',(req,res)=>{

    var body =_.pick(req.body,['email','password']);
    var email=body.email;

    User.findByCredentials(body.email,body.password).then((user)=>{
      
        user.generarteAuthToken().then((token)=>{
                res.header('x-auth',token).send(user);
        });
       // res.send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });

   
});


app.delete('/users/me/token',authenticate,(req,res)=>{

req.user.removeToken(req.token).then(()=>{
res.status(200).send();
},()=>{
    res.status(400).send();
});

});

app.listen(port ,()=>{
    console.log(`App started on port ${port}`);
});

//  app.listen(4000 ,()=>{
//      console.log('App started on port 4000');
//  });

module.exports={app};


