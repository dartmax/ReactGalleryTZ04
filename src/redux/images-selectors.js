import {createSelector} from "reselect";

const getImagesSelector = (state) => {
  return state.galleryPage.data;
}

export const getImages = createSelector(getImagesSelector,
(images) => {
  return images.filter(i => true);
})

const getListSelector = (state) => {
  return state.articlesReducer.data;
}

export const getArticleFormState = createSelector(getListSelector,
(list) => {
  return list.filter(i => true);
})

