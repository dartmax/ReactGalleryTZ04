import React, {useEffect, useState} from "react";
import listSvg from "../../assets/img/list.svg";
import {AddList, List, Tasks} from "./components"
import axios from "axios";

const ToDoList = () => {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  // const locale = window.location.origin;

  // const expandColorUrl = 'http://localhost:4000'+'/lists?_expand=color';
  useEffect(() => {
    axios.get('http://localhost:4000/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data)
    })
    axios.get('http://localhost:4000/colors/').then(({ data }) => {
      setColors(data)
    })
  }, [])

  const onAddList = (obj) => {
    const prevList = [...lists, obj]
    return setLists(prevList)
  }

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if(item.id === listId){
        item.tasks = [...item.tasks, taskObj]
      }
      return item
    })
    setLists(newList)
  }

  const onEditListTitle = (id, title) =>{
    const prevList = lists.map((item => {
      if(item.id === id){
        item.name = title;
      }
      return item;
    }))
    setLists(prevList)
  }

  return(
    <div className='todo'>
      <div className='todo__sidebar'>
      <List items={[
        {
          icon: (
            <img src={listSvg} alt="Index icon"/>
          ),
          name: "All tasks",
          active: true
        }
      ]}
      />
      {lists ? (
        <List
          onRemove={(id) => {
            const newLists = lists.filter(item => item.id !== id)
            setLists(newLists)
          }}
          items={lists}
          onClickItem={item => {
            setActiveItem(item)
          }}
          activeItem={activeItem}
          isRemovable
        />) : (
          'Loading...'
      )}
      <AddList onAdd={onAddList} colors={colors}/>
    </div>
      <div className="todo__tasks">
        {lists && activeItem && (
        <Tasks
          list={activeItem}
          onEditTitle={onEditListTitle}
          onAddTask={onAddTask}
        />
        )}
      </div>
    </div>
  )
}

export default ToDoList;