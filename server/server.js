 var express =require('express');
 var bodyParser =require('body-parser');
 
 var {mongoose} =require('./db/mongoose');
 var { Todo } =require('./models/todo');
 var { User } =require('./models/user');

 var {ObjectID} =require('mongodb');


 var  app =express();

 //for deployment
const port =process.env.PORT ||3000;


  //for deployment

//post
app.use(bodyParser.json());
app.post('/todos',(req, res)=>{

    var todo =new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);

    },(e)=>{
    res.status(400).send(e);
    });

//    console.log(req.body);
});


//get
app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(err)=>{
res.status(400).send(err);
    });
});


//Get/todo/123

app.get('/todos/:id',(req,res)=>{
var id=req.params.id;
if(!ObjectID.isValid(id))
{
    return  res.status(404).send();
}

    Todo.findById(id).then((todo)=>{

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
 
//res.send(req.params);
});



//delete
app.delete('/todos/:id',(req,res)=>{

    var id= req.params.id;

    if(!ObjectID.isValid(id)){
      
        return  res.status(404).send('object id is not valid');
    }

    Todo.findByIdAndRemove(id).then((todo)=>{
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
});



app.listen(port ,()=>{
    console.log(`App started on port ${port}`);
});

//  app.listen(4000 ,()=>{
//      console.log('App started on port 4000');
//  });

module.exports={app};


