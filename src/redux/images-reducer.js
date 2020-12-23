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
        data: action.data,
      }
    default:
      return state;
  }
};

export const actions = {
  getImagesSuccess: (data) => ({
    type: GET_IMAGES,
    data
  })
}

export const getImagesUrl = (imageId) => async (dispatch) => {
  const data = await getImagesAPI.getImage(imageId);
  console.log("-> data", data);
  dispatch(actions.getImagesSuccess(data));
}

export default imagesReducer;