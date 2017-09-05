SceneSpaceship = function() {
    this.player = null;
};

SceneSpaceship.prototype = {
    preload: function() {
        currentScene = 'scene-spaceship';
        this.player = new Player();
    },
    create: function() {
        this.background = game.add.sprite(0, 0, 'bg-spaceship');
        this.player.create();
    },
    update: function() {
    },
    collectItem: function(itemSprite) {
    },
    removeItem: function(itemSprite) {
    },
    gameOver: function() {
    }
};