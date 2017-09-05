SceneLake = function() {
    this.player = null;
};

SceneLake.prototype = {
    preload: function() {
        currentScene = 'scene-lake';
        this.player = new Player();
    },
    create: function() {
        this.background = game.add.sprite(0, 0, 'bg-lake');
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