// const MongoClient =require('mongodb').MongoClient;
const {MongoClient ,ObjectID} =require('mongodb'); //are same as above

// var obj =new ObjectID();
// console.log(obj);

// var user ={name:'andrew',age:25};
// var {name} =user;   //es6 destructuring
// console.log(name);

// MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db)=>{
    MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,client)=>{

if(error)
{
  return  console.log('Unable to connect the MongoDb server');

}

console.log('Connected to MongoDb Server');
const db= client.db('TodoApp');

//insert data

// db.collection('Todos').insertOne({

//     text:'Something to do',
//     completed:false

// },(err,result)=>{
//     if(err)
//     {
//         return console.log('Unable to insert todo',err);
//     }

//     console.log(JSON.stringify(result.ops,undefined,2));
// })

// db.collection('Users').insertOne({
//  //_id:123,
//   name:'Gajju3',
//   age:24,
//   location:'Noida1'

// },(err,result)=>{
//     if(err)
//     {
//         return console.log('Unable to insert todo',err);
//     }

//     // // console.log(JSON.stringify(result.ops,undefined,2));
//     // console.log(result.ops[0]._id);
//     console.log(result.ops[0]._id.getTimestamp());
// })



// db.close();
client.close();
});