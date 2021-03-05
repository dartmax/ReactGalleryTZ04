import React, { useRef } from 'react';
import { Navbar, Form, FormControl } from 'react-bootstrap';
import '../index.css';

const NavigationBar = ({handleSearch, data}) => {
  const searchLine = useRef();

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/">PhoneBook</Navbar.Brand>
      <Form inline>
        <FormControl ref={searchLine} type="text" placeholder="search" onChange={() => handleSearch(data, searchLine.current.value)} />
      </Form>
    </Navbar>
  )
}

export default NavigationBar;