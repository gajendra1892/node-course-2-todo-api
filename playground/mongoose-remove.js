const {ObjectID} = require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo} =require('./../server/models/todo');
const {User}=require('./../server/models/user');

//multiple file delete and return result
// Todo.remove({}).then((result)=>{
// console.log(result);
// });


//find one and delete and return doc
Todo.findOneAndRemove({_id:'5b93686455f1b634402d4799'}).then((todo)=>{

        console.log(todo);
    });


//find by id and remove and return doc
// Todo.findByIdAndRemove('5b93686c55f1b634402d479a').then((todo)=>{

//     console.log(todo);
// });