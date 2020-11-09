import React from "react";
import './App.css';
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import store from "./redux/redux-store";
import Preloader from "./Common/Preloader";
import {compose} from "redux";
import GalleryAppComponent from "./components/GalerryApp"

const App = (props) => {
  if (!props.initialized) {
    return <Preloader/>
  }
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path='/' render={() => <GalleryAppComponent/>}/>
        </Switch>
      </header>
    </div>
  );
}
const mapStateToProps = (state) => ({
  initialized: state.galleryPage.initialized
})

let AppContainer = compose(
  withRouter,
    connect(mapStateToProps, {}))(App);


const GalleryApp = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  </BrowserRouter>
}

export default GalleryApp;