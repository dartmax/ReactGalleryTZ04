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
        ...action.payload,
      }
    default:
      return state;
  }
};
debugger;
export const actions = {
  getImagesSuccess: (imagesUrl) => ({
    type: GET_IMAGES, payload: imagesUrl
  })
}

export const getImagesUrl = (file) => async (dispatch) => {
  dispatch(actions.getImagesSuccess(file));
  const data = await getImagesAPI.getImages(file);
  const imagesUrl = data.item;
  dispatch(actions.getImagesSuccess(imagesUrl))
}
console.log("-> getImagesUrl", getImagesUrl());
debugger;
export default imagesReducer;