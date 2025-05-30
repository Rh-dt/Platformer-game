export default class gameScene extends Phaser.Scene {
  constructor() {
    super('gameScene')
  }

  create() {
    const tileSize = 32
    const tilesPerRow = 512
    const screenWidth = this.sys.game.config.width
    const screenHeight = this.sys.game.config.height
    this.playerSpeed = 180
    this.jumpPower = -400

    // Aktifkan kontrol keyboard
    this.cursors = this.input.keyboard.createCursorKeys()

    // World & camera bounds
    this.physics.world.setBounds(0, 0, tileSize * tilesPerRow, screenHeight)
    this.cameras.main.setBounds(0, 0, tileSize * tilesPerRow, screenHeight)

    // Tile utama (pijakan)
    for (let x = 0; x <= tilesPerRow; x++) {
      this.add.image(x * tileSize, screenHeight - tileSize, 'tiles', 1)
        .setOrigin(0)
        .setScrollFactor(1)
        .setDepth(2)
    }

    // Tile ilusi latar belakang
    for (let x = 0; x <= tilesPerRow; x++) {
      this.add.image(x * tileSize, screenHeight - 42, 'tiles', 1)
        .setScrollFactor(1)
        .setDepth(0)
    }

    // Dekorasi (pohon & semak)
    const bushTreeFrames = [
      { x: 576, y: 864, w: 64, h: 48 },
      { x: 640, y: 864, w: 64, h: 48 },
      { x: 704, y: 864, w: 96, h: 96 },
      { x: 832, y: 864, w: 96, h: 96 }
    ]
    for (let i = 0; i < 12; i++) {
      const x = Phaser.Math.Between(2, tilesPerRow - 3) * tileSize
      const y = screenHeight - 63
      const frame = Phaser.Math.RND.pick(bushTreeFrames)
      const deco = this.add.image(x, y, 'props')
      deco.setCrop(frame.x, frame.y, frame.w, frame.h)
      deco.setOrigin(0.5, 1)
      deco.setScale(Phaser.Math.FloatBetween(1.1, 1.3))
      deco.setDepth(1)
    }

    // Animasi player
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'player', frame: 1 }],
      frameRate: 1
    })

    // Buat player
    this.player = this.physics.add.sprite(100, screenHeight - tileSize - 32, 'player')
    this.player.setScale(1.5)
    this.player.setCollideWorldBounds(true)
    this.player.setDepth(3)
    this.player.play('idle')

    // Kamera follow
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1)

    // Ground collider
    const ground = this.add.rectangle(
      (tilesPerRow * tileSize) / 2,
      screenHeight - tileSize / 2,
      tilesPerRow * tileSize,
      tileSize
    )
    this.physics.add.existing(ground, true)
    this.physics.add.collider(this.player, ground)

    // Variabel mobile control
    this.leftPressed = false
    this.rightPressed = false
    this.jumpPressed = false

    // Tombol mobile (langsung di DOM, tanpa delay)
    document.getElementById('btn-left')?.addEventListener('touchstart', () => this.leftPressed = true)
    document.getElementById('btn-left')?.addEventListener('touchend', () => this.leftPressed = false)

    document.getElementById('btn-right')?.addEventListener('touchstart', () => this.rightPressed = true)
    document.getElementById('btn-right')?.addEventListener('touchend', () => this.rightPressed = false)

    document.getElementById('btn-up')?.addEventListener('touchstart', () => this.jumpPressed = true)
    document.getElementById('btn-up')?.addEventListener('touchend', () => this.jumpPressed = false)
  }

  update() {
    const onGround = this.player.body.blocked.down
    const left = this.cursors.left.isDown || this.leftPressed
    const right = this.cursors.right.isDown || this.rightPressed
    const jump = (this.cursors.up.isDown || this.jumpPressed) && onGround

    if (left) {
      this.player.setVelocityX(-this.playerSpeed)
      this.player.flipX = true
      this.player.play('walk', true)
    } else if (right) {
      this.player.setVelocityX(this.playerSpeed)
      this.player.flipX = false
      this.player.play('walk', true)
    } else {
      this.player.setVelocityX(0)
      this.player.play('idle', true)
    }

    if (jump) {
      this.player.setVelocityY(this.jumpPower)
      this.jumpPressed = false
    }
  }
}
