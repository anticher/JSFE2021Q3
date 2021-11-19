import { startPageCreate } from './js/createPage'
import { createOrDeleteAudio, settingsDefaultsInit } from './js/settingsPage'




document.addEventListener('DOMContentLoaded', () => startPageCreate())


document.addEventListener('DOMContentLoaded', () => {
    settingsDefaultsInit('first')
    const main = document.querySelector('main')
    main.addEventListener('click', () => {
    createOrDeleteAudio('create')
    }, { once: true })
    
    // main.click()
})






// setTimeout(() => {
//     const main = document.querySelector('main')
//     main.innerHTML += `<audio id="player" autoplay>
//     <source src="assets/sounds/Ennio Morricone.mp3" type="audio/mp3">
//     </audio>`
// }, 1000)


{/* <audio id="player" autoplay loop>
    <source src="assets/sounds/Ennio Morricone.mp3" type="audio/mp3">
    </audio> */}