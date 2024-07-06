const btn = document.querySelector('#btn');
const newtask = document.querySelector('#newtask');
const form = document.querySelector('form');
const tasklist = document.querySelector('.tasklist');

function addToList(arr)
{
    tasklist.innerText = '';
    arr.forEach(task => {
        let li = document.createElement('li');
        li.classList.add('taskli');
        li.innerHTML = `<div class="taskinfo">
                            <span><input type="checkbox" class="checkbox"></span>
                            <span class="taskname">${task.name}</span>
                        </div>
                        <div class="iconsgrp">
                            <input name="taskid" type="hidden" value=${task.id}>
                            <button class="taskicons taskicons3"><i class="fa-solid fa-trash"></i></button>
                            <input name="taskid" type="hidden" value=${task.id}>
                            <button class="taskicons taskicons2"><i class="fa-solid fa-arrow-down"></i></button>
                            <input name="taskid" type="hidden" value=${task.id}>
                            <button class="taskicons taskicons1"><i class="fa-solid fa-arrow-up"></i></span>
                        </div>`
        
        tasklist.appendChild(li);
    });
}

form.addEventListener('submit', async (ev)=>{
    ev.preventDefault();

    // console.log("inside form");
    try{
        let {data} = await axios.post('/addtask',{
            newtask: newtask.value
        })
        // console.log(data);
        newtask.value = '';
        addToList(data);
    }
    catch(err){
        console.log(err);
    }
})

function loadInitialTodos(){
    try{
        axios.get('/gettask')
            .then((data)=>{
                // console.log(data);
                addToList(data.data);
            })
            .catch(err => console.log(err));
    }
    catch(err){

    }
}

loadInitialTodos();

tasklist.addEventListener('click', (ev)=>{
    // console.log(ev.target);
    // console.log(ev.target.parentElement.classList[1]);
    // console.log(ev.target.parentElement.previousElementSibling);
    const delval = 'taskicons3';
    const downval = 'taskicons2';
    const upval = 'taskicons1';

    let checkval = false;
    if(ev.target.classList[0] == 'checkbox') checkval = true;

    if(checkval == true)
    {
        // console.log(ev.target);
        // console.log(ev.target.nextElementSibling);
        // console.log(ev.target.parentElement.nextElementSibling.classList);
        // ev.target.parentElement.nextElementSibling.classList.add('linecut');

        let ans = ev.target.checked;

        if(ans)
        {
            ev.target.parentElement.nextElementSibling.classList.add('linecut');
        }
        else{
            ev.target.parentElement.nextElementSibling.classList.remove('linecut');
        }
    }

    let buttonclass= ev.target.parentElement.classList[1];

    if(buttonclass == delval)
    {
        let id = ev.target.parentElement.previousElementSibling.getAttribute('value');
        axios.get(`/deletetask?id=${id}`)
            .then((data)=>{
                console.log(data.data);
                addToList(data.data);
            })
            .catch((er)=>console.log(er));
    }
    else if(buttonclass == upval)
    {
        let id = ev.target.parentElement.previousElementSibling.getAttribute('value');
        axios.get(`/updatetask?id=${id}&func=up`)
            .then((data)=>{
                // console.log(data.data);
                addToList(data.data);
            })
            .catch((er)=>console.log(er));
    }
    else if(buttonclass == downval)
    {
        let id = ev.target.parentElement.previousElementSibling.getAttribute('value');
        axios.get(`/updatetask?id=${id}&func=down`)
            .then((data)=>{
                // console.log(data.data);
                addToList(data.data);
            })
            .catch((er)=>console.log(er));
    }
   
})