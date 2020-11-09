import {createSelector} from "reselect";

const getImagesSelector = (state) => {
  return state.imagesReducer.images;
}

export const getUsers = createSelector(getImagesSelector,
  (images) => {
    return images.filter(i => true);
  })

