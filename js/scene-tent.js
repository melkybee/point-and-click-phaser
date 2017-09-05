SceneTent = function() {
    this.player = null;
};

SceneTent.prototype = {
    preload: function() {
        currentScene = 'scene-tent';
        this.player = new Player();
    },
    create: function() {
        this.background = game.add.sprite(0, 0, 'bg-tent');
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