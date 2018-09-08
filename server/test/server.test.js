const expect =require('expect');
const request =require('supertest');
const {ObjectID} =require('mongodb');

const {app}=require('./../server');
const {Todo}=require('./../models/todo');

const todos =[{
    _id : new ObjectID(),
    text:'First test todo'
},{
    _id: new ObjectID(),
    text:'Second test todo',
    completed:true,
    completedAt:333
}
];


beforeEach((done)=>{

//it will make the database collection empty for testing before every test case run
    // Todo.remove({}).then(()=>{
    //     done()
    // });

     Todo.remove({}).then(()=>{
     return  Todo.insertMany(todos);
    }).then(()=>done());
});

describe('POST /todos',()=>{

    it('should creatte a new todo',(done)=>{
        var text='Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
             
            expect(res.body.text).toBe(text );
        })
        .end((err,res)=>{
            if(err){
             return   done(err);
            }
            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=>done(e));
        });
    });

it('should not create todo with invalid body data',(done)=>{

    request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err)
            {
                return done(err);
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done();
            }).catch((e)=>{done(e)});
        })
});

});

describe('GET /todos',()=>{

    it('should fetch all todos',(done)=>{

        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});


describe('GET /todos/:id',()=>{

    it('Should return todo doc',(done)=>{
 
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });


    it('should return 404 if todo not found',(done)=>{
        
        var hexId =new ObjectID().toHexString();

        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    
    it('should return 404 for non-object ids',(done)=>{

        request(app)
        .get(`/todos/123ff`)
        .expect(404)
        .end(done);
    });
});


describe('DELETE /todos/:id',()=>{

it('should remove a todo',(done)=>{
var hexid = todos[1]._id.toHexString();

    request(app)
    .delete(`/todos/${hexid}`)
    .expect(200)
    .expect((res)=>{
        expect(res.body.todo._id).toBe(hexid);
    })
   .end((err,res)=>{
   if(err)
   {
       return done(err);

   }
   
   Todo.findById(hexid).then((todo)=>{
    expect(todo).toBe(null);//toBeTruthy();//toNotExist();
    done();
   }).catch((e)=>{
      done(e);
   })
   });

});

it('should return 404 if todo not found',(done)=>{

    var hexid = new ObjectID().toHexString();

    request(app)
    .delete(`/todos/${hexid}`)
    .expect(404)
    .end(done);
});

it('should return 404 if boject id is invalid',(done)=>{
    var hexid = new ObjectID().toHexString();

    request(app)
    .delete('/todos/123dfgd')
    .expect(404)
    .end(done);
});
});

describe('PATCH /todos/:id',()=>{

    it('should update the todo',(done)=>{
            var id =todos[0]._id.toHexString();
            var body={
                text:'Text update from test',
                completed:true
            }

            request(app)
            .patch(`/todos/${id}`)
            .send(body)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.text).toBe(body.text);
                expect(res.body.todo.completedAt).toBeTruthy();//toBeA('number');
            })
            .end(done);
            // .end((err,res)=>{
            //     if(err)
            //     {
            //         return done(err);
             
            //     }
          
            //     Todo.findById(id).then((todo)=>{
            //         expect(todo.completed).toBe(true);
            //         expect(todo.text).toBe(body.text);
            //         expect(todo.completedAt).toBeTruthy();
            //     });
            //     done();
            // });
    });

    
    it('should clear completedAt when todo is not completed',(done)=>{
        var id =todos[1]._id.toHexString();
        var body={
            text:'Text update from test 2',
            completed:false
        }

        request(app)
        .patch(`/todos/${id}`)
        .send(body)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.text).toBe(body.text);
            expect(res.body.todo.completedAt).toBeNull();
        })
        .end(done);
    });

    it('should return 404 if todo not found',(done)=>{

        var hexid = new ObjectID().toHexString();
    
        request(app)
        .patch(`/todos/${hexid}`)
        .expect(404)
        .end(done);
    });
    
    it('should return 404 if boject id is invalid',(done)=>{
       // var hexid = new ObjectID().toHexString();
    
        request(app)
        .patch('/todos/123dfgd')
        .expect(404)
        .end(done);
    });

});