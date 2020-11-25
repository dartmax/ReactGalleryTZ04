import instance from './api';


export const getImagesAPI = {
  getImages(item) {
    return instance.get(`/${item}`).then(res => res.data);
  }
};

