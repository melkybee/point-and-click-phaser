SceneSpaceship = function() {
    this.items = null;
    this.interactItemMenu = null;
};

SceneSpaceship.prototype = {
    preload: function() {
        currentScene = 'scene-spaceship';
        player = new Player();
    },
    create: function() {
        this.background = game.add.sprite(0, 0, 'bg-spaceship');

        // player
        player.create();

        console.log('ship game = ' , game);

        // items
        this.items = game.add.group();

        // interactItemMenu
        this.interactItemMenu = game.add.group();

        // socks
        if (inventory.socks.count === 0) {
            socks = this.items.create(580, 400, 'socks');
            socks.width = 40;
            socks.height = 40;
            socks.anchor.setTo(0,0);
            socks.inputEnabled = true;
            socks.events.onInputDown.add(this.interactItem, this);
        }

        console.log('player ' , player);

    },
    update: function() {
    },
    interactItem: function(pointer) {
        console.log('clicked on = ' + pointer.key);
        if (pointer.key === 'socks') {
            menuOpened = true;
            // open menu-do-look-pick
            menuDoLookPick = this.interactItemMenu.create(socks.x, socks.y - 100, 'menu-do-look-pick');
            menuDoLookPick.inputEnabled = true;
            menuDoLookPick.events.onInputDown.add(function(thisPointer) {
                console.log('clicked on = ' , thisPointer);
                console.log('pointer ' + thisPointer.y);
                console.log('menu ' + menuDoLookPick.y);
                if (thisPointer.y < (menuDoLookPick.height+40)) {
                    console.log('look at');
                } else if ((thisPointer.y >= (menuDoLookPick.height+40)) && (thisPointer.y < (menuDoLookPick.height+80))) {
                    console.log('pick up');
                }
            }, this);
        } else if (pointer.key === 'spaceship') {
            // open menuDoLookUse > open menuItems
        }
    },
    interactItemMenu: function(pointer) {
        console.log('clicked on = ' , pointer);
    }
};