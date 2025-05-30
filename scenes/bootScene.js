export default class bootScene extends Phaser.Scene {
  constructor() {
    super('bootScene')
  }

  preload() {
    this.load.spritesheet('tiles', '../assets/oak_woods_tileset.png', {
      frameWidth: 16,
      frameHeight: 16
    })
    
    this.load.spritesheet('player', '../assets/char_blue.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }
  
  create() {
    this.scene.start('gameScene')
    
    this.cursors = this.input.keyboard.createCursorKeys()
    this.leftPressed = false
    this.rightPressed = false
    
    document.getElementById('btn-left').addEventListener('touchstart', () => {
      this.leftPressed = true
    })
    document.getElementById('btn-left').addEventListener('touchend', () => {
      this.leftPressed = false
    })
    document.getElementById('btn-right').addEventListener('touchstart', () => {
      this.rightPressed = true
    })
    document.getElementById('btn-right').addEventListener('touchend', () => {
      this.rightPressed = false
    })
  }
}
