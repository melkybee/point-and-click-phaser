SceneInnerHouse = function() {
    this.player = null;
};

SceneInnerHouse.prototype = {
    preload: function() {
        currentScene = 'scene-inner-house';
        this.player = new Player();
    },
    create: function() {
        this.background = game.add.sprite(0, 0, 'bg-inner-house');
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