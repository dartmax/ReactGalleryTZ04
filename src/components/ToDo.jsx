import React, {Fragment} from "react";
import listSvg from '../assets/img/list.svg'

const ToDoList = () => {
  return(
    <Fragment>
      <div className='todo'>
        <div className='todo__sidebar'>
          <ul className="todo__list">
            <li>
              <i>
                <img src={listSvg} alt="List icon"/>
              </i>
            </li>
          </ul>
        </div>
        <div className="todo__tasks">
          Hello world
        </div>
      </div>
    </Fragment>
  )
}
export default ToDoList;