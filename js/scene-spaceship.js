SceneSpaceship = function() {
    this.items = null;
    this.interactItemMenu = null;
    this.lookAtButton = null;
    this.pickUpButton = null;
    this.topText = null;
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
                this.showTopText(inventory.socks.description);
            }, {showTopText:this.showTopText});
            this.pickUpButton = this.interactItemMenu.create(menuDoLookPick.x + 2, menuDoLookPick.y + 44, 'menu-item-btn');
            this.pickUpButton.inputEnabled = true;
            this.pickUpButton.events.onInputDown.add(function(pickUpPointer) {
                console.log('item = ' , this.item);
                
                this.inventory[this.item.key].count = 1;
                this.items.remove(this.item);
                console.log('inventory = ' , this.inventory);

                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.pickUpButton);

                menuOpened = false;

            }, {inventory: inventory, items: this.items, item: pointer, interactItemMenu: this.interactItemMenu, menu: menuDoLookPick, lookAtButton: this.lookAtButton, pickUpButton: this.pickUpButton});
        } else if (pointer.key === 'spaceship') {
            // open menuDoLookUse > open menuItems
        }
    },
    showTopText: function(str) {
        this.topText = game.add.text(
            20,
            20,
            str,
            {
                font: "24px dimbo",
                fill: '#fff',
                align: 'left'
            }
        );
        game.time.events.add(Phaser.Timer.SECOND * 5, function(){this.topText.destroy();}, this);
    }
};