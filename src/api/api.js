import axios from "axios";

 const instance = axios.create({
  baseURL: 'https://tzfrontend.herokuapp.com',
  headers: {
   "Content-type": "application/json"
  }
});

export default instance;

// getImages(imageId) {
//     console.warn('Obsolete method. Please use imageAPI object')
//     return imageAPI.getImage(image_id);
// }

// export const image = (currentPage = 1, pageSize = 10) => {
// return instance.get(`images?page=${currentPage}&count=${pageSize}`,).then(response => {
//         return response.data;
//     });
// };