import React, {useState} from "react";
import addSvg from "../../../../assets/img/add.svg";
import axios from "axios";

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue('');
  }

  const addTask = () => {
    const taskObj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true)

    axios.post('http://localhost:4000/tasks/', taskObj)
      .then(({data}) => {
      onAddTask(list.id, data);
      toggleFormVisible();
    }).catch(() => {
      console.log("Error. Please, type some text")
    })
      .finally(() => {
      setIsLoading(false)
    })
  }

  return(
    <div className="tasks__form">
      {!visibleForm ?
        (<div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="Add"/>
          <span>New task</span>
        </div>) : (
          <div className="tasks__form-block">
            <input
              value={inputValue}
              className="field"
              type="text"
              placeholder="Enter new task"
              onChange={e => setInputValue(e.target.value)}
            />
            <button disabled={isLoading} onClick={addTask} className="button">{isLoading ? 'Loading...' : 'Add task'}</button>
            <button onClick={toggleFormVisible} className="button button__grey">Cancel</button>
          </div>
        )
      }


    </div>
  )
}

export default AddTaskForm;