import React, {useRef, useState} from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import '../index.css';
import InsertContact from "./InsertContact";

const List = ({
  data,
  handleDelete,
  dataFilteredContacts,
  setContacts,
}) => {
  const uploadedImage = useRef(null);
  const [input, setInput] = useState([]);

  const handleAdd = (name, surName, num, description, img) => {
    if (name && surName && num && description && img) {
      setContacts(stateInit => {
        const newObj = {
          number: num,
          name: name,
          surName: surName,
          description: description,
          img: img,
        }
        const res = [...stateInit.contacts, newObj]
        return { contacts: res }
      })
    }
  }

  return (
    <>
    <ListGroup>
      {input.length === 0 ? data.contacts.length === 0 ? data.contacts.push({ title: 'List is empty :(', info: 'You may fill your contact by add' }).map(i => {
        console.log(data);
          return (<ListGroup.Item>
            <div className='title'>{i.title}</div>
            <div className='info'>{i.info}</div>
          </ListGroup.Item>)
        }
      ) : data.contacts.map((item, index) => {
        return (
          <ListGroup.Item key={index} className="listgroup">
            <img ref={uploadedImage} className="userimg" src={item.img} alt="user" style={{
              width: "100px",
              height: "100px"
            }}/>
            <div>{`${item.name} ${item.surName}: ${item.number}`}</div>
            <div>Description:</div>
            <div>{`${item.description}`}</div>
            <Button onClick={() => handleDelete(index)} variant="danger">Delete</Button>
          </ListGroup.Item>
        )
      }) : input.map((item, index) => {
        return (
          <ListGroup.Item key={index} className="listgroup max-width-50percent">
            <img ref={input} className="userimg" src={item.img} alt="user" style={{
              width: "100px",
              height: "100px"
              // position: "absolute"
            }}/>
            <div>{`${item.name} ${item.surName}: ${item.number}`}</div>
            <div>Description:</div>
            <div>{`${item.description}`}</div>
            <Button onClick={() => handleDelete(index)} variant="danger">Delete</Button>
          </ListGroup.Item>
        )
      })}
    </ListGroup>
    <div>
      <InsertContact className="insert-block" setInput={setInput} handleAdd={handleAdd} />
    </div>
    </>
)
}
debugger;
export default List;