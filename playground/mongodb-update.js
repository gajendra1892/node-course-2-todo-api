// const MongoClient =require('mongodb').MongoClient;
const {MongoClient ,ObjectID} =require('mongodb'); //are same as above


// MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db)=>{
    MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,client)=>{

if(error)
{
  return  console.log('Unable to connect the MongoDb server');

}

console.log('Connected to MongoDb Server');
const db= client.db('TodoApp');


// db.collection('Todos').findOneAndUpdate({
//     _id:new ObjectID('5b9132c8a5f8e6b856b1771a')
// },{
//     $set:{
//        // completed :false
//        text:'Test'
//     }
// },{
//     returnOriginal :false
// }).then((result)=>{
//     console.log(result);
// });

db.collection('Users').findOneAndUpdate({
    _id:new ObjectID('5b9110de6fb3415c2cabcfb6') 
},{
    $set:{
        name:'test'
    },
    $inc:{
        age:3
    }
},{
    returnOriginal :false
}).then((result)=>{
    console.log(result);
}); 


// db.close();
client.close();
});