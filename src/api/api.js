import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://tzfrontend.herokuapp.com/',
});



// getImages(imageId) {
//     console.warn('Obsolete method. Please use imageAPI object')
//     return imageAPI.getImage(image_id);
// }

// export const image = (currentPage = 1, pageSize = 10) => {
// return instance.get(`images?page=${currentPage}&count=${pageSize}`,).then(response => {
//         return response.data;
//     });
// };