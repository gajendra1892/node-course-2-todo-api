var mongoose =require('mongoose');

mongoose.Promise =global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

//save new something

var Todo =mongoose.model('Todo',{
    text :{
        type:String,
        required:true,
        minlength:2,
        trim:true


    },
    completed:{
        type : Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    }
});

// var newTodo =new Todo({
//     text :'Cook dinner'
// });

// newTodo.save().then((doc)=>{
//     console.log('Saved todo',doc)
// },(e)=>{
//     console.log('Unable to save todo',e);
// });

// var otherTodo =new Todo({
//     text :'Feed the cat',
//     completed:true,
//     completedAt:123
// });

// otherTodo.save().then((doc)=>{
//     // console.log('Saved todo',doc)
//     console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//     console.log('Unable to save todo',e);
// });

// var otherTodo =new Todo({
//     text:"something"
// });

// otherTodo.save().then((doc)=>{
//     // console.log('Saved todo',doc)
//     console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//     console.log('Unable to save todo',e);
// });

//User

var User=mongoose.model('User',{
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    }
});

var user= new User({
email:'gajendra@gmail.com  '
});

user.save().then((doc)=>{
  console.log('User Saved',doc);
},(err)=>{
    console.log('Unable to save user',err)
});