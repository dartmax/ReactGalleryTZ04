import React, {useState} from "react";
import List from "../List";
import addSvg from "../../../../assets/img/add.svg";
import "./AddListButton.scss"

const AddListButton = () => {
const [visiblePopup, setVisiblePopup] = useState(true);

return(
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
    {visiblePopup && <div className="add-list__popup">
      <input className="field" type="text" placeholder="Enter new list"/>
      <button className="add-button">Add List</button>
    </div>}
  </div>
)
}

export default AddListButton;