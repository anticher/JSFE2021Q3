export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let t = array[i]; array[i] = array[j]; array[j] = t
  }
  return array
}

export function getRandomAnswerNumber() {
  let min = Math.ceil(0)
  let max = Math.floor(240)
  return Math.floor(Math.random() * (max - min)) + min
}