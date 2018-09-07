 const {ObjectID} = require('mongodb');

 const {mongoose}=require('./../server/db/mongoose');
 const {Todo} =require('./../server/models/todo');
 const {User}=require('./../server/models/user');

 //("5b926baa05a43112bcdee463"), ObjectId("5b926f985b62ea7374e472f9"),

 var id='5b926f985b62ea7374e472f2';

 var userid='5b914b6ff25ef204045f5221';//ectId("5b914b6ff25ef204045f5244"),


// if(!ObjectID.isValid(id)){
//     console.log('Id is not valid');
// }

//  Todo.find({
//      _id:id
//  }).then((todos)=>{
//     if(todos.length ==0){
//         return console.log('todos not found');
//     }
//      console.log('Todos',todos);
//  }).catch((e)=>console.log(e));

//  Todo.findOne({
//     _id:id
// }).then((todo)=>{
//     if(!todo){
//         return console.log('todo not found');
//     }
//     console.log('Todo',todo);
// }).catch((e)=>console.log(e));

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo by Id',todo);
// }).catch((e)=>console.log(e));

if(!ObjectID.isValid(userid)){
    console.log('User id is not valid');
}
else{
    console.log('User id is valid');
}

User.findById(userid).then((user)=>{
   if(!user){
       return console.log('User not found');
   }
    console.log('User',user);
}).catch((e)=>{console.log(e)});