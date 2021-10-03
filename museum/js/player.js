const progress = document.querySelector('#progressBar');
const volume = document.querySelector('#volumeBar');
const bigPlayBtn = document.querySelector('.video__big-play');
const playPauseBtn = document.querySelector('#playPauseBtn')
const mute = document.querySelector('#mute')
const muteAdaptive = document.querySelector('#muteAdaptive')
const fullScreenBtn = document.querySelector('#fullScreen')
const player = document.querySelector('#player')
const playerContainer = document.querySelector('.video__player')
const playerControls = document.querySelector('.video__controls')

document.addEventListener('keydown', function(event) {
  if (event.key === ' ') {
    handlePlayButton()
  } else if (event.key === 'm' || event.key === 'M') {
    onMuteClick()
  } else if (event.key === 'f' || event.key === 'F') {
    toggleFullscreen()
  } else if (event.shiftKey && event.key == ',' || event.key == '<') {
    console.log(player.playbackRate)
  } else if (event.shiftKey && event.key == '.' || event.key == '>') {
    player.playbackRate -= 0.5
  }
})


//progress
progress.value = 54
progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progress.value}%, #C4C4C4 ${progress.value}%, #C4C4C4 100%)`

player.ontimeupdate = () => {
  if (player.duration === player.currentTime) {
    player.pause();
    playPauseBtn.classList.remove('playing');
    bigPlayBtn.classList.add('video__big-play-active')
  }
  progress.value = 100 / player.duration * player.currentTime
  progress.style.background = `linear-gradient(to right, #710707, #710707 ${progress.value}%, #C4C4C4 ${progress.value}%, #C4C4C4 100%)`
}

progress.addEventListener('input', function () {
  const value = this.value;
  player.currentTime = value / (100 / player.duration)
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`

})

//mute
let muteValue = 0

function onMuteClick() {
  if (mute.classList.contains('muted')) {
    mute.classList.remove('muted')
    volume.value = muteValue
    volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${muteValue}%, #C4C4C4 ${muteValue}%, #C4C4C4 100%)`
    player.volume = muteValue / 100
  } else {
    mute.classList.add('muted')
    muteValue = volume.value
    volume.value = 0
    volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volume.value}%, #C4C4C4 ${volume.value}%, #C4C4C4 100%)`
    player.volume = 0
  }
}


mute.addEventListener('click', onMuteClick)

muteAdaptive.addEventListener('click', onMuteClick)


//volume
player.volume = volume.value / 100
// player.addEventListener('change', function() {
//     volume.value = player.volume * 100
// })

function onVolumeChanged() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
  player.volume = value / 100
  muteValue = value
  if (value > 0) {
    mute.classList.remove('muted')
  } else {
    mute.classList.add('muted')
  }
}

volume.addEventListener('input', onVolumeChanged)


//playPause
playPauseBtn.addEventListener("click", handlePlayButton);


player.addEventListener('click', handlePlayButton)

bigPlayBtn.addEventListener('click', handlePlayButton)

async function playVideo() {
  try {
    await player.play();
    playPauseBtn.classList.add('playing');
    bigPlayBtn.classList.remove('video__big-play-active')

  } catch (err) {
    playPauseBtn.classList.remove('playing');
    bigPlayBtn.classList.add('video__big-play-active')
  }
}

function handlePlayButton() {
  if (player.paused) {
    playVideo();
  } else {
    player.pause();
    playPauseBtn.classList.remove('playing');
    bigPlayBtn.classList.add('video__big-play-active')
  }
}

//fullScreen

fullScreenBtn.addEventListener('click', toggleFullscreen)

function toggleFullscreen() {
  if (document.fullscreen) {
    document.exitFullscreen();
    playerControls.classList.remove('video__controls-absolute')
    fullScreenBtn.classList.remove('video__full-screen-active')
  } else {
    playerControls.classList.add('video__controls-absolute')
    fullScreenBtn.classList.add('video__full-screen-active')
    if (playerContainer.requestFullscreen) {
      playerContainer.requestFullscreen()
    } else if (playerContainer.mozRequestFullScreen) {
      playerContainer.mozRequestFullScreen()
    } else if (playerContainer.webkitRequestFullscreen) {
      playerContainer.webkitRequestFullscreen()
    }
  }
}
