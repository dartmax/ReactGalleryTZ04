import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://tzfrontend.herokuapp.com/docs/',
});



//выпелено из users-api.ts
// getProfile(userId: number) {
//     console.warn('Obsolete method. Please use profileAPI object')
//     return profileAPI.getProfile(userId);
// }

// export const getUsers2 = (currentPage = 1, pageSize = 10) => {
// return instance.get(`users?page=${currentPage}&count=${pageSize}`,).then(response => {
//         return response.data;
//     });
// };