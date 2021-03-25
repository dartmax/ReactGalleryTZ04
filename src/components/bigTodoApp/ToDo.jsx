import React, {useEffect, useRef, useState} from "react";
import listSvg from "../../assets/img/list.svg";
import {AddList, List, Tasks} from "./components"
import axios from "axios";
import {Switch} from "react-router";
import { Route, useHistory } from "react-router-dom"

const ToDoList = () => {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const myRef = useRef();
  // const locale = window.location.origin;
  let history = useHistory();
  // const expandColorUrl = 'http://localhost:4000'+'/lists?_expand=color';
  useEffect(() => {
    axios.get('http://localhost:4000/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data)
    })
    axios.get('http://localhost:4000/colors/').then(({ data }) => {
      setColors(data)
    })
  }, []);

  useEffect(() => {
    myRef.current.addEventListener("scroll", e => console.log("Scroll", e.type));
  }, [])

  useEffect(() => {
    const listId = history.location.pathname.split('lists/')[1];
    if (lists){
      const list = lists.find(list => list.id === Number(listId))
      setActiveItem(list)
    }
  }, [lists, history.location.pathname]);

  const onAddList = (obj) => {
    const prevList = [...lists, obj]
    return setLists(prevList)
  };

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if(item.id === listId){
        item.tasks = [...item.tasks, taskObj]
      }
      return item
    })
    setLists(newList)
  };

  const onCompleteTask = (listId, taskId, completed) => {
    const completedTask = lists.map(list => {
      if(list.id === listId){
        list.tasks = list.tasks.map(task => {
          if(task.id === taskId){
            task.completed = completed;
          }
          return task;
        })
      }
      return list;
    })
    setLists(completedTask);
    axios.patch('http://localhost:4000/tasks/' + taskId, {completed}
    ).catch((e) => {
      console.log(e)
    })
  }

  const onRemoveTask = (listId, taskId) => {
    if(!taskId){
      return;
    }
    if(window.confirm("Are you sure you want to delete the task?")) {
      const prevTask = lists.map(item => {
        if(item.id === listId){
          item.tasks = item.tasks.filter(task => task.id !== taskId)
        }
        return item;
      })
      setLists(prevTask);
      axios.delete('http://localhost:4000/tasks/' + taskId
      ).catch((e) => {
        console.log(e)
      })
    }
  }

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt("Text of task", taskObj.text)
    if(!newTaskText && newTaskText !== '' ){
      return;
    }
    const prevTask = lists.map(list => {
        if(list.id === listId){
          list.tasks = list.tasks.map(task => {
            if(task.id === taskObj.id){
              task.text = newTaskText
            }
            return task;
          })
        }
        return list;
      })
      setLists(prevTask);
      axios.patch('http://localhost:4000/tasks/' + taskObj.id, {text: newTaskText}
      ).catch((e) => {
        console.log(e)
      })
  }

  const onEditListTitle = (id, title) =>{
    const prevList = lists.map((item => {
      if(item.id === id){
        item.name = title;
      }
      return item;
    }))
    setLists(prevList)
  };

  return(
    <div className='todo'>
      <div className='todo__sidebar'>
      <List
        onClickItem={() => {
          window.location.pathname = '/todo'
        }}
        items={[
        {
          icon: (
            <img src={listSvg} alt="Index icon"/>
          ),
          name: "All tasks",
          active: history.location.pathname === '/todo',
        }
      ]}
      />
      {lists ? (
        <List
          key={lists.id}
          onRemove={(id) => {
            const newLists = lists.filter(item => item.id !== id)
            setLists(newLists)
          }}
          items={lists}
          onClickItem={list => {
            history.push(`/lists/${list.id}`)
          }}
          activeItem={activeItem}
          isRemovable
        />) : (
          'Loading...'
      )}
      <AddList onAdd={onAddList} colors={colors}/>
    </div>
      <div ref={myRef} className="todo__tasks">
        <Route exact path="/todo">
          {lists && lists.map(list => (
            <Tasks
              key={list.id}
              list={list}
              onEditTitle={onEditListTitle}
              onAddTask={onAddTask}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
              withoutEmpty
            />
          ))}
        </Route>
        <Route path="/lists/:id">
        {lists && activeItem && (
            <Tasks
              list={activeItem}
              onEditTitle={onEditListTitle}
              onAddTask={onAddTask}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
            />
          )}
        </Route>
      </div>
    </div>
  )
}

export default ToDoList;