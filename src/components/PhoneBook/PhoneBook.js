import React, {useState} from 'react';

import List from './Components/List.js';
import NavigationBar from './Components/NavigationBar.js';
import './index.css';
import defImg from './source/userImages.png';
import {FormControl} from "react-bootstrap";



const PhoneBook = () => {
  let list = { // Main idea refactoring this state like a { display: [something information for list display] contacts: [], filteredContacts: [] }
    contacts: [
      {
        number: 89771337004,
        name: "Jack",
        surName: "Gardner",
        img: defImg,
        description: "Hello, it's Jack"
      },
      {
        number: 89165341923,
        name: "Anna",
        surName: "Vattriano",
        img: defImg,
        description: "Best regards!"
      },
      {
        number: 89534425392,
        name: "Leslie",
        surName: "Gal",
        img: defImg,
        description: "Corona!"
      }
    ],
    filteredContacts: ''
  }
  let [contacts , setContacts] = useState(list)
  let dataFilteredContacts = [];

  const handleSearch = (contacts, searchTerm) => { // Need Refactoring!!! (Very Bad logic (Forgot memory))
    console.log('searchTerm', searchTerm)
    console.log('contacts', contacts)
    if (contacts && searchTerm) {
      return setContacts(dataFilteredContacts = contacts.slice(0).filter(contact => contact.name.includes(searchTerm)) )
    } else {
      return setContacts(dataFilteredContacts = [])
    }
  }


  const handleDelete = (id) => {
    setContacts(prevList => {
      console.log('prevList', prevList)
      const res = prevList.contacts.filter((e, i) => i !== id)
      return {contacts: res}
    })
  }


debugger;
  return (
    <div className="width-100percent">
      <NavigationBar data={contacts} handleSearch={handleSearch} />
      <div className="app-wrapper">
        <List className="width-100percent" dataFilteredContacts={dataFilteredContacts} handleDelete={handleDelete} data={contacts} setContacts={setContacts}/>
      </div>
    </div>
  )
}

export default PhoneBook;