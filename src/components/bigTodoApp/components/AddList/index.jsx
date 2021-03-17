import React, {useEffect, useState} from "react";
import List from "../List";
import addSvg from "../../../../assets/img/add.svg";
import closeSvg from "../../../../assets/img/close.svg";
import "./AddListButton.scss"
import Badge from "../Badge";

import axios from "axios";

const AddListButton = ({colors, onAdd}) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectColor, setSelectColor] = useState(3);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  // const locale = window.location.origin;


  useEffect(() => {
    if(Array.isArray(colors)){
      setSelectColor(colors[0].id)
    }
  }, [colors])
  const onClose = () => {
    setInputValue('')
    setVisiblePopup(false)
    setSelectColor(colors[0].id)
  }

  // const uuidv4 = () => {
  //   const crypto = window.crypto || window.msCrrypto;
  //   return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => ( c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(10));
  // }
  // const listUrl = 'http://localhost:4003' + '/lists';
  const addList = () => {
    setIsLoading(true);
    // const setMainColor = colors.filter(color => color.id === selectColor)[0].name
    axios
      .post('http://localhost:4003/lists', {name: inputValue, colorId: selectColor})
      .then(({data}) => {
        const colorName = colors.filter(color => color.id === selectColor)[0].name
        const listObj = {...data, color: {name: colorName}}
        onAdd(listObj)
        onClose();
      }).catch((e) => {
        console.log(e);
    }).finally(() => {
      setIsLoading(false)
    })
  }

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
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
             src={closeSvg} alt="close"
             className="add-list__popup-close-btn"/>

        <input value={inputValue} onChange={e => setInputValue(e.target.value)} className="field" type="text" placeholder="Enter new list"/>

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
        <button onClick={addList} className="add-button">{isLoading ? 'Process...' : 'Add List'}</button>
      </div>
      )}
    </div>
  )
}

export default AddListButton;