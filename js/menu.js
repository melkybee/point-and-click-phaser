// Title Page
Title = function(){
};
Title.prototype = {
    preload : function() {
        game.load.bitmapFont('coolstory', 'fonts/coolstory.png', 'fonts/coolstory.fnt');
    },
    create : function() {
        this.background = game.add.sprite(0, 0, 'bg-title');
        // add title to screen
        gameTitle = game.add.sprite(36, 18, 'title');

        // button
        playButton = game.add.button(94, GAME_HEIGHT - 94, 'playButton', this.transitionGame, this, 0, 0, 0);

    },
    transitionGame : function() {
        // google analytics
//        gaPlugin.trackEvent(gaPluginResultHandler, gaPluginErrorHandler, "Button", "Click", "Main Menu - Play Game", new Date().getMilliseconds());

        // start game
        game.state.start('scene-spaceship');
    }
};

// Ending 1 Page
EndingOne = function(){
};
EndingOne.prototype = {
    preload : function() {
        game.load.bitmapFont('coolstory', 'fonts/coolstory.png', 'fonts/coolstory.fnt');
    },
    create : function() {
        this.background = game.add.sprite(0, 0, 'bg-ending-1');
        this.topText = game.add.text(
            20,
            20,
            'The astronaut made it home safely.',
            {
                font: "20px coolstory",
                fill: '#fff',
                align: 'left',
                stroke: '#000',
                strokeThickness: 10
            }

            //gaPlugin.trackEvent(gaPluginResultHandler, gaPluginErrorHandler, "Button", "Click", "Main Menu - Play Game", new Date().getMilliseconds());
        );

        game.time.events.add(Phaser.Timer.SECOND * 5, function(){ this.topText.text = 'He missed eating ramen, surfing, and playing video games.'; }, this);

        game.time.events.add(Phaser.Timer.SECOND * 10, function(){ this.topText.text = 'In fact, he rushed to his computer to play all the games from the Adventure Jam.'; }, this);

        game.time.events.add(Phaser.Timer.SECOND * 15, function(){ game.state.start('gameover'); }, this);
    }
};

// Ending 2 Page
EndingTwo = function(){
};
EndingTwo.prototype = {
    preload : function() {
        game.load.bitmapFont('coolstory', 'fonts/coolstory.png', 'fonts/coolstory.fnt');
    },
    create : function() {
        this.background = game.add.sprite(0, 0, 'bg-ending-2');

        this.topText = game.add.text(
            20,
            20,
            'The astronaut made it home safely.',
            {
                font: "20px coolstory",
                fill: '#fff',
                align: 'left',
                stroke: '#000',
                strokeThickness: 10
            }

            //gaPlugin.trackEvent(gaPluginResultHandler, gaPluginErrorHandler, "Button", "Click", "Main Menu - Play Game", new Date().getMilliseconds());
        );

        game.time.events.add(Phaser.Timer.SECOND * 5, function(){ this.topText.text = 'Unfortunately, nobody recognized him.'; }, this);

        game.time.events.add(Phaser.Timer.SECOND * 10, function(){ this.topText.text = 'He now enjoys cosplaying at cons.'; }, this);

        game.time.events.add(Phaser.Timer.SECOND * 15, function(){ game.state.start('gameover'); }, this);
    }
};

// Game Over Screen
GameOver = function(){
    this.theEndText = null;
};
GameOver.prototype = {
    preload : function() {
    },
    create : function() {

        // the end text
        this.theEndText = game.add.text(
            GAME_WIDTH/2 - 90,
            GAME_HEIGHT - 340,
            'THE END.',
            {
                font: "48px coolstory",
                fill: '#fff',
                align: 'left'
            }
        );
        // share buttons
 //       shareTwitterButton = game.add.button(GAME_WIDTH/2-100, gameTitle.y + gameTitle.height + 80, 'shareTwitterButton', this.shareTwitter, this, 0, 0, 0);
 //       shareFacebookButton = game.add.button(GAME_WIDTH/2+10, gameTitle.y + gameTitle.height + 80, 'shareFacebookButton', this.shareFacebook, this, 0, 0, 0);

        // button
        mainMenuButton = game.add.button(GAME_WIDTH/2 - 100, GAME_HEIGHT - 140, 'mainMenuButton', this.transition, this, 0, 0, 0);

    },
    shareTwitter : function() {
        // google analytics
//        gaPlugin.trackEvent( gaPluginResultHandler, gaPluginErrorHandler, "Button", "Click", "Game Over Menu - Share Twitter");

        openDeviceBrowser('https://twitter.com/intent/tweet?url=http://melkybee.com&text=test&via=melkybee&hashtags=adventurejam,astrochibi,homeboundpredicament');
    },
    shareFacebook : function() {
        // google analytics
//        gaPlugin.trackEvent( gaPluginResultHandler, gaPluginErrorHandler, "Button", "Click", "Game Over Menu - Share Facebook");

        openDeviceBrowser('https://www.facebook.com/sharer/sharer.php?u=http://melkybee.com');
    },
    transition : function() {
        // google analytics
//        gaPlugin.trackEvent( gaPluginResultHandler, gaPluginErrorHandler, "Button", "Click", "Game Over Menu - Back to Main Menu", new Date().getMilliseconds());

        // show menu screen
        game.state.start('title');
    }
};
