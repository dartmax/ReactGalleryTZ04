import instance from './api';


export const getImagesAPI = {
  getImage(data) {
    return instance.get(`images/` + data).then(res => res.data);
  }
};
