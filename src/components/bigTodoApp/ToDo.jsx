import React, {Fragment, useState} from "react";
import List from './components/List'
import listSvg from "../../assets/img/list.svg";
import AddList from "./components/AddList";

const ToDoList = () => {
  const [state, setState] = useState('');
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
        <AddList />
      </div>
      </div>
    </>
  )
}

export default ToDoList;