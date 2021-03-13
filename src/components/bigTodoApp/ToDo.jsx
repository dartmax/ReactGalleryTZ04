import React, {useState} from "react";
import List from './components/List'
import listSvg from "../../assets/img/list.svg";
import AddList from "./components/AddList";
import DB from "../../assets/db/db.json"
import BuggyCounter from "./components/Counter";

const ToDoList = () => {
  const [lists, setLists] = useState(DB.lists.map(item => {
    item.color = DB.colors.filter(color => color.id === item.colorId)[0].name;
    return item
  }));
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
          <List items={lists}
          isRemovable
          />
        <AddList onAdd={onAddList} colors={DB.colors}/>
      </div>

      </div>
    </>
  )
}

export default ToDoList;