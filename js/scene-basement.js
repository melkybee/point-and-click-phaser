SceneBasement = function() {
    this.player = null;
};

SceneBasement.prototype = {
    preload: function() {
        currentScene = 'scene-basement';
        this.player = new Player();
    },
    create: function() {
        this.background = game.add.sprite(0, 0, 'bg-basement');
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