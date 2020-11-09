import {getImagesAPI} from '../api/getImages-api';

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
  getImagesSuccess: (imagesUrl) => ({
    type: GET_IMAGES, payload: {imagesUrl}
  })
}

export const getImagesUrl = () => async (dispatch) => {
  const data = await getImagesAPI.getImages();
  const imagesUrl = data.url;
  dispatch(actions.getImagesSuccess(imagesUrl))
}


export default imagesReducer;