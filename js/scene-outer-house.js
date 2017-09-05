SceneOuterHouse = function() {
    this.player = null;
};

SceneOuterHouse.prototype = {
    preload: function() {
        currentScene = 'scene-outer-house';
        this.player = new Player();
    },
    create: function() {
        this.background = game.add.sprite(0, 0, 'bg-outer-house');
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