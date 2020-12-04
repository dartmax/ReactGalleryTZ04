import instance from './api';


export const getImagesAPI = {
  getImage() {
    return instance.get(`/images/`).then(res => res.data);
  },
};
