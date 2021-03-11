import React, {useState} from "react";
import List from "../List";
import addSvg from "../../../../assets/img/add.svg";
import closeSvg from "../../../../assets/img/close.svg";
import "./AddListButton.scss"
import Badge from "../Badge";

const AddListButton = ({colors}) => {
const [visiblePopup, setVisiblePopup] = useState(false);
const [selectColor, setSelectColor] = useState(colors[0].id);

return (
  <div className="add-list">
    <List
      click={()=> setVisiblePopup(true)}
      items={[
      {
        className: "list__add-button",
        icon: (
          <img src={addSvg} alt="Index icon" />
        ),
        name: "Add List"
      }
    ]}/>
    {visiblePopup && (<div className="add-list__popup">
        <img onClick={() => setVisiblePopup(false)} src={closeSvg} alt="close" className="add-list__popup-close-btn"/>
      <input className="field" type="text" placeholder="Enter new list"/>
      <div className="add-list__popup-colors">
      {colors.map(color => (
        <>
          <Badge
            onClick={() => setSelectColor(color.id)}
            key={color.id}
            color={color.name}
            className={selectColor === color.id && 'active'}
          />
        </>
      ))}
      </div>
      <button className="add-button">Add List</button>
    </div>
    )}
  </div>
)
}

export default AddListButton;