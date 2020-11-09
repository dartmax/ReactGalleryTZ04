import {instance} from './api';


export const getCommentsAPI = {
  getComments() {
    return instance.get(`comments/`).then(res => res.data);
  }
};