import React from "react";
import List from './components/List'
import listSvg from "../../assets/img/list.svg";
import AddList from "./components/AddList";
import DB from "../../assets/db/db.json"

const ToDoList = () => {
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
          <List items={[
            {
              color: "green",
              name: "Purchase"
            },
            {
              color: "blue",
              name: "Front End"
            },
            {
              color: "pink",
              name: "Movie and serials"
            },
          ]}
          isRemovable
          />
        <AddList colors={DB.colors}/>
      </div>
      </div>
    </>
  )
}

export default ToDoList;