AdventureGame.Game = function(game) {
  this.platforms;
  this.player;
  this.crate;
  this.cursors;

  this.guardian;
  this.castle;
  this.mysticEgg;
};

AdventureGame.Game.prototype = {
  create: function() {
    this.stage.backgroundColor = '#2AE';

    this.physics.startSystem(Phaser.Physics.ARCADE);
    platforms = this.add.group();
    platforms.enableBody = true;

    island = platforms.create(this.world.centerX-150, this.world.centerY, 'island');
    island.body.immovable = true;
    island = platforms.create(this.world.centerX+50, this.world.centerY-30, 'island');
    island.body.immovable = true;
    island = platforms.create(this.world.centerX-300, this.world.centerY+200, 'island');
    island.body.immovable = true;

    player = this.add.sprite(this.world.centerX-80, this.world.centerY-50, 'dude');
    this.physics.arcade.enable(player);
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = false;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    crate = this.add.sprite(this.world.centerX+125, this.world.centerY-150, 'crate');
    this.physics.arcade.enable(crate);
    crate.body.gravity.y = 800;
    crate.body.collideWorldBounds = false;
    crate.scale.setTo(0.8, 0.8);

    this.guardian = this.add.sprite(this.world.centerX-212, this.world.centerY + 164, 'dansheet');
    this.guardian.scale.setTo(2);
    this.guardian.animations.add('walk', [1, 2], 4, true);
    this.guardian.animations.play('walk');
    this.guardian.anchor.setTo(0.5, 0);
    this.physics.arcade.enable(this.guardian);
    this.guardian.body.gravity.y = 600;
    // warning: ECMAScript 6 arrow syntax not supported in all browsers! keep note!
    this.guardian.update = () => {
      this.guardian.scale.x = (player.x < this.guardian.x) ? -2 : 2;
      if (this.guardian.eggViolated && this.guardian.body.touching.down) { this.guardian.body.velocity.y = -225; } };

    this.castle = this.add.tileSprite(this.world.centerX-300, this.world.centerY + 72, 64, 64, 'dansheet', 3);
    this.castle.scale.setTo(2);
    this.world.sendToBack(this.castle);

    {
      var newBlock = this.add.sprite(this.world.centerX-300, this.world.centerY + 72 + 96, 'dansheet', 7);
      newBlock.scale.setTo(2);
      this.physics.arcade.enable(newBlock);
      newBlock.body.immovable = true;
      platforms.add(newBlock);
      newBlock = this.add.sprite(this.world.centerX-300 + 32, this.world.centerY + 72 + 96, 'dansheet', 7);
      newBlock.scale.setTo(2);
      this.physics.arcade.enable(newBlock);
      newBlock.body.immovable = true;
      platforms.add(newBlock);
      newBlock = this.add.sprite(this.world.centerX-300, this.world.centerY + 72 + 64, 'dansheet', 7);
      newBlock.scale.setTo(2);
      this.physics.arcade.enable(newBlock);
      newBlock.body.immovable = true;
      platforms.add(newBlock);
    }

    this.mysticEgg = this.add.sprite(this.world.centerX-300, this.world.centerY + 72 + 32, 'dansheet', 0);
    this.mysticEgg.scale.setTo(2);
    this.physics.arcade.enable(this.mysticEgg);
    this.mysticEgg.body.gravity.y = 200;
    this.mysticEgg.update = () => { this.guardian.eggViolated = !this.mysticEgg.inCamera; };

    cursors = this.input.keyboard.createCursorKeys();
    this.input.maxPointers = 2;

    this.game.camera.follow(player);
    this.game.camera.bounds = null;
  },

  update: function() {
    this.physics.arcade.collide(player, platforms);
    this.physics.arcade.collide(player, this.mysticEgg);
    this.physics.arcade.collide(crate, platforms);
    this.physics.arcade.collide(player, crate);
    this.physics.arcade.collide(this.guardian, platforms);
    this.physics.arcade.collide(this.mysticEgg, platforms);

    player.body.velocity.x = 0;
    crate.body.velocity.x = 0;

    if (this.input.pointer1.isDown) {
      var wx = this.world.centerX;
      var px = this.input.pointer1.x;
      player.body.velocity.x = (px < wx) ? -150 : 150;

      if (this.input.pointer2.isDown && player.body.touching.down) {
        player.body.velocity.y = -175;
      }
    }
    else if (cursors.left.isDown) {
      player.body.velocity.x = -150;
    }
    else if (cursors.right.isDown) {
      player.body.velocity.x = 150;
    }
    
    if (cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -175;
    }

    if (player.body.velocity.x < 0) {
      player.animations.play('left');
    }
    else if (player.body.velocity.x > 0) {
      player.animations.play('right');
    }
    else {
      player.animations.stop();
      player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -175;
    }
  }
};
