import { startPageCreate } from './js/createPage'
import { createOrDeleteAudio, settingsDefaultsInit } from './js/settingsPage'




document.addEventListener('DOMContentLoaded', () => startPageCreate())


document.addEventListener('DOMContentLoaded', () => {
  settingsDefaultsInit('first')
  const main = document.querySelector('main')
  main.addEventListener('click', () => {
    createOrDeleteAudio('create')
  }, { once: true })
})

console.log(`
  Самооценка 210
  Доп. функционал: 
  -Приложение на двух языках
  -Музыка в фоне(после первого клика по приложению)
  -Дважды по ходу игры можно остановить таймер нажатием на него.

  Не сделано: сложные анимации
`)
