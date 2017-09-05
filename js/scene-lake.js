SceneLake = function() {
    this.items = null;
    this.interactItemMenu = null;
    this.lookAtButton = null;
    this.pickUpButton = null;
    this.closeButton = null;
    this.topText = null;
};

SceneLake.prototype = {
    preload: function() {
        currentScene = 'scene-lake';
        player = new Player();
        menuOpened = false;
    },
    create: function() {
        this.background = game.add.sprite(0, 0, 'bg-lake');

        // player
        player.create();

        // items
        this.items = game.add.group();

        // interactItemMenu
        this.interactItemMenu = game.add.group();

        lake = this.items.create(0, 400, 'lake');
        lake.anchor.setTo(0,0);
        lake.inputEnabled = true;
        lake.events.onInputDown.add(this.interactItem, this);

        sign = this.items.create(420, 400, 'sign');
        sign.anchor.setTo(0,0);
        sign.inputEnabled = true;
        sign.events.onInputDown.add(this.interactItem, this);

        tree = this.items.create(450, 320, 'tree');
        tree.anchor.setTo(0,0);
        tree.inputEnabled = true;
        tree.events.onInputDown.add(this.interactItem, this);

        /*
        // wood
        if (inventory.wood.count === 0) {
            wood = this.items.create(580, 400, 'wood');
            wood.anchor.setTo(0,0);
            wood.inputEnabled = true;
            wood.events.onInputDown.add(this.interactItem, this);
        }
        */

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
        backpack = game.add.sprite(660, 10, 'backpack');
        backpack.inputEnabled = true;
        backpack.events.onInputDown.add(this.openInventory, this);

    },
    update: function() {
    },
    openInventory: function(pointer) {

    },
    interactItem: function(pointer) {
        if (pointer.key === 'lake') {
            if (menuOpened) {
                return;
            }
            menuOpened = true;
            // open menu-do-2
            menuDo2 = this.interactItemMenu.create(lake.x + 300, lake.y - 100, 'menu-do-2');
            this.closeButton = this.interactItemMenu.create(menuDo2.x + 102, menuDo2.y - 42, 'menu-close-btn');
            this.lookAtButton = this.interactItemMenu.create(menuDo2.x + 2, menuDo2.y + 2, 'menu-item-btn');
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                var txt = dialog.lake[0];
                this.showTopText(this.topText, txt);
            }, {topText:this.topText, showTopText:this.showTopText});
            this.useWithButton = this.interactItemMenu.create(menuDo2.x + 2, menuDo2.y + 44, 'menu-item-btn');
            this.useWithButton.inputEnabled = true;
            this.useWithButton.events.onInputDown.add(function(useWithPointer) {
                // item 1
                if (this.inventory.jar.count === 1) {
                    this.interactInnerMenu = this.interactItemMenu.create(menuDo2.x + 100, menuDo2.y, 'menu-items-1');
                    this.item1Button = this.interactItemMenu.create(menuDo2.x + 122, menuDo2.y + 2, 'menu-item-btn');
                    this.item1Button.inputEnabled = true;
                    this.item1Button.events.onInputDown.add(function(item1Pointer) {
                        this.showTopText(this.topText, 'The jar is now full of water from the lake.');
                        this.inventory.jar_water.count = 1;
                        this.inventory.jar.count = 0;

                        this.interactItemMenu.remove(this.menu);
                        this.interactItemMenu.remove(this.lookAtButton);
                        this.interactItemMenu.remove(this.useWithButton);

                        this.interactItemMenu.remove(this.item1Button);
                        this.interactItemMenu.remove(this.interactInnerMenu);

                        menuOpened = false;
                    }, {topText:this.topText, showTopText:this.showTopText, inventory:this.inventory, interactItemMenu: this.interactItemMenu, menu: this.menu, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, interactInnerMenu: this.interactInnerMenu, item1Button: this.item1Button});

                } else {
                    this.showTopText(this.topText, 'You have no items in your inventory that can be used with the lake.');
                }
            }, {inventory: inventory, items: this.items, item: pointer, interactItemMenu: this.interactItemMenu, menu: menuDo2, interactInnerMenu: this.interactInnerMenu, item1Button:this.item1Button, item2Button:this.item2Button, lookAtButton: this.lookAtButton, pickUpButton: this.pickUpButton, useWithButton: this.useWithButton, showTopText: this.showTopText, topText: this.topText });
            this.closeButton.inputEnabled = true;
            this.closeButton.events.onInputDown.add(function(closePointer) {
                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.useWithButton);
                this.interactItemMenu.remove(closePointer);

                menuOpened = false;
            }, {interactItemMenu: this.interactItemMenu, menu: menuDo2, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton});
        } else if (pointer.key === 'sign') {
            if (menuOpened) {
                return;
            }
            menuOpened = true;
            // open menu-do-2
            menuDo1 = this.interactItemMenu.create(sign.x + 0, sign.y - 60, 'menu-do-1');
            this.closeButton = this.interactItemMenu.create(menuDo1.x + 102, menuDo1.y - 42, 'menu-close-btn');
            this.lookAtButton = this.interactItemMenu.create(menuDo1.x + 2, menuDo1.y + 2, 'menu-item-btn');
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                var txt = dialog.sign[0];
                this.showTopText(this.topText, txt);
            }, {topText:this.topText, showTopText:this.showTopText});
            this.closeButton.inputEnabled = true;
            this.closeButton.events.onInputDown.add(function(closePointer) {
                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(closePointer);

                menuOpened = false;
            }, {interactItemMenu: this.interactItemMenu, menu: menuDo1, lookAtButton: this.lookAtButton});
        } else if (pointer.key === 'tree') {
            if (menuOpened) {
                return;
            }
            menuOpened = true;
            // open menu-do-2
            menuDo1 = this.interactItemMenu.create(tree.x + 0, tree.y - 60, 'menu-do-1');
            this.closeButton = this.interactItemMenu.create(menuDo1.x + 102, menuDo1.y - 42, 'menu-close-btn');
            this.lookAtButton = this.interactItemMenu.create(menuDo1.x + 2, menuDo1.y + 2, 'menu-item-btn');
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                var txt = dialog.tree[0];
                this.showTopText(this.topText, txt);
            }, {topText:this.topText, showTopText:this.showTopText});
            this.closeButton.inputEnabled = true;
            this.closeButton.events.onInputDown.add(function(closePointer) {
                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(closePointer);

                menuOpened = false;
            }, {interactItemMenu: this.interactItemMenu, menu: menuDo1, lookAtButton: this.lookAtButton});
        } // end if
    },
    showTopText: function(topText, str) {
        topText.text = str;
        game.time.events.add(Phaser.Timer.SECOND * 5, function(){topText.text = '';}, this);
    }
};