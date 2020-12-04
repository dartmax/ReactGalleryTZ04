import {getImagesUrl} from './images-reducer';

let initialState = {
  initialized: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type){
    case 'INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};


export const actions = {
  initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'}),
}


export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getImagesUrl());
  Promise.all([promise])
    .then(() =>{
      dispatch(actions.initializedSuccess());
    })
}

export default appReducer;