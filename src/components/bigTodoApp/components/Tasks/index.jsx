import React from "react";
import editSvg from "../../../../assets/img/edit.svg";
import axios from "axios";
import AddTaskForm from "./AddTaskForm";
import "./Tasks.scss"
import Task from "./Task";
import {Link} from "react-router-dom";

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt('New Title', list.name);
    if(newTitle){
      onEditTitle(list.id, newTitle)
      axios.patch('http://localhost:4000/lists/' + list.id, {
        name: newTitle
      }).catch((e) => {
        console.log(e.message("Failed to update list title"))
      })
    }
  }

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{color: list.color.hex}} className="tasks__title">{list.name}
          <img src={editSvg} alt="edit" onClick={editTitle}/>
        </h2>
      </Link>
    <div className="tasks__items">
      {!withoutEmpty && list.tasks && !list.tasks.length && <h2>No tasks in this list</h2>}
        {list.tasks && list.tasks.map(task => (
          <Task
            key={task.id}
            list={list}
            onEdit={onEditTask}
            onRemove={onRemoveTask}
            onComplete={onCompleteTask}
            {...task}
          />
        ))}
        <AddTaskForm
          key={list.id}
          list={list}
          onAddTask={onAddTask}
        />
      </div>
    </div>
  )
}

export default Tasks;