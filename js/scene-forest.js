SceneForest = function() {
    this.player = null;
};

SceneForest.prototype = {
    preload: function() {
        currentScene = 'scene-forest';
        this.player = new Player();
    },
    create: function() {
        this.background = game.add.sprite(0, 0, 'bg-forest');
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