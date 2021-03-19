import React, { useState } from 'react'

function ToDoForm({ addTask }) { // вытаскиеваем фукнцию
  const [userInput, setUserInput] = useState('') //состояние Input

  const handleChange = (e) => { //если значение будет менятся из полученого события мы будем получать значение и его отправлять в стейт (SynthetycEvent)
    console.log('handleChange e', e)
    console.log('handleChange e.currentTarget.value', e.currentTarget.value)

    setUserInput(e.currentTarget.value)
  }

  const handleSubmit = (e) => {  // получаем событие и также выполняем preventDefault
    console.log('handleSubmit e', e)
    console.log('handleSubmit userInput', userInput)
    e.preventDefault()
    addTask(userInput) // отпраляем текущее значение userInput нашего поля ввода
    setUserInput("") // обнуляем текущее значение инпута
  }

  const handleKeyPress = (e) => { // вызов нажатия клавишей (Enter) и ловим событие
    console.log('handleKeyPress e', e)
    if(e.key === "Enter") {
      handleSubmit(e) //вызываем функцию handleSubmit и передаем событие
      console.log('handleKeyPress handleSubmit', handleSubmit(e))

    }
  }

  return (
    <form onSubmit={handleSubmit}> {/*функция для обработчика*/}
      <input
        value={userInput} /*состояние из стейта*/
        type="text"
        onChange={handleChange} /*функция handleChange*/
        onKeyDown={handleKeyPress} /*функция handleKeyPress*/
        placeholder="My task..."
      />
      <button>Save</button>
    </form>
  )
}

export default ToDoForm
