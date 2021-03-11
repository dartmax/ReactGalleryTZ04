import React from "react";
import "./List.scss"
import classnames from "classnames";
import Badge from "../../components/Badge"

const List = ({items, isRemovable, click}) => {
  return(
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
            <span>{item.name}</span>
          </li>
          ))}
      </ul>
  )
}

export default List;