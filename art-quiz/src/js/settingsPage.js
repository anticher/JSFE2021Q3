import { loadStart } from './loadPage'

let MusicAudioElement = new Audio()


export function createSettingsPageLanding() {
    return (
        `
      <div class="settings_page">
  <div class="top">
      <div class="header">
          Settings
      </div>
  </div>
  <div class="middle">

  <div class="item">
  <div class="item_row">
          <div class="item_header font30 font700">Change language</div>
          <div class="item_right">
          <span>русский</span>
          <div class="check">
              <input id="checkLang" type="checkbox" name="check">
              <label for="checkLang"></label>
          </div>
          <span>english</span>
          </div>
        </div>
  <div class="item_row">
          <div class="item_header font30 font700">Sounds volume</div>
          <div class="item_right">
          <div class="check">
              <input id="checkSound" type="checkbox" name="check">
              <label for="checkSound"></label>
          </div>
          <span>0</span>
          <input class="sound_bar" type="range" name="sound_range">
          <span>100</span>
          </div>
        </div>
      <div class="item_row">
          <div class="item_header font30 font700">Music volume</div>
          <div class="item_right">
          <div class="check">
              <input id="checkMusic" type="checkbox" name="check">
              <label for="checkMusic"></label>
          </div>
          <span>0</span>
          <input class="music_bar" type="range" name="music_range">
          <span>100</span>
          </div>
        </div>
          <div class="item_row">
          
              <div class="item_header font30 font700">Time game</div>
              <div class="item_right">
              <div class="check">
                  <input id="checkTime" type="checkbox" name="check">
                  <label for="checkTime"></label>
              </div>
              <span>5</span>
              <input class="time_bar" type="range" name="timer_range" min="5" max="30" step="5">
              <span>30</span>
              </div>
          </div>
      </div>



  </div>

  
  
  
  

  
  <div class="bottom">
      <button class="back_button button button_center">
          Back
      </button>
      <button class="defaults_button button button_center">
          Defaults
      </button>
  </div>
  </div>
      `
    )
}


export function settingsCreateActions() {
    const saveButton = document.querySelector('.back_button')
    const DefaultsButton = document.querySelector('.defaults_button')
    saveButton.addEventListener('click', () => {
        loadStart()
    })
    DefaultsButton.addEventListener('click', () => {
        settingsDefaultsInit()
    })

    const checkMusicElement = document.querySelector('#checkMusic')
    if (localStorage.getItem('isMusic') === 'true') {
        checkMusicElement.checked = true
    } else {
        checkMusicElement.checked = false
    }

    const checkSoundElement = document.querySelector('#checkSound')
    if (localStorage.getItem('isSound') === 'true') {
        checkSoundElement.checked = true
    } else {
        checkSoundElement.checked = false
    }

    const checkTimeElement = document.querySelector('#checkTime')
    if (localStorage.getItem('timeGame') === 'true') {
        checkTimeElement.checked = true
    } else {
        checkTimeElement.checked = false
    }

    const musicBarElement = document.querySelector('.music_bar')
    const soundBarElement = document.querySelector('.sound_bar')
    const timeBarElement = document.querySelector('.time_bar')

    checkMusicElement.addEventListener('click', () => {
        musicOnOff(checkMusicElement)
        ableDisableSoundMusicBar(checkMusicElement, musicBarElement)

    })
    checkSoundElement.addEventListener('click', () => {
        soundOnOff(checkSoundElement)
        ableDisableSoundMusicBar(checkSoundElement, soundBarElement)

    })
    checkTimeElement.addEventListener('click', () => {
        timeOnOff(checkTimeElement)
        ableDisableSoundMusicBar(checkTimeElement, timeBarElement)
    })
    ableDisableSoundMusicBar(checkMusicElement, musicBarElement)
    ableDisableSoundMusicBar(checkSoundElement, soundBarElement)
    ableDisableSoundMusicBar(checkTimeElement, timeBarElement)
    createSoundMusicTimeBarActions(musicBarElement, soundBarElement, timeBarElement)


}


function ableDisableSoundMusicBar(check, bar) {
    if (check.checked) {
        bar.disabled = false
    } else {
        bar.disabled = true
    }
}

function createSoundMusicTimeBarActions(musicBarElement, soundBarElement, timeBarElement) {



    musicBarElement.value = +localStorage.getItem('musicVolume') * 100
    musicBarElement.addEventListener('change', onMusicVolumeChanged)

    soundBarElement.value = +localStorage.getItem('soundVolume') * 100
    soundBarElement.addEventListener('change', onSoundVolumeChanged)

    timeBarElement.value = +localStorage.getItem('timeSpeed') * 100
    timeBarElement.addEventListener('change', onTimeSpeedChanged)
}


function musicOnOff(checkMusicElement) {
    if (checkMusicElement.checked) {
        localStorage.setItem('isMusic', 'true')
        createOrDeleteAudio()

    } else {
        localStorage.setItem('isMusic', 'false')
        createOrDeleteAudio()
    }
}


function soundOnOff(checkSoundElement) {
    if (checkSoundElement.checked) {
        localStorage.setItem('isSound', 'true')
    } else {
        localStorage.setItem('isSound', 'false')
    }
}


function timeOnOff(checkTimeElement) {
    if (checkTimeElement.checked) {
        localStorage.setItem('timeGame', 'true')
    } else {
        localStorage.setItem('timeGame', 'false')
    }
}




export function createOrDeleteAudio() {
    if (localStorage.getItem('isMusic') === 'true') {
        MusicAudioElement = new Audio()
        MusicAudioElement.src = '../assets/sounds/River Flows In You.mp3'
        MusicAudioElement.currentTime = 0
        MusicAudioElement.volume = +localStorage.getItem('musicVolume')
        MusicAudioElement.play()
    } else {
        MusicAudioElement.pause()
    }
}


function onMusicVolumeChanged() {
    const value = this.value
    MusicAudioElement.volume = value / 100
    localStorage.setItem('musicVolume', MusicAudioElement.volume)
}

function onSoundVolumeChanged() {
    const value = this.value
    const volume = value / 100
    localStorage.setItem('soundVolume', volume)
    const audio = new Audio()
    audio.src = '../assets/sounds/click.mp3'
    audio.volume = localStorage.getItem('soundVolume')
    audio.play()
}

function onTimeSpeedChanged() {
    const value = this.value
    // value = value / 100
    localStorage.setItem('timeSpeed', value)
}


export function settingsDefaultsInit(how) {
    if (how === 'first') {
        if (!localStorage.getItem('isSound')) {
            localStorage.setItem('isSound', true)
            localStorage.setItem('soundVolume', 0.5)
        }
        if (!localStorage.getItem('isMusic')) {
            localStorage.setItem('isMusic', true)
            localStorage.setItem('musicVolume', 0.5)
        }
        if (!localStorage.getItem('timeGame')) {
            localStorage.setItem('timeGame', true)
            localStorage.setItem('timeSpeed', 30)
        }
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'en')
        }
    } else {
        localStorage.setItem('isSound', true)
        localStorage.setItem('soundVolume', 0.5)
        localStorage.setItem('isMusic', true)
        localStorage.setItem('musicVolume', 0.5)
        localStorage.setItem('timeGame', true)
        localStorage.setItem('timeSpeed', 30)
        localStorage.setItem('lang', 'en')
        settingsCreateActions()
        createOrDeleteAudio()
    }
}