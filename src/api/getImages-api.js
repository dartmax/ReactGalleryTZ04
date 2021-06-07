import {instance} from './api';


export const getImagesAPI = {
  getImage() {
    return instance.get(`/images/`).then(res => res.data);
  },
};

export const fetchTodo = (id = 1) =>{
  return fetch('https://jsonplaceholder.typicode.com/todos/' + id)
    .then(res => res.json())
    .then(json => json)
}
(async () => {
  for await (let res of [1, 14, 20].map(n => fetchTodo(n))) {
    console.log(res);
  }
})()