SceneLake = function() {
};

SceneLake.prototype = {
    preload: function() {
        currentScene = 'scene-lake';
        player = new Player();
        menuOpened = false;
    },
    create: function() {
        this.background = game.add.sprite(0, 0, 'bg-lake');
        player.create();
    },
    update: function() {
    }
};