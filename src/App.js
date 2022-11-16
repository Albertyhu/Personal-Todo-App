import React, { useEffect, useState } from 'react'; 
import { AppContext } from './components/contextItem.js'; 
import './App.css'; 
import RenderLogin from './screens/guest/login.js'; 
import TodoApp from './screens/todo'; 

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [todoList, setList] = useState(localStorage.getItem('todoList'))

    const context = {
        setToken, 
        todoList, 
        addTask: (task) => {
            var arr = todoList; 
            arr.push(task); 
            setList(arr); 
        }, 
        removeTask: (index) => {
            var arr = todoList.filter((ele, ind) => ind !== index); 
            setList(arr)
        }, 
        editTask: (newEdit, index) => {
            var arr = todoList.filter((ele, ind) => ind !== index);  
            arr.splice(index, 0, newEdit); 
            setList(arr)
        }
    }

    //may cause problems 
    useEffect(() => {
        localStorage.setItem('todoList', todoList)
    }, [todoList])

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
