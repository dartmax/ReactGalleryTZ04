import {getCommentsAPI} from '../api/getPhoto-api';

let initialState = {};

const GET_IMAGES = 'GET_IMAGES';


const imagesReducer = (state = initialState, action) => {
  switch (action.type){
    case GET_IMAGES:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
};

export const actions = {
  getImagesUrl: (imagesUrl) => ({
    type: GET_IMAGES, payload: {imagesUrl}
  })
}

export default imagesReducer;