import React, {useEffect, useState} from "react";
import listSvg from "../../assets/img/list.svg";
import {AddList, List, Tasks} from "./components"
import axios from "axios";
import DB from "../../assets/db/db.json"

const ToDoList = () => {
  const [lists, setLists] = useState(DB.lists.map(item => {
    item.color = DB.colors.filter(color => color.id === item.colorId)[0].name;
    return item
  }));
  // const locale = window.location.origin;

  // const expandColorUrl = 'http://localhost:4003'+'/lists?_expand=color';
  useEffect(() => {
    axios.get('http://localhost:4003/lists?_expand=color&_embed=tasks').then(({ data }) => setLists(data))
  }, [])

  const onAddList = (obj) => {
    const prevList = [...lists, obj]
    return setLists(prevList)
  }

  return(
    <>
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
        ]}/>
          <List
            onRemove={(id) => {
              const newLists = lists.filter(item => item.id !== id)
              setLists(newLists)
            }}
            items={lists}
            isRemovable
          />
        <AddList onAdd={onAddList} colors={DB.colors}/>
      </div>
        {lists && <Tasks list={lists[1]}/>}
      </div>
    </>
  )
}

export default ToDoList;