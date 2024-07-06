const fs = require('fs');
const path = require('path');

// console.log(__dirname);
let filePath = path.join(__dirname, '..', '/data', 'todos.json');
// console.log(filePath);

class MyDB{
    static addTodos(newtask){
        return new Promise((resolve, reject) => {
            fs.readFile(
                filePath,{
                    encoding: 'utf-8'
                },
                (err, data) =>{
                    if(err) return reject(err);
                    let parseData = JSON.parse(data);
                    parseData.push(newtask);
                    fs.writeFile(
                        filePath,
                        JSON.stringify(parseData),
                        (err)=>{
                            if(err) return reject(err);
                            resolve("data added successfully");
                        }
                    )
                    resolve(data);
                }
            )
        })
    }

    static getTodos(){
        return new Promise((resolve, reject) => {
            fs.readFile(
                filePath,
                {
                    encoding: 'utf-8',
                },
                (err, data)=>{
                    if(err) return reject(err);
                    resolve(data);
                }
            )
        })
    }

    static deletetask(id){
        return new Promise((resolve,reject)=>{
            fs.readFile(
                filePath,{
                    encoding:'utf-8'
                },
                (err,data)=>{
                    if(err) return reject(err);
                    let todos = JSON.parse(data);
                    let newTodos = todos.filter((todo)=>todo.id!=id);
                    fs.writeFile(
                        filePath,
                        JSON.stringify(newTodos),
                        (err)=>{
                            if(err) return reject(err)
                            resolve("Sab kuch badhiya ho gaya");
                        }
                    )
                }
            )
        })
    }

    static updatetask(id, func){

        // console.log('inside update task');
        const upfunct = 'up';
        const downfunct = 'down';

        if(func == upfunct)
        {
            return new Promise((resolve,reject)=>{
                fs.readFile(
                    filePath,{
                        encoding:'utf-8'
                    },
                    (err,data)=>{
                        if(err) return reject(err);
                        let todos = JSON.parse(data);

                        for(let i = 0; i < todos.length; i++)
                        {
                            if(todos[i].id == id)
                            {
                                let idstore = todos[i].id;
                                let namestore = todos[i].name;
                                todos[i].name = todos[i-1].name;
                                todos[i].id = todos[i-1].id;
                                todos[i-1].id = idstore;
                                todos[i-1].name = namestore;
                                break;
                            }
                        }

                        fs.writeFile(
                            filePath,
                            JSON.stringify(todos),
                            (err)=>{
                                if(err) return reject(err)
                                resolve("Sab kuch badhiya ho gaya");
                            }
                        )
                    }
                )
            })
        }
        else if(func == downfunct)
        {
            return new Promise((resolve,reject)=>{
                fs.readFile(
                    filePath,{
                        encoding:'utf-8'
                    },
                    (err,data)=>{
                        if(err) return reject(err);
                        let todos = JSON.parse(data);

                        for(let i = 0; i < todos.length; i++)
                        {
                            if(todos[i].id == id)
                            {
                                let idstore = todos[i].id;
                                let namestore = todos[i].name;
                                todos[i].name = todos[i+1].name;
                                todos[i].id = todos[i+1].id;
                                todos[i+1].id = idstore;
                                todos[i+1].name = namestore;
                                break;
                            }
                        }

                        fs.writeFile(
                            filePath,
                            JSON.stringify(todos),
                            (err)=>{
                                if(err) return reject(err)
                                resolve("Sab kuch badhiya ho gaya");
                            }
                        )
                    }
                )
            })
        }
    }
}

module.exports = MyDB;