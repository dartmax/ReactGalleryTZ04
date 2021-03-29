import React, {useCallback, useEffect} from "react";
import './App.css';
import {BrowserRouter, Route, Switch, withRouter, Redirect, NavLink} from "react-router-dom";
import {connect, Provider} from "react-redux";
import store from "./redux/redux-store";
import Preloader from "./Common/Preloader";
import {compose} from "redux";
import GalleryAppComponent from "./components/GalerryApp"
import {initializeApp} from "./redux/app-reducer";
import ReduceProvider from "./state/reduceProvider";
import providers from "./state/providers";
import ClockCenter from "./components/ClockCenter";
import ToDoList from "./components/bigTodoApp/ToDo";
import ImageDog from "./components/ImageDog";
import SmallTodo from "./components/ToDo/smallTodo";
import PhoneBook from "./components/PhoneBook/PhoneBook";
import {Tasks} from "./components/bigTodoApp/components";
import {Link} from "@material-ui/core";
import Game from "./components/Game2048/Game";


const App = (props) => {
  const catchAllUnhandledErrors = useCallback((e) => {
    alert(`promiseRejectionEvent or add local SQL base, ${e}`)
  }, [])

  useEffect(() => {
    props.initializeApp();
  }, [props])

  useEffect(() => {
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors);
  }, [catchAllUnhandledErrors])


  if (!props.initialized) {
    return <Preloader/>
  }
  return (
    <div className="App">
      <div className="App-header">
        <nav>
          <div className="App-menu">
            <div style={{padding: '10px'}}>
              <NavLink to="/gallery">
                Gallery
              </NavLink>
            </div>
            <div style={{padding: '10px'}}>
              <NavLink to="/clock">
                Clock
              </NavLink>
            </div>
            <div style={{padding: '10px'}}>
              <NavLink to="/todo">
                ToDoList
              </NavLink>
            </div>
            <div style={{padding: '10px'}}>
              <NavLink to="/image-with-dog">
                Pet Photo
              </NavLink>
            </div>
            <div style={{padding: '10px'}}>
              <NavLink to="/phonebook">
                Phone Book
              </NavLink>
            </div>
            <div style={{padding: '10px'}}>
              <NavLink to="/smallTodo">
                Small Todo
              </NavLink>
            </div>
            <div style={{padding: '10px'}}>
              <NavLink to="/game2048">
                Game2048
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
        <Switch>
          <Route exact path='/' render={() => <Redirect to={"/game2048"}/>}/>
          <Route path='/gallery' render={() => <GalleryAppComponent props={props}/>}/>
          <Route path='/clock' render={() => <ClockCenter props={props}/>}/>
          <Route path='/todo' render={() => <ToDoList props={props}/>}/>
          <Route path='/image-with-dog' render={() => <ImageDog props={props}/>}/>
          <Route path='/phonebook' render={() => <PhoneBook props={props}/>}/>
          <Route path='/smallTodo' render={() => <SmallTodo props={props}/>}/>
          <Route path='/game2048' render={() => <Game props={props}/>}/>
          <Route path='*' render={() => <ToDoList props={props}/>}/>
        </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  initialized: state.appState.initialized
})


let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);


const GalleryApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ReduceProvider providers={providers}>
          <AppContainer/>
        </ReduceProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default GalleryApp;