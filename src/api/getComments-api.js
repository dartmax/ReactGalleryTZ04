import {instance} from './api';


export const getImagesAPI = {
  getImages() {
    return instance.get(`images/`).then(res => res.data);
  }
};