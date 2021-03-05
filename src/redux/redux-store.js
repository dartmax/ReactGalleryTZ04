import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'

import imagesReducer from './images-reducer';
import appReducer from "./app-reducer";
import {reducerImageDog} from "./imgdog-reducer";

let rootReducers = combineReducers({
  galleryPage: imagesReducer,
  form: formReducer,
  appState: appReducer,
  reducerImageDog: reducerImageDog,
});


const composeEnhancers = window.__REDUX_DEWTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducers, {},composeEnhancers(applyMiddleware(thunkMiddleware)));


window.__state__ = store
export default store