const progress = document.querySelector('#progressBar');
const volume = document.querySelector('#volumeBar');
const playPauseBtn = document.querySelector('#playPauseBtn')
const mute = document.querySelector('#mute')
const fullScreen = document.querySelector('#fullScreen')
const player = document.querySelector('#player')

//progress
progress.value = 54
progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progress.value}%, #C4C4C4 ${progress.value}%, #C4C4C4 100%)`

player.ontimeupdate = () => {
    console.log(player.currentTime)
    progress.value = 100 / player.duration * player.currentTime
    progress.style.background = `linear-gradient(to right, #710707, #710707 ${progress.value}%, #C4C4C4 ${progress.value}%, #C4C4C4 100%)`
}

progress.addEventListener('input', function() {
    const value = this.value;
    player.currentTime = value / (100 / player.duration)
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`

})

//mute
mute.value = 1

mute.addEventListener('click', function() {
    if (this.classList.contains('muted')) {
        this.classList.remove('muted')
        player.volume = mute.value
    } else {
        this.classList.add('muted')
        mute.value = player.volume
        player.volume = 0
    }
})


//volume
player.volume = volume.value / 100
// player.volume.addEventListener('change', function() {
//     volume.value = player.volume * 100
// })

volume.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
    player.volume = value / 100
    mute.value = player.volume
    mute.classList.remove('muted')
})


//playPause
playPauseBtn.addEventListener("click", handlePlayButton, false);
playVideo();

async function playVideo() {
  try {
    await player.play();
    playPauseBtn.classList.add("playing");
  } catch(err) {
    playPauseBtn.classList.remove("playing");
  }
}

function handlePlayButton() {
  if (player.paused) {
    playVideo();
  } else {
    player.pause();
    playPauseBtn.classList.remove("playing");
  }
}

//fullScreen

fullScreen.addEventListener('click', toggleFullscreen)

function toggleFullscreen() {
  
    if (!document.fullscreenElement) {
      player.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }

