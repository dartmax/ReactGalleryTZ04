import React, {Fragment} from "react";
import "./List.scss"
import classnames from "classnames";
import Badge from "../../components/Badge"
import removeSvg from "../../../../assets/img/remove.svg";
import axios from "axios";


const List = ({items, isRemovable, click, onRemove}) => {
  const removeList = (item) => {
    if (window.confirm('delete the item?')) {
      axios.delete('http://localhost:4003/lists/' + item.id).then(() => {
        onRemove(item.id);
      })
    }
  }
  return(
    <Fragment>
      <ul onClick={click} className="list">
        {items.map((item, i) => (
          <li key={i} className={classnames(item.className, {active: item.active})}>
            <i>
              {item.icon ? (
                item.icon
              ) : (
                <Badge color={item.color} />
              )}
            </i>
            <span style={{display: "flex"}}>{item.name} {item.tasks && <span
              style={{color: 'red', flex: '1'}}> ({item.tasks && item.tasks.length})</span>}</span>
            {isRemovable &&
              <img
                src={removeSvg}
                alt="remove"
                className="list__remove-icon"
                onClick={() => removeList(item)}
              />}
          </li>
          ))}
      </ul>
    </Fragment>
  )
}

export default List;