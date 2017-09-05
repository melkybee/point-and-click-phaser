// Player
Player = function() {
	this.sprite = null;
    this.isMoving = null;
};

Player.prototype = {
    preload: function() {
    },
    create: function() {
        this.sprite = game.add.sprite(playerX, playerY, 'chibi-walk');
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.setSize(100, 150);
        this.sprite.anchor.setTo(0.5,1);

        // move character on input down/tap
        game.input.onDown.add(this.moveCharacter, this);
    },
    moveCharacter: function(pointer) {
        var pointerX = pointer.x,
            pointerY = pointer.y,
            duration;

        // player facing left/right
        if (pointer.x > this.sprite.x) {
            this.sprite.scale.x = 1;  // flip horizontally (moving right)
        } else {
            this.sprite.scale.x = -1;  // flip horizontally (moving left)
        }

        // player moving
        this.isMoving = true;

        //  300 = 300 pixels per second = the speed the sprite will move at, regardless of the distance it has to travel
        duration = (game.physics.arcade.distanceToPointer(this.sprite, pointer) / 300) * 1000;

        // limits
        if (pointerX < 70) {
            pointerX = 70;
        }
        if (pointerX > 650) {
            pointerX = 650;
        }
        if (pointerY < 370) {
            pointerY = 370;
        }
        if (pointerY > 600) {
            pointerY = 600;
        }

        tween = game.add.tween(this.sprite).to({ x: pointerX, y: pointerY }, duration, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(function() {
            this.moveCharacterComplete(pointer);
        }, this);
    },
    moveCharacterComplete: function(pointer) {
        var pointerX = pointer.x,
            pointerY = pointer.y;

        this.isMoving = false;

        // limits
        if (pointerX <= 70) {
            // change scene
            this.changeScene(currentScene, 'left');
        } else if (pointerX >= 650) {
            // change scene
            this.changeScene(currentScene, 'right');
        }
    },
    update: function() {
        if (this.isMoving) {
            // player moving
            this.sprite.animations.play('chibi-walk', 6, true);
        } else {
            this.sprite.animations.stop();
        }
    },
    render: function() {
        game.debug.bodyInfo(this.sprite, 90, 90);
        game.debug.body(this.sprite);
    },
    gameCollide: function() {
        var spr = this.sprite.body;

        spr.gravity.x = 0;
    },
    changeScene: function(currentScene, direction) {
        if (currentScene === 'scene-spaceship') {
            if (direction === 'left') {
                playerX = playerRightX;
                game.state.start('scene-lake');
            } else if (direction === 'right') {
                playerX = playerLeftX;
                game.state.start('scene-tent');
            }
        } else if (currentScene === 'scene-lake') {
            if (direction === 'right') {
                playerX = playerLeftX;
                game.state.start('scene-spaceship');
            }
        } else if (currentScene === 'scene-tent') {
            if (direction === 'left') {
                playerX = playerRightX;
                game.state.start('scene-spaceship');
            }
        }
    },
    gameOver: function() {
        // disable input
        game.input.onDown.remove(this.moveCharacter, this);
    }
};
