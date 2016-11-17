AdventureGame.Game = function(game) {
  this.platforms;
  this.player;
  this.crate;
  this.cursors;

  this.guardian;
  this.castle;
  this.mysticEgg;

  this.fruit;

  this.jumpHeight = 175;
};

AdventureGame.Game.prototype = {
  create: function() {
    this.stage.backgroundColor = '#2AE';
    var rootFn = this;

    this.physics.startSystem(Phaser.Physics.ARCADE);
    platforms = this.add.group();
    platforms.enableBody = true;

    island = platforms.create(this.world.centerX-150, this.world.centerY, 'island');
    island.body.immovable = true;
    island = platforms.create(this.world.centerX+50, this.world.centerY-30, 'island');
    island.body.immovable = true;
    island = platforms.create(this.world.centerX+300, this.world.centerY-200, 'island');
    island.body.immovable = true;
    island = platforms.create(this.world.centerX-300, this.world.centerY+200, 'island');
    island.body.immovable = true;
    island = platforms.create(this.world.centerX-500, this.world.centerY+200, 'island');
    island.body.immovable = true;

    this.fruit = this.add.sprite(this.world.centerX-450, this.world.centerY+168, 'fruit');
    this.fruit.animations.add('glow', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    this.fruit.animations.play('glow');
    this.fruit.scale.setTo(1.5);
    this.physics.arcade.enable(this.fruit);

    this.portal = this.add.sprite(this.world.centerX+350, this.world.centerY-300, 'portal');
    this.portal.animations.add('glow', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    this.portal.animations.play('glow');
    this.portal.scale.setTo(2);
    this.physics.arcade.enable(this.portal);

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
    this.guardian.update = function() {
      rootFn.guardian.scale.x = (player.x < rootFn.guardian.x) ? -2 : 2;
      if (rootFn.guardian.eggViolated && rootFn.guardian.body.touching.down) {
        rootFn.guardian.body.velocity.y = -225;
      }
    };

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
    this.mysticEgg.update = function() {
      rootFn.guardian.eggViolated = !rootFn.mysticEgg.inCamera;
    };

    cursors = this.input.keyboard.createCursorKeys();
    this.input.maxPointers = 2;

    this.game.camera.follow(player);
    this.game.camera.bounds = null;
  },

  update: function() {
    // console.log(this.fruit);
    this.physics.arcade.collide(player, platforms);
    this.physics.arcade.collide(player, this.mysticEgg);
    // ;
    this.physics.arcade.collide(crate, platforms);
    this.physics.arcade.collide(player, crate);
    this.physics.arcade.collide(this.guardian, platforms);
    this.physics.arcade.collide(this.mysticEgg, platforms);

    this.physics.arcade.overlap(player, this.fruit, this.getFruit, null, this);
    this.physics.arcade.overlap(player, this.portal, this.teleport, null, this);

    player.body.velocity.x = 0;
    crate.body.velocity.x = 0;

    if (this.input.pointer1.isDown) {
      var wx = this.world.centerX;
      var px = this.input.pointer1.x;
      player.body.velocity.x = (px < wx) ? -150 : 150;

      if (this.input.pointer2.isDown && player.body.touching.down) {
        player.body.velocity.y = -this.jumpHeight;
      }
    }
    else if (cursors.left.isDown) {
      player.body.velocity.x = -150;
    }
    else if (cursors.right.isDown) {
      player.body.velocity.x = 150;
    }
    
    if (cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -this.jumpHeight;
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
      player.body.velocity.y = -this.jumpHeight;
    }

  },

  getFruit: function(player, fruit) {
    fruit.kill();
    this.jumpHeight = 400;
  },

  teleport: function(player, portal) {
    this.state.start('Game2');
  }
};
