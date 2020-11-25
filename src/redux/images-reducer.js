import {getImagesAPI} from '../api/getImages-api';

let initialState = {};

const GET_IMAGES = 'GET_IMAGES';


const imagesReducer = (state = initialState, action) => {
  switch (action.type){
    case GET_IMAGES:
      return {
        ...state,
        images: action.item,
      }
    default:
      return state;
  }
};

export const actions = {
  getImagesSuccess: (imagesUrl) => ({
    type: GET_IMAGES, payload: {imagesUrl}
  })
}

export const getImagesUrl = () => async (dispatch) => {
  const data = await getImagesAPI.getImages();
  const imagesUrl = data.item;
  dispatch(actions.getImagesSuccess(imagesUrl))
}
console.log("-> getImagesUrl", getImagesUrl());

export default imagesReducer;