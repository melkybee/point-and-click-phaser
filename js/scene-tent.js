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
        if (inventory.jar.count === 0) {
            jar = this.items.create(580, 400, 'jar');
            jar.inputEnabled = true;
            jar.events.onInputDown.add(this.interactItem, this);
        }

        // cauldron
        cauldron = this.items.create(380, 300, 'cauldron');
        cauldron.inputEnabled = true;
        cauldron.events.onInputDown.add(this.interactItem, this);

        console.log('player ' , player);

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

    },
    update: function() {
    },
    interactItem: function(pointer) {
        console.log('clicked on = ' + pointer.key);
        if (pointer.key === 'jar') {
            if (menuOpened) {
                return;
            }
            menuOpened = true;
            // open menu-do-look-pick
            menuDoLookPick = this.interactItemMenu.create(jar.x, jar.y - 100, 'menu-do-look-pick');
            this.lookAtButton = this.interactItemMenu.create(menuDoLookPick.x + 2, menuDoLookPick.y + 2, 'menu-item-btn');
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                this.showTopText(this.topText, inventory.jar.description);
            }, {topText:this.topText, showTopText:this.showTopText});
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
                this.interactItemMenu.remove(this.closeButton);

                menuOpened = false;

                this.showTopText(this.topText, 'Picked up "' + this.inventory[this.item.key].title + '"');

            }, {inventory: inventory, items: this.items, item: pointer, interactItemMenu: this.interactItemMenu, menu: menuDoLookPick, lookAtButton: this.lookAtButton, pickUpButton: this.pickUpButton, closeButton: this.closeButton, showTopText: this.showTopText, topText: this.topText });
            this.closeButton = this.interactItemMenu.create(menuDoLookPick.x + 102, menuDoLookPick.y - 42, 'menu-close-btn');
            this.closeButton.inputEnabled = true;
            this.closeButton.events.onInputDown.add(function(closePointer) {
                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.pickUpButton);
                this.interactItemMenu.remove(closePointer);

                menuOpened = false;
            }, {interactItemMenu: this.interactItemMenu, menu: menuDoLookPick, lookAtButton: this.lookAtButton, pickUpButton: this.pickUpButton});
        } else if (pointer.key === 'cauldron') {
            if (menuOpened) {
                return;
            }
            menuOpened = true;
            // open menu-do-look-pick
            menuDoLookPick = this.interactItemMenu.create(cauldron.x, cauldron.y - 100, 'menu-do-look-pick');
            this.lookAtButton = this.interactItemMenu.create(menuDoLookPick.x + 2, menuDoLookPick.y + 2, 'menu-item-btn');
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                var txt = dialog.cauldron[0];
                if (cauldronList.length > 0) {
                    txt = dialog.cauldron[1] + cauldronList;
                }
                this.showTopText(this.topText, txt);
            }, {topText:this.topText, showTopText:this.showTopText});
            this.useWithButton = this.interactItemMenu.create(menuDoLookPick.x + 2, menuDoLookPick.y + 44, 'menu-item-btn');
            this.useWithButton.inputEnabled = true;
            this.useWithButton.events.onInputDown.add(function(useWithPointer) {
                console.log('item = ' , this.item);

                // item 1
                if (this.inventory.socks.count === 1) {
                    this.interactInnerMenu = this.interactItemMenu.create(menuDoLookPick.x + 100, menuDoLookPick.y, 'menu-items-2');
                    this.item1Button = this.interactItemMenu.create(menuDoLookPick.x + 122, menuDoLookPick.y + 2, 'menu-item-btn');
                    this.item1Button.inputEnabled = true;
                    this.item1Button.events.onInputDown.add(function(item1Pointer) {
                        console.log('item 1 ');
                        this.showTopText(this.topText, 'Added "' + this.inventory.socks.title + '" into the cauldron.');
                        this.inventory.socks.count = 0;
                        this.cauldronList.push(this.inventory.socks.key);

                        this.interactItemMenu.remove(this.menu);
                        this.interactItemMenu.remove(this.lookAtButton);
                        this.interactItemMenu.remove(this.useWithButton);

                        this.interactItemMenu.remove(this.item1Button);
                        if (this.item2Button) {
                            this.interactItemMenu.remove(this.item2Button);
                        }
                        this.interactItemMenu.remove(this.interactInnerMenu);

                        menuOpened = false;
                    }, {topText:this.topText, showTopText:this.showTopText, inventory:this.inventory, cauldronList:this.cauldronList, interactItemMenu: this.interactItemMenu, menu: this.menu, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, interactInnerMenu: this.interactInnerMenu, item1Button: this.item1Button, item2Button:this.item2Button});

                    if (this.inventory.jar.count === 1 && this.jarState === 'WATER') {
                        // item 2
                        this.item2Button = this.interactItemMenu.create(menuDoLookPick.x + 122, menuDoLookPick.y + 44, 'menu-item-btn');
                        this.item2Button.inputEnabled = true;
                        this.item2Button.events.onInputDown.add(function(item2Pointer) {
                            console.log('item 2');
                            this.showTopText(this.topText, 'Added water from the "' + this.inventory.jar.title + '" into the cauldron. The jar is now empty.');
                            this.jarState = 'EMPTY';
                            this.cauldronList.push(this.inventory.jar_water.key);

                            this.interactItemMenu.remove(this.menu);
                            this.interactItemMenu.remove(this.lookAtButton);
                            this.interactItemMenu.remove(this.useWithButton);

                            this.interactItemMenu.remove(this.item1Button);
                            if (this.item2Button) {
                                this.interactItemMenu.remove(this.item2Button);
                            }
                            this.interactItemMenu.remove(this.interactInnerMenu);

                            menuOpened = false;
                        }, {topText:this.topText, showTopText:this.showTopText, inventory:this.inventory, cauldronList:this.cauldronList, interactItemMenu: this.interactItemMenu, menu: this.menu, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, interactInnerMenu: this.interactInnerMenu, item1Button: this.item1Button, item2Button:this.item2Button});
                    }
                } else if (this.inventory.jar.count === 1 && this.jarState === 'WATER') {
                    this.interactInnerMenu = this.interactItemMenu.create(menuDoLookPick.x + 100, menuDoLookPick.y, 'menu-items-2');
                    this.item1Button = this.interactItemMenu.create(menuDoLookPick.x + 122, menuDoLookPick.y + 2, 'menu-item-btn');
                    this.item1Button.inputEnabled = true;
                    this.item1Button.events.onInputDown.add(function(item1Pointer) {
                        console.log('item 1 ');
                        this.showTopText(this.topText, 'Added water from the "' + this.inventory.jar.title + '" into the cauldron. The jar is now empty.');
                        this.jarState = 'EMPTY';
                        this.cauldronList.push(this.inventory.jar_water.key);

                        this.interactItemMenu.remove(this.menu);
                        this.interactItemMenu.remove(this.lookAtButton);
                        this.interactItemMenu.remove(this.useWithButton);

                        this.interactItemMenu.remove(this.item1Button);
                        if (this.item2Button) {
                            this.interactItemMenu.remove(this.item2Button);
                        }
                        this.interactItemMenu.remove(this.interactInnerMenu);

                        menuOpened = false;
                    }, {topText:this.topText, showTopText:this.showTopText, inventory:this.inventory, cauldronList:this.cauldronList, interactItemMenu: this.interactItemMenu, menu: this.menu, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, interactInnerMenu: this.interactInnerMenu, item1Button: this.item1Button, item2Button:this.item2Button});

                    if (this.inventory.socks.count === 1) {
                        // item 2
                        this.item2Button = this.interactItemMenu.create(menuDoLookPick.x + 122, menuDoLookPick.y + 44, 'menu-item-btn');
                        this.item2Button.inputEnabled = true;
                        this.item2Button.events.onInputDown.add(function(item2Pointer) {
                            console.log('item 2');
                            this.showTopText(this.topText, 'Added "' + this.inventory.socks.title + '" into the cauldron.');
                            this.inventory.socks.count = 0;
                            this.cauldronList.push(this.inventory.socks.key);

                            this.interactItemMenu.remove(this.menu);
                            this.interactItemMenu.remove(this.lookAtButton);
                            this.interactItemMenu.remove(this.useWithButton);

                            this.interactItemMenu.remove(this.item1Button);
                            if (this.item2Button) {
                                this.interactItemMenu.remove(this.item2Button);
                            }
                            this.interactItemMenu.remove(this.interactInnerMenu);

                            menuOpened = false;
                    }, {topText:this.topText, showTopText:this.showTopText, inventory:this.inventory, cauldronList:this.cauldronList, interactItemMenu: this.interactItemMenu, menu: this.menu, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, interactInnerMenu: this.interactInnerMenu, item1Button: this.item1Button, item2Button:this.item2Button});
                    }
                } else {
                    this.showTopText(this.topText, 'You have no items in your inventory to add into the cauldron.');
                }
            }, {inventory: inventory, items: this.items, item: pointer, jarState: jarState, cauldronList: cauldronList, interactItemMenu: this.interactItemMenu, menu: menuDoLookPick, interactInnerMenu: this.interactInnerMenu, item1Button:this.item1Button, item2Button:this.item2Button, lookAtButton: this.lookAtButton, pickUpButton: this.pickUpButton, useWithButton: this.useWithButton, showTopText: this.showTopText, topText: this.topText });
            this.closeButton = this.interactItemMenu.create(menuDoLookPick.x + 102, menuDoLookPick.y - 42, 'menu-close-btn');
            this.closeButton.inputEnabled = true;
            this.closeButton.events.onInputDown.add(function(closePointer) {
                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.useWithButton);
                this.interactItemMenu.remove(closePointer);

                menuOpened = false;
            }, {interactItemMenu: this.interactItemMenu, menu: menuDoLookPick, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton});
        } // end if cauldron
    },
    showTopText: function(topText, str) {
        console.log('t ' , topText);
        topText.text = str;
        game.time.events.add(Phaser.Timer.SECOND * 5, function(){topText.text = '';}, this);
    }
};