import instance from './api';


export const getImagesAPI = {
  getImage(data) {
    return instance.get(`/static`, data).then(res => res.data);
  }
};
