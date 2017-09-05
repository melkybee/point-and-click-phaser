SceneTent = function() {
    player = null;
};

SceneTent.prototype = {
    preload: function() {
        currentScene = 'scene-tent';
        player = new Player();
    },
    create: function() {
        this.background = game.add.sprite(0, 0, 'bg-tent');
        player.create();
    },
    update: function() {
    }
};