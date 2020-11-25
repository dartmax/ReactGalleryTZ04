import instance from './api';


export const getImagesAPI = {
  getImage(item) {
    return instance.get(`static/${item}`).then(res => res.data);
  }
};

