import {getImagesAPI} from '../api/getImages-api';

let initialState = {
  images: []
};

const GET_IMAGES = 'GET_IMAGES';


const imagesReducer = (state = initialState, action) => {
  switch (action.type){
    case GET_IMAGES:
      return {
        ...state,
        payload: action.data
      }
    default:
      return state;
  }
};

export const actions = {
  getImagesSuccess: (data) => ({
    type: GET_IMAGES, data
  })
}

export const getImagesUrl = (data) => async (dispatch, getState) => {
  const data = await getImagesAPI.getImage(data);
  dispatch(actions.getImagesSuccess(data));
}
console.log("-> getImagesUrl", getImagesUrl());

export default imagesReducer;