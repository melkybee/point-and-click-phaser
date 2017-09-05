SceneTent = function() {
    this.items = null;
    this.interactItemMenu = null;
    this.lookAtButton = null;
    this.pickUpButton = null;
    this.useWithButton = null;
    this.closeButton = null;
    this.interactInnerMenu = null;
    this.item1Button = null;
    this.item2Button = null;
    this.topText = null;
};

SceneTent.prototype = {
    preload: function() {
        currentScene = 'scene-tent';
        player = new Player();
        menuOpened = false;
    },
    create: function() {
        this.background = game.add.sprite(0, 0, 'bg-tent');

        // player
        player.create();

        // items
        this.items = game.add.group();

        // interactItemMenu
        this.interactItemMenu = game.add.group();

        // jar
        if (!pickedUpJar) {
            jar = this.items.create(580, 400, 'jar');
            jar.inputEnabled = true;
            jar.events.onInputDown.add(this.interactItem, this);
        }

        // cauldron
        cauldron = this.items.create(380, 300, 'cauldron');
        cauldron.inputEnabled = true;
        cauldron.events.onInputDown.add(this.interactItem, this);

        // text
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
    interactItem: function(pointer) {
        if (pointer.key === 'jar') {
            if (menuOpened) {
                return;
            }
            menuOpened = true;
            // open menu-do-2
            menuDo2 = this.interactItemMenu.create(jar.x, jar.y - 100, 'menu-do-2');
            this.closeButton = this.interactItemMenu.create(menuDo2.x + 102, menuDo2.y - 42, 'menu-close-btn');
            this.lookAtButton = this.interactItemMenu.create(menuDo2.x + 2, menuDo2.y + 2, 'menu-item-btn');
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                this.showTopText(this.topText, inventory.jar.description);
            }, {topText:this.topText, showTopText:this.showTopText});
            this.pickUpButton = this.interactItemMenu.create(menuDo2.x + 2, menuDo2.y + 44, 'menu-item-btn');
            this.pickUpButton.inputEnabled = true;
            this.pickUpButton.events.onInputDown.add(function(pickUpPointer) {

                this.inventory[this.item.key].count = 1;
                this.items.remove(this.item);
                console.log('inventory = ' , this.inventory);

                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.pickUpButton);
                this.interactItemMenu.remove(this.closeButton);

                pickedUpJar = true;

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
        } else if (pointer.key === 'cauldron') {
            if (menuOpened) {
                return;
            }
            menuOpened = true;
            // open menu-do-2
            menuDo2 = this.interactItemMenu.create(cauldron.x, cauldron.y - 100, 'menu-do-2');

            // close
            this.closeButton = this.interactItemMenu.create(menuDo2.x + 102, menuDo2.y - 42, 'menu-close-btn');

            // look at
            this.lookAtButton = this.interactItemMenu.create(menuDo2.x + 2, menuDo2.y + 2, 'menu-item-btn');
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                var txt = dialog.cauldron[0];
                if (cauldronList.length > 0) {
                    txt = dialog.cauldron[1] + cauldronList;
                }
                this.showTopText(this.topText, txt);
            }, {topText:this.topText, showTopText:this.showTopText});

            // use with
            this.useWithButton = this.interactItemMenu.create(menuDo2.x + 2, menuDo2.y + 44, 'menu-item-btn');
            this.useWithButton.inputEnabled = true;
            this.useWithButton.events.onInputDown.add(function(useWithPointer) {

                // item inner menu
                this.interactInnerMenu = this.interactItemMenu.create(menuDo2.x + 100, menuDo2.y, 'menu-items-2');
                this.item1Button = this.interactItemMenu.create(menuDo2.x + 122, menuDo2.y + 2, 'menu-item-btn');
                this.item2Button = this.interactItemMenu.create(menuDo2.x + 122, menuDo2.y + 44, 'menu-item-btn');

                // item 1
                if (this.inventory.socks.count === 1) {
                    this.item1Button.inputEnabled = true;
                    this.item1Button.events.onInputDown.add(function(item1Pointer) {
                        if ((this.inventory.socks.count > 0) || (this.inventory.jar_water.count > 0)) {
                            if (this.cauldronList.length < cauldronListMax) {
                                this.showTopText(this.topText, 'Added "' + this.inventory.socks.title + '" into the cauldron.');
                                this.inventory.socks.count = 0;
                                this.cauldronList.push(this.inventory.socks.key);

                                console.log('inventory = ' , this.inventory);

                                this.interactItemMenu.remove(this.menu);
                                this.interactItemMenu.remove(this.lookAtButton);
                                this.interactItemMenu.remove(this.useWithButton);

                                this.interactItemMenu.remove(this.item1Button);
                                this.interactItemMenu.remove(this.item2Button);
                                this.interactItemMenu.remove(this.interactInnerMenu);
                                this.interactItemMenu.remove(this.closeButton);

                                menuOpened = false;
                            }
                        }
                    }, {topText:this.topText, showTopText:this.showTopText, inventory:this.inventory, cauldronList:this.cauldronList, interactItemMenu: this.interactItemMenu, menu: this.menu, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, interactInnerMenu: this.interactInnerMenu, item1Button: this.item1Button, item2Button:this.item2Button, closeButton:this.closeButton});
                } else if (this.inventory.socks.count === 0) {
                    // show question mark
                }

                // item 2
                if (this.inventory.jar_water.count === 1) {
                    this.item2Button.inputEnabled = true;
                    this.item2Button.events.onInputDown.add(function(item2Pointer) {
                        if ((this.inventory.socks.count > 0) || (this.inventory.jar_water.count > 0)) {
                            if (this.cauldronList.length < cauldronListMax) {
                                this.showTopText(this.topText, 'Added water from the "' + this.inventory.jar.title + '" into the cauldron. The jar is now empty.');
                                this.cauldronList.push(this.inventory.jar_water.key);
                                this.inventory.jar_water.count = 0;
                                this.inventory.jar.count = 1;

                                console.log('inventory = ' , this.inventory);

                                this.interactItemMenu.remove(this.menu);
                                this.interactItemMenu.remove(this.lookAtButton);
                                this.interactItemMenu.remove(this.useWithButton);

                                this.interactItemMenu.remove(this.item1Button);
                                this.interactItemMenu.remove(this.item2Button);
                                this.interactItemMenu.remove(this.interactInnerMenu);
                                this.interactItemMenu.remove(this.closeButton);

                                menuOpened = false;
                            }
                        }
                    }, {topText:this.topText, showTopText:this.showTopText, inventory:this.inventory, cauldronList:this.cauldronList, interactItemMenu: this.interactItemMenu, menu: this.menu, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, interactInnerMenu: this.interactInnerMenu, item1Button: this.item1Button, item2Button:this.item2Button, closeButton:this.closeButton});
                } else if (this.inventory.jar_water.count === 0) {
                    // show question mark
                }

                // nothing in inventory
                if ((this.inventory.socks.count === 0) && (this.inventory.jar_water.count === 0)) {
                    this.showTopText(this.topText, 'You have no items in your inventory that can be added into the cauldron.');
                }

            }, {inventory: inventory, items: this.items, item: pointer, cauldronList: cauldronList, interactItemMenu: this.interactItemMenu, menu: menuDo2, interactInnerMenu: this.interactInnerMenu, item1Button:this.item1Button, item2Button:this.item2Button, lookAtButton: this.lookAtButton, pickUpButton: this.pickUpButton, useWithButton: this.useWithButton, closeButton: this.closeButton, showTopText: this.showTopText, topText: this.topText });

            // close button
            this.closeButton.inputEnabled = true;
            this.closeButton.events.onInputDown.add(function(closePointer) {
                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.useWithButton);
                this.interactItemMenu.remove(this.item1Button);
                this.interactItemMenu.remove(this.item2Button);
                this.interactItemMenu.remove(this.interactInnerMenu);
                this.interactItemMenu.remove(closePointer);

                menuOpened = false;
            }, {interactItemMenu: this.interactItemMenu, menu: menuDo2, interactInnerMenu: this.interactInnerMenu, item1Button:this.item1Button, item2Button:this.item2Button, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton});
        } // end if cauldron
    },
    showTopText: function(topText, str) {
        topText.text = str;
        game.time.events.add(Phaser.Timer.SECOND * 5, function(){topText.text = '';}, this);
    }
};