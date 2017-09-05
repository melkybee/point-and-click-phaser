// Title Page
Title = function(){
};
Title.prototype = {
    preload : function() {
        game.load.bitmapFont('coolstory', 'fonts/coolstory.png', 'fonts/coolstory.fnt');
    },
    create : function() {
        // add title to screen
//        gameTitle = game.add.sprite(GAME_WIDTH/2, 40, 'title');
//        gameTitle.anchor.setTo(0.5,0);

        // button
        playButton = game.add.button(GAME_WIDTH/2 - 90, GAME_HEIGHT - 100, 'playButton', this.transitionGame, this, 0, 0, 0);

    },
    transitionGame : function() {
        // google analytics
//        gaPlugin.trackEvent(gaPluginResultHandler, gaPluginErrorHandler, "Button", "Click", "Main Menu - Play Game", new Date().getMilliseconds());

        // play tap sound
//        tap.play('',0,0.5,false);

        // start game
        game.state.start('scene-spaceship');
    }
};

// Game Over Screen
GameOver = function(){
    this.menuOverLabel = null;
};
GameOver.prototype = {
    preload : function() {
    },
    create : function() {
        // game title
        gameTitle = game.add.sprite(GAME_WIDTH/2, 40, 'title');
        gameTitle.anchor.setTo(0.5,0);
/*
        // display the game over text
        this.menuOverLabel = game.add.text(
            game.world.width/2,
            gameTitle.y + gameTitle.height + 32,
            this.gameOverLabel,
            STYLE_HEADER
        );
        this.menuOverLabel.anchor.setTo(0.5,0.5);
*/
        // share buttons
 //       shareTwitterButton = game.add.button(GAME_WIDTH/2-100, gameTitle.y + gameTitle.height + 80, 'shareTwitterButton', this.shareTwitter, this, 0, 0, 0);
 //       shareFacebookButton = game.add.button(GAME_WIDTH/2+10, gameTitle.y + gameTitle.height + 80, 'shareFacebookButton', this.shareFacebook, this, 0, 0, 0);

        // buttons
 //       mainMenuButton = game.add.button(GAME_WIDTH/2+10, gameTitle.y + gameTitle.height + 130, 'mainMenuButton', this.transition, this, 0, 0, 0);
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

        // play tap sound
        tap.play('',0,0.5,false);

        // show menu screen
        game.state.start('title');
    }
};
