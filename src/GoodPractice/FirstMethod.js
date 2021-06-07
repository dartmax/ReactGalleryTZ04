import axios from "axios";

const users = [{id: 1, name: 'Max'}, {id: 2, name: 'Jack'}]
const getUserName = (user) => {
  return user.name;
};

const getUserIds = () => {
  return users.map(user => user.id);
}

const removeUserById = (userId) => {
  return users.filter(user => user.id !== userId);
}

const getUser = (userId) => {
  const user = users.find(user => user.id === userId)
  //wrong pratice
  updateUser({...user, name: 'some name'});
  return user;
}

const user = {
  name: 'Garry',
  age: 23
}

setProperty = (name, value) => { // wrong name
  if(!user[name]){
    return false;
  }
  user[name] = value;
  return true;
}

if (setProperty("age", 27)) {
  //some code
}
// НАСТРОЙКА ИМЕНОВАНИЯ ФУНКЦИИ
/**
* @p 1 // action(set, get, init, remove, update) // определяет действие
* @p 2 //+ entity(user, machine, group, team) // определяет тип сущьности в функциональности
* @p 3  //+ ?entityProps(name, description, state)// необязательное часть - что хотим сделать
* @p 4 //+ ...to...?where(state, store) // необязательное часть - Куда/что определяется эта фукнкция
**/
//2. Уровень абстракции и тело функции

const state = {
  user: {
    name: 'Max',
    age: 24,
    address: {
      street: 'Some street 44, app 2'
    }
  }
}
// 1
// -------------- правильное определение функций --------------
const getIsValid = () => {
  return user.age > 18 && user.address.street;
}

const getRequestData = () => { //делаем мэпинг чтобы отправить данные на бек.
  return {
    name: user.name,
    age: user.age,
    streetName: user.address.street,
  }
}

const registerUser = () => {
  if (!getIsValid()){
    throw new Error('User has invalid password')
  }
  axios.post('/signUp', getRequestData()) // отправляет данные на бек
}

// -------------- не верное определение функции --------------
const registerUser = () => {
  const {user} = state;
  const isValid = user.age > 18 && user.address.street; // валидация данных (нужно выделить в другую функцию)
    if (!isValid){
      throw new Error('User has invalid password')
    }
    const requestData = { // выделить эти данные в отдельную функцию
      name: user.name,
      age: user.age,
      streetName: user.address.street,
    }
    axios.post('/signUp', requestData) // отправляет данные на бек
}


//-----------------------------------

const signUpUser = (userId) => { // вложенные проверки... плохой код
  if(userId){
    const user = getUserById(userId)
    //some code with user
    if(user.age > 18){
      if('true'){
        //some code
        axios.post('/signUp')
      }
    }
  }
}

const signUpUser = (userId) => {
  if (!userId){ // если нет userId выходим из функции
    return;
  }
  const user = getUserById(userId)
  if(user.age > 18) {
    return;
  }
  axios.post('/signUp') // регистрация юзера
}

const getUserProfiledata = (user) => {
  if(!user.isSignedIn){
    return;
  }
}


//-----------------------------
//3. Pure Function
// сайд эффекты - вносит изменения в глобальные переменные
const double = (x) => x*2; //чистая

const getFullName = (user) => { // чистая
  return `${user.firstName} + ${user.lastName}`
}

const globalAddress = {
  email: 'some@admin.com',
  firstAddress: 'street 45'
}

const getFullAddress = (address) => { // не чистая фукнция которая вносит в firstAddress совсем не то что мы ожидаем от нее в названии
  if (!globalAddress.firstAddress){
    globalAddress.firstAddress = 'some defaul street';
  }
  return `${address.name} ${globalAddress.firstAddress}`;
}

//-----------------------------
//4. Не передавай больше двух параметров, либо передавай обьект

const showErrorMessage = () => 'Error Message'; //!!!!!ноль-арнаяфункция

const square = (a) => a*a;//!!!!!унарная функция

const showMessage = (name, age) => { // !!!!!бинарная функция
  alert(`User ${name} is ${age} yers old`)
}
const showMessageTwo = ({name, age}) => { // не перепутаю очередность элементов
  alert(`User ${name} is ${age} yers old`)
}
console.log(showMessageTwo({age: 18, name: 'Jack'})); // не важен порядок
//-----------------------------
//4. Не передавай флаги в качестве аргументов

const sendUserData = (user, isValid) => {
  if (isValid) {
    axios.post('./send')
  }else {
    alert('Invalid data')
  }
}

//-----------------------inheritance OOP

class Foo {
  constructor() {
    this.id = 'foo'; // this контекст равен контексту класса Bar
    this.print(); // this.print - вызывает print класса Bar  /////// 1
  }
  print(){
    console.log('foo ' + this.id) // 3 "foo bar"
  }
}

class Bar extends Foo {
  constructor() {
    super(); // вызывает Foo constructor
    this.id = 'bar';
    this.print();/////// 3
    super.print(); // явно вызываем метод у класса Foo /////// 2
  }
  print(){
    console.log('bar ' + this.id) // - 1 "bar foo" 2 "bar bar"
  }
}

new Bar();