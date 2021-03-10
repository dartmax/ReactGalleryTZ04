import React, { useState } from 'react'
import ToDoForm from './ToDoForm'
import './index.css'

function SmallTodo() {
  const [todos, setTodos] = useState([]) // создаем новую задачу

  const addTask = (userInput) => { // получает значение userInput - может быть любое
    console.log('addTask userInput', userInput)
    if(userInput) { // если userInput есть то
      const newItem = { // добавляем новый элемент списка - объект
        id: Math.random().toString(36).substr(2,9), // ID
        task: userInput, // задача
        complete: false // задача не готова (выполнена или нет)
      }
      setTodos([...todos, newItem]) // вначале добавляем старый массив и потом добавляем новую задачи в список
    }
  }

  const removeTask = (id) => { //фильтруем список задач по текущей ID и добавляем его обратно в стейт
    console.log('removeTask id', id)

    setTodos([...todos.filter((todo) => todo.id !== id)]) // если тодо id не равен пришедшему id тогда м возвращаем все элементы массива, если условие не выполняется тогда текущий элемент мы не возвращаем
  }

  const handleToggle = (id) => { //меняет значение поля complete
    console.log('handleToggle id', id)

    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : {...todo } //возьмем текущий объект, скопируем его и в поле complete заменим на противоположное булево значение если нет, копируем весь элемент
      )
    ])
  }

  return (
    <div className="SmallTodo">
      <div>
        <div>Task scope: {todos.length}</div> {/*количество задач*/}
      </div>
      <ToDoForm addTask={addTask} /> {/*форма и передаем фукнцияю addTask*/}
      {todos.map((todo) => { /*ТОДО список*/
        return (
          <div key={todo.id} className="item-todo"> {/* получаем плюч по ID*/}
            <div
              className={todo.complete ? "item-text strike" : "item-text"}
              onClick={() => handleToggle(todo.id)} /* возвращаем removeTask и передаем ID задачи*/
            >
              {todo.task}
            </div>
            <div className="item-delete" onClick={() => removeTask(todo.id)}> {/* возвращаем функцию removeTask и передаем ID задачи*/}
              X
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default SmallTodo;
