SceneSpaceship = function() {
    this.items = null;
    this.interactItemMenu = null;
    this.lookAtButton = null;
    this.pickUpButton = null;
    this.closeButton = null;
    this.topText = null;
};

SceneSpaceship.prototype = {
    preload: function() {
        currentScene = 'scene-spaceship';
        player = new Player();
        menuOpened = false;
    },
    create: function() {
        this.background = game.add.sprite(0, 0, 'bg-spaceship');

        // player
        player.create();

        // items
        this.items = game.add.group();

        // interactItemMenu
        this.interactItemMenu = game.add.group();

        // socks
        if (inventory.socks.count === 0) {
            var foundSocks = false;
            for (var i = 0; i < cauldronList.length; i++) {
                if (cauldronList[i] === 'socks') {
                    foundSocks = true;
                }
            }
            if (!foundSocks) {
                socks = this.items.create(580, 400, 'socks');
                socks.width = 40;
                socks.height = 40;
                socks.anchor.setTo(0,0);
                socks.inputEnabled = true;
                socks.events.onInputDown.add(this.interactItem, this);
            }
        }

        this.topText = game.add.text(
            20,
            20,
            '',
            {
                font: "18px dimbo",
                fill: '#fff',
                align: 'left'
            }
        );

        // backpack
        // backpack = game.add.sprite(660, 10, 'backpack');
        // backpack.inputEnabled = true;
        // backpack.events.onInputDown.add(this.openInventory, this);

    },
    update: function() {
    },
    openInventory: function(pointer) {

    },
    interactItem: function(pointer) {
        if (pointer.key === 'socks') {
            menuOpened = true;
            // open menu-do-2
            menuDo2 = this.interactItemMenu.create(socks.x, socks.y - 100, 'menu-do-2');
            this.closeButton = this.interactItemMenu.create(menuDo2.x + 102, menuDo2.y - 42, 'menu-close-btn');
            this.lookAtButton = this.interactItemMenu.create(menuDo2.x + 2, menuDo2.y + 2, 'menu-item-btn');
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                this.showTopText(this.topText, inventory.socks.description);
            }, {topText:this.topText, showTopText:this.showTopText});
            this.pickUpButton = this.interactItemMenu.create(menuDo2.x + 2, menuDo2.y + 44, 'menu-item-btn');
            this.pickUpButton.inputEnabled = true;
            this.pickUpButton.events.onInputDown.add(function(pickUpPointer) {

                this.inventory[this.item.key].count = 1;
                this.items.remove(this.item);

                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.pickUpButton);
                this.interactItemMenu.remove(this.closeButton);

                menuOpened = false;

                this.showTopText(this.topText, 'Picked up "' + this.inventory[this.item.key].title + '"');

            }, {inventory: inventory, items: this.items, item: pointer, interactItemMenu: this.interactItemMenu, menu: menuDo2, lookAtButton: this.lookAtButton, pickUpButton: this.pickUpButton, closeButton: this.closeButton, showTopText: this.showTopText, topText: this.topText });
            this.closeButton.inputEnabled = true;
            this.closeButton.events.onInputDown.add(function(closePointer) {
                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.pickUpButton);
                this.interactItemMenu.remove(closePointer);

                menuOpened = false;
            }, {interactItemMenu: this.interactItemMenu, menu: menuDo2, lookAtButton: this.lookAtButton, pickUpButton: this.pickUpButton});
        } else if (pointer.key === 'spaceship') {
            // open menuDoLookUse > open menuItems
        }
    },
    showTopText: function(topText, str) {
        topText.text = str;
        game.time.events.add(Phaser.Timer.SECOND * 5, function(){topText.text = '';}, this);
    }
};