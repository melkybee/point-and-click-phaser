SceneSpaceship = function() {
    this.items = null;
    this.interactItemMenu = null;
    this.lookAtButton = null,
    this.pickUpButton = null;
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
            this.lookAtButton = this.interactItemMenu.create(menuDoLookPick.x + 2, menuDoLookPick.y + 2, 'menu-item-btn');
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                console.log('clicked on lookAtPointer = ' , lookAtPointer);
            }, {game:game, player:player});
            this.pickUpButton = this.interactItemMenu.create(menuDoLookPick.x + 2, menuDoLookPick.y + 44, 'menu-item-btn');
            this.pickUpButton.inputEnabled = true;
            this.pickUpButton.events.onInputDown.add(function(pickUpPointer) {
                console.log('clicked on pickUpPointer = ' , pickUpPointer);
//                this.game.collectItem(this.player, this.item);
            }, {game:game, player:player, item:pointer});
        } else if (pointer.key === 'spaceship') {
            // open menuDoLookUse > open menuItems
        }
    },
    interactItemMenu: function() {
        console.log('pick up = ' , item.key);
    }
};