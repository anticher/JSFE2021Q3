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
