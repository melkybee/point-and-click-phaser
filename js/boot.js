var GAME_WIDTH = 720,
    GAME_HEIGHT = 480,

    // Phaser game object
    game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game_div', { preload: this.preload, create: this.create, update: this.update, render: this.render }),

    // background
    bg,

    // world
    world,

    // title
    title,

    // buttons
    playButton,
    playAgainButton,
    mainMenuButton,
    gameTitle,

    // tap
    tap,

    // header text style
    STYLE_HEADER = {
        font: "24px dimbo",
        fill: '#fff',
        stroke: '#333',
        strokeThickness: 4,
        align: 'center'
    },

    // body text style
    STYLE_BODY = {
        font: "18px dimbo",
        fill: '#fff',
        stroke: '#333',
        strokeThickness: 4,
        align: 'center'
    },

    currentScene = 'scene-spaceship';

// booting / preloading assets
Boot = function () {
    this.player = null;
    this.loadText = null;
};
Boot.prototype = {
   preload: function() {
        // loading screen
        game.stage.backgroundColor = '#000';
        this.loadText = game.add.text(
            GAME_WIDTH/2,
            GAME_HEIGHT/2,
            'Loading things, blah blah blah...',
            {
                font: "24px dimbo",
                fill: '#fff',
                align: 'center'
            }
        );
        this.loadText.anchor.setTo(0.5,0.5);

        // preload all of the game assets

        // menu assets
        // game.load.image('title', 'img/title.png');
        // game.load.image('playButton', 'img/play-btn.png', 180, 44);
        // game.load.image('mainMenuButton', 'img/main-menu-btn.png', 180, 44);
        // game.load.image('playAgainButton', 'img/play-again-btn.png', 180, 44);

        // player assets
        game.load.spritesheet('chibi-walk', 'img/chibi-walk.png', 100, 150, 1);

        // background assets
        game.load.image('bg-spaceship', 'img/bg-spaceship.png', 720, 480);
        game.load.image('bg-lake', 'img/bg-lake.png', 720, 480);
        game.load.image('bg-forest', 'img/bg-forest.png', 720, 480);
        game.load.image('bg-outer-house', 'img/bg-outer-house.png', 720, 480);
        game.load.image('bg-inner-house', 'img/bg-inner-house.png', 720, 480);
        game.load.image('bg-basement', 'img/bg-basement.png', 720, 480);

    },
    create: function() {
        // transition to title screen when loaded
        game.state.start('scene-spaceship');
    }
};