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



//delete many
// db.collection('Todos').deleteMany({text:'Dinner'}).then((result)=>{

//     console.log(result);
// })

//deleteone
// db.collection('Todos').deleteOne({completed:false}).then((result)=>{

//     console.log(result);
// })

//findoneAndDelete
// db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{

//     console.log(result);
// })

db.collection('Todos').findOneAndDelete({
    _id:new ObjectID("5b912b4fa5f8e6b856b172c7")
}).then((result)=>{

    console.log(result);
},(err)=>{
 console.log("Unable to delete",err);
     });

// db.close();
client.close();
});