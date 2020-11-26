import {createSelector} from "reselect";

const getImagesSelector = (state) => {
  return state.galleryPage.items;
}

export const getImages = createSelector(getImagesSelector,
  (images) => {
    return images.filter(i => true);
  })

debugger;