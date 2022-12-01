import React, { useState } from 'react';
import { AppContext } from './contextItem.js';
import './App.css';
import RenderLogin from './screens/guest/login.js';
import TodoApp from './screens/todo';

const TODOLIST = 'todoList';

function App() {
  //retrieve token and list from local storage if they exist
  var storageToken =
    localStorage.getItem('token') !== 'undefined'
      ? JSON.parse(localStorage.getItem('token'))
      : null;
  var storageTodo = JSON.parse(localStorage.getItem(TODOLIST));

  //stores the token needed to log into the site
  const [token, setToken] = useState(storageToken);

  //stores the to-do list that is retrieved from local storage
  const [todoList, setList] = useState(localStorage.todoList ? storageTodo : []);

  const context = {
    token,
    setToken,
    todoList,
    //adds a new task to the list
    addTask: (task) => {
      var arr = todoList;
      arr.push(task);
      setList(arr);
      localStorage.setItem(TODOLIST, JSON.stringify(arr));
    },
    //removes a task from the list based on its position in the list array.
    removeTask: (index) => {
      var arr = todoList.filter((ele, ind) => ind !== index);
      setList(arr);
      localStorage.setItem(TODOLIST, JSON.stringify(arr));
    },
    //edits the name of the task
    editTask: (newEdit, index) => {
      var arr = todoList.filter((ele, ind) => ind !== index);
      arr.splice(index, 0, newEdit);
      setList(arr);
      localStorage.setItem(TODOLIST, JSON.stringify(arr));
    }
  };

  return (
    <AppContext.Provider value={context}>
      <div className="App">{token ? <TodoApp /> : <RenderLogin />}</div>
    </AppContext.Provider>
  );
}

export default App;
