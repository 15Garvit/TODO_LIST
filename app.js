const express = require('express');
const app = express();
const PORT = 3333;
const bodyParser = require('body-parser');
const path = require('path');
const MyDB = require('./dataStore/JS/script');
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

let todos = [];

app.get('/gettask', async (req,res)=>{
    // console.log(todos);
    try{
        let data = await MyDB.getTodos();
        // console.log(data);
        res.send(data);
    }
    catch(err){
        res.send("Error page in GetTask");
    }
})

app.post('/addtask', async (req,res)=>{
    let {newtask} = req.body;
    // console.log("newtask is " + newtask);

    try{
        // todos.push(newtask);
        await MyDB.addTodos({
            name: newtask,
            id: uuidv4()
        })
        res.redirect('/gettask');
    }
    catch(err){
    
    }
})

app.get('/deletetask',(req,res)=>{
    const {id} = req.query;
    // console.log(id);
    MyDB.deletetask(id)
        .then(()=>{
            res.redirect('/gettask');
        })
        .catch(err=>res.send("Delete mei error aa gaya"))
})

app.get('/updatetask', (req, res)=>{
    // console.log(req.query);
    const {id} = req.query;
    const {func} = req.query;

    MyDB.updatetask(id, func)
        .then(()=>{
            res.redirect('/gettask');
        })
        .catch(err => console.log("update nhi hua"));
})

app.listen(PORT, ()=>{
    console.log(`http://localhost:` + PORT)
})