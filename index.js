import bootScene from './scenes/bootScene.js'
import gameScene from './scenes/gameScene.js'

function checkOrientation() {
  const warning = document.getElementById('rotate-warning')
  const isPortrait = window.innerHeight > window.innerWidth
  warning.style.display = isPortrait ? 'flex' : 'none'
}

window.addEventListener('resize', checkOrientation)
window.addEventListener('orientationchange', checkOrientation)
window.addEventListener('load', checkOrientation)

window.addEventListener('resize', () => {
  location.reload()
})

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game',
  backgroundColor: '#1a1a1a',
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: false
    }
  },
  scene: [bootScene, gameScene]
}

const game = new Phaser.Game(config)