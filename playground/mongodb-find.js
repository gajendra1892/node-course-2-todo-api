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

// db.collection('Todos').find().toArray().then((docs)=>{

//   console.log('Todos');
//   console.log(JSON.stringify(docs,undefined,2));
// },(err)=>{
// console.log("Unable to fetch todos",err);
// });

// db.collection('Todos').find({completed :false}).toArray().then((docs)=>{

//   console.log('Todos');
//   console.log(JSON.stringify(docs,undefined,2));
// },(err)=>{
// console.log("Unable to fetch todos",err);
// });

//not working as _id is abject not the string
// db.collection('Todos').find({_id :'5b9000617703e137cc2199f5'}).toArray().then((docs)=>{

//   console.log('Todos');
//   console.log(JSON.stringify(docs,undefined,2));
// },(err)=>{
// console.log("Unable to fetch todos",err);
// });

// db.collection('Todos').find({
//   _id : new ObjectID('5b911441a5f8e6b856b16b0f')
// }).toArray().then((docs)=>{

//   console.log('Todos');
//   console.log(JSON.stringify(docs,undefined,2));
// },(err)=>{
// console.log("Unable to fetch todos",err);
// });

// db.collection('Todos').find().count().then((count)=>{

//   console.log(`Todos count : ${count}`);
// },(err)=>{
// console.log("Unable to fetch todos",err);
// });

db.collection('Users').find({name:'Gajju'}).toArray().then((docs)=>{

  console.log('User DB');
  console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
console.log('Unable to find');
});

// db.close();
client.close();
});