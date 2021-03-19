import React from "react";
import "./List.scss"
import classnames from "classnames";
import Badge from "../../components/Badge"
import removeSvg from "../../../../assets/img/remove.svg";
import axios from "axios";


const List = ({
  items,
  isRemovable,
  click,
  onRemove,
  onClickItem,
  activeItem
}) => {
  const removeList = (item) => {
    if (window.confirm('delete the item?')) {
      axios.delete('http://localhost:4000/lists/' + item.id).then(() => {
        onRemove(item.id);
      })
    }
  }
  return(
    <ul onClick={click} className="list">
      {items.map((item, i) => (
        <li
          key={i}
          className={classnames(item.className, {
            active: item.active ? item.active : activeItem && activeItem.id === item.id
          })}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>
            {item.icon ? (
              item.icon
            ) : (
              <Badge color={item.color} />
            )}
          </i>
          <span>{item.name} {item.tasks && item.tasks.length > 0 && <span>{item.tasks && item.tasks.length}</span>}</span>
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
  )
}

export default List;