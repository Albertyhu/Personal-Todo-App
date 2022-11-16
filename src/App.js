import React, { useEffect, useState } from 'react'; 
import { AppContext } from './components/contextItem.js'; 
import './App.css'; 
import RenderLogin from './screens/guest/login.js'; 
import TodoApp from './screens/todo'; 

const TODOLIST = "todoList"

function App() {
    //localStorage.clear();
    var storageToken = localStorage.getItem('token') !== "undefined" ? JSON.parse(localStorage.getItem('token')) : null; 
    var storageTodo = JSON.parse(localStorage.getItem(TODOLIST));

    const [token, setToken] = useState(storageToken)
    const [todoList, setList] = useState(localStorage.todoList ? storageTodo : [])

    const context = {
        token, 
        setToken, 
        todoList, 
        addTask: (task) => {
            var arr = todoList; 
            arr.push(task); 
            setList(arr); 
            localStorage.setItem(TODOLIST, JSON.stringify(arr))
        }, 
        removeTask: (index) => {
            var arr = todoList.filter((ele, ind) => ind !== index); 
            setList(arr)
            localStorage.setItem(TODOLIST, JSON.stringify(arr))
        }, 
        editTask: (newEdit, index) => {
            var arr = todoList.filter((ele, ind) => ind !== index);  
            arr.splice(index, 0, newEdit); 
            setList(arr)
            localStorage.setItem(TODOLIST, JSON.stringify(arr))
        }
    }

    return (
      <AppContext.Provider value =  {context}>
            <div className="App">
                {token ?
                    <TodoApp />
                    :
                    <RenderLogin />
                }
            </div>
       </AppContext.Provider>

  );
}

export default App;
