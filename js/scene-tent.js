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

    this.lookAtText = null;
    this.pickUpText = null;
    this.useWithText = null;
    this.item1Text = null;
    this.item2Text = null;
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
                font: "18px naz",
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

            // look at
            this.lookAtButton = this.interactItemMenu.create(menuDo2.x + 2, menuDo2.y + 2, 'menu-item-btn');
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                this.showTopText(this.topText, inventory.jar.description);
            }, {topText:this.topText, showTopText:this.showTopText});
            // look at text
            this.lookAtText = game.add.text(
                this.lookAtButton.x + 2,
                this.lookAtButton.y + 2,
                'LOOK AT',
                {
                    font: "14px naz",
                    fill: '#000',
                    align: 'left'
                }
            );

            // pick up button
            this.pickUpButton = this.interactItemMenu.create(menuDo2.x + 2, menuDo2.y + 44, 'menu-item-btn');
            // pick up text
            this.pickUpText = game.add.text(
                this.pickUpButton.x + 2,
                this.pickUpButton.y + 2,
                'PICK UP',
                {
                    font: "14px naz",
                    fill: '#000',
                    align: 'left'
                }
            );
            // pick up actions
            this.pickUpButton.inputEnabled = true;
            this.pickUpButton.events.onInputDown.add(function(pickUpPointer) {

                this.inventory[this.item.key].count = 1;
                this.items.remove(this.item);
                console.log('inventory = ' , this.inventory);

                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.pickUpButton);
                this.interactItemMenu.remove(this.closeButton);

                this.lookAtText.destroy();
                this.pickUpText.destroy();

                pickedUpJar = true;

                menuOpened = false;

                this.showTopText(this.topText, 'Picked up "' + this.inventory[this.item.key].title + '"');

            }, {inventory: inventory, items: this.items, item: pointer, interactItemMenu: this.interactItemMenu, menu: menuDo2, lookAtButton: this.lookAtButton, pickUpButton: this.pickUpButton, lookAtText: this.lookAtText, pickUpText: this.pickUpText, closeButton: this.closeButton, showTopText: this.showTopText, topText: this.topText });
            this.closeButton.inputEnabled = true;
            this.closeButton.events.onInputDown.add(function(closePointer) {
                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.pickUpButton);
                this.interactItemMenu.remove(closePointer);

                this.lookAtText.destroy();
                this.pickUpText.destroy();

                menuOpened = false;
            }, {interactItemMenu: this.interactItemMenu, menu: menuDo2, lookAtButton: this.lookAtButton, pickUpButton: this.pickUpButton, lookAtText: this.lookAtText, pickUpText: this.pickUpText});
        } else if (pointer.key === 'cauldron') {
            if (menuOpened) {
                return;
            }
            menuOpened = true;
            // open menu-do-3
            menuDo3 = this.interactItemMenu.create(cauldron.x, cauldron.y - 140, 'menu-do-3');

            // close
            this.closeButton = this.interactItemMenu.create(menuDo3.x + 102, menuDo3.y - 42, 'menu-close-btn');

            // look at
            this.lookAtButton = this.interactItemMenu.create(menuDo3.x + 2, menuDo3.y + 2, 'menu-item-btn');
            // look at text
            this.lookAtText = game.add.text(
                this.lookAtButton.x + 2,
                this.lookAtButton.y + 2,
                'LOOK AT',
                {
                    font: "14px naz",
                    fill: '#000',
                    align: 'left'
                }
            );
            // look at actions
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                var i,
                    txt = dialog.cauldron[0];
                if (this.inventory.jar_fuel.count === 1) {
                    txt = dialog.cauldron[5];
                } else {
                    if (cauldronList.length > 0) {
                        txt = '';
                        for (i = 0; i < cauldronList.length; i++) {
                            txt += '"' + this.inventory[cauldronList[i]].title + '"';
                            if (i !== cauldronList.length - 1) {
                                txt += ' and ';
                            }
                        }
                        txt = dialog.cauldron[1] + txt;
                    }
                }
                this.showTopText(this.topText, txt);
            }, {topText:this.topText, showTopText:this.showTopText, inventory: inventory});

            // use with
            this.useWithButton = this.interactItemMenu.create(menuDo3.x + 2, menuDo3.y + 44, 'menu-item-btn');
            // use with text
            this.useWithText = game.add.text(
                this.useWithButton.x + 2,
                this.useWithButton.y + 2,
                'USE WITH',
                {
                    font: "14px naz",
                    fill: '#000',
                    align: 'left'
                }
            );

            // stir
            this.stirButton = this.interactItemMenu.create(menuDo3.x + 2, menuDo3.y + 84, 'menu-item-btn');
            // stir text
            this.stirText = game.add.text(
                this.stirButton.x + 2,
                this.stirButton.y + 2,
                'STIR',
                {
                    font: "14px naz",
                    fill: '#000',
                    align: 'left'
                }
            );

            // use with actions
            this.useWithButton.inputEnabled = true;
            this.useWithButton.events.onInputDown.add(function(useWithPointer) {
                var item1Txt = '?',
                    item2Txt = '?';
                this.useWithButton.inputEnabled = false;

                // remove closeButton
                this.interactItemMenu.remove(this.closeButton);

                // item inner menu
                this.interactInnerMenu = this.interactItemMenu.create(menuDo3.x + 100, menuDo3.y, 'menu-items-2');
                this.item1Button = this.interactItemMenu.create(menuDo3.x + 122, menuDo3.y + 2, 'menu-item-btn');
                // item 1 text
                if (this.inventory.socks.count === 1) {
                    item1Txt = 'SWEATY SOCKS';
                }
                this.item1Text = game.add.text(
                    this.item1Button.x + 2,
                    this.item1Button.y + 2,
                    item1Txt,
                    {
                        font: "14px naz",
                        fill: '#000',
                        align: 'left'
                    }
                );
                this.item2Button = this.interactItemMenu.create(menuDo3.x + 122, menuDo3.y + 44, 'menu-item-btn');
                // item 2 text
                if (this.inventory.jar_water.count === 1) {
                    item2Txt = 'MYSTIC WATER';
                }
                this.item2Text = game.add.text(
                    this.item2Button.x + 2,
                    this.item2Button.y + 2,
                    item2Txt,
                    {
                        font: "14px naz",
                        fill: '#000',
                        align: 'left'
                    }
                );

                // re-add close button
                this.closeButton = this.interactItemMenu.create(menuDo3.x + 202, menuDo3.y - 42, 'menu-close-btn');

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
                                this.interactItemMenu.remove(this.stirButton);

                                this.interactItemMenu.remove(this.item1Button);
                                this.interactItemMenu.remove(this.item2Button);
                                this.interactItemMenu.remove(this.interactInnerMenu);
                                this.interactItemMenu.remove(this.closeButton);

                                this.lookAtText.destroy();
                                this.useWithText.destroy();
                                this.stirText.destroy();
                                if (this.item1Text) { this.item1Text.destroy(); }
                                if (this.item2Text) { this.item2Text.destroy(); }

                                menuOpened = false;
                            }
                        }
                    }, {topText:this.topText, showTopText:this.showTopText, inventory:this.inventory, cauldronList:this.cauldronList, interactItemMenu: this.interactItemMenu, menu: this.menu, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, stirButton: this.stirButton, interactInnerMenu: this.interactInnerMenu, item1Button: this.item1Button, item2Button:this.item2Button, closeButton:this.closeButton, item1Text: this.item1Text, item2Text: this.item2Text, lookAtText: this.lookAtText, useWithText: this.useWithText, stirText: this.stirText});
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
                                this.interactItemMenu.remove(this.stirButton);

                                this.interactItemMenu.remove(this.item1Button);
                                this.interactItemMenu.remove(this.item2Button);
                                this.interactItemMenu.remove(this.interactInnerMenu);
                                this.interactItemMenu.remove(this.closeButton);

                                this.lookAtText.destroy();
                                this.useWithText.destroy();
                                this.stirText.destroy();
                                if (this.item1Text) { this.item1Text.destroy(); }
                                if (this.item2Text) { this.item2Text.destroy(); }

                                menuOpened = false;
                            }
                        }
                    }, {topText:this.topText, showTopText:this.showTopText, inventory:this.inventory, cauldronList:this.cauldronList, interactItemMenu: this.interactItemMenu, menu: this.menu, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, stirButton: this.stirButton, interactInnerMenu: this.interactInnerMenu, item1Button: this.item1Button, item2Button:this.item2Button, closeButton:this.closeButton, item1Text: this.item1Text, item2Text: this.item2Text, lookAtText: this.lookAtText, useWithText: this.useWithText, stirText: this.stirText});
                } else if (this.inventory.jar_water.count === 0) {
                    // show question mark
                }

                // nothing in inventory
                if ((this.inventory.socks.count === 0) && (this.inventory.jar_water.count === 0)) {
                    if (this.inventory.jar_fuel.count === 1) {
                        this.showTopText(this.topText, this.dialog.cauldron[6]);
                    } else {
                        this.showTopText(this.topText, this.dialog.cauldron[7]);
                    }
                }

                // re-add closeButton actions
                this.closeButton.inputEnabled = true;
                this.closeButton.events.onInputDown.add(function(closePointer) {
                    this.interactItemMenu.remove(this.menu);
                    this.interactItemMenu.remove(this.lookAtButton);
                    this.interactItemMenu.remove(this.useWithButton);
                    this.interactItemMenu.remove(this.stirButton);
                    this.interactItemMenu.remove(this.item1Button);
                    this.interactItemMenu.remove(this.item2Button);
                    this.interactItemMenu.remove(this.interactInnerMenu);
                    this.interactItemMenu.remove(closePointer);

                    this.lookAtText.destroy();
                    this.useWithText.destroy();
                    this.stirText.destroy();
                    if (this.item1Text) { this.item1Text.destroy(); }
                    if (this.item2Text) { this.item2Text.destroy(); }

                    menuOpened = false;
                }, {interactItemMenu: this.interactItemMenu, menu: menuDo3, interactInnerMenu: this.interactInnerMenu, item1Button:this.item1Button, item2Button:this.item2Button, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, stirButton: this.stirButton, item1Text: this.item1Text, item2Text: this.item2Text, lookAtText: this.lookAtText, useWithText: this.useWithText, stirText: this.stirText});


            }, {inventory: inventory, dialog: dialog, items: this.items, item: pointer, cauldronList: cauldronList, interactItemMenu: this.interactItemMenu, menu: menuDo3, interactInnerMenu: this.interactInnerMenu, item1Button:this.item1Button, item2Button:this.item2Button, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, stirButton: this.stirButton, item1Text: this.item1Text, item2Text: this.item2Text, lookAtText: this.lookAtText, useWithText: this.useWithText, stirText: this.stirText, closeButton: this.closeButton, showTopText: this.showTopText, topText: this.topText });

            // stir
            this.stirButton.inputEnabled = true;
            this.stirButton.events.onInputDown.add(function(stirPointer) {
                var txt = '';
                if (hasStrength) {
                    if (this.inventory.jar_fuel.count === 1) {
                        this.showTopText(this.topText, this.dialog.cauldron[6]);
                    } else {
                        if (cauldronList.length === 2) {
                            txt = this.dialog.cauldron[4];
                            this.inventory.jar.count = 0;
                            this.inventory.jar_fuel.count = 1;

                            console.log('inventory = ' , this.inventory);
                        } else {
                            txt = this.dialog.cauldron[2];
                        }
                    }
                } else {
                    txt = this.dialog.cauldron[3];
                }
                this.showTopText(this.topText, txt);
            }, {topText:this.topText, showTopText:this.showTopText, inventory: inventory, dialog: dialog});

            // close button
            this.closeButton.inputEnabled = true;
            this.closeButton.events.onInputDown.add(function(closePointer) {
                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.useWithButton);
                this.interactItemMenu.remove(this.stirButton);
                this.interactItemMenu.remove(this.item1Button);
                this.interactItemMenu.remove(this.item2Button);
                this.interactItemMenu.remove(this.interactInnerMenu);
                this.interactItemMenu.remove(closePointer);

                this.lookAtText.destroy();
                this.useWithText.destroy();
                this.stirText.destroy();
                if (this.item1Text) { this.item1Text.destroy(); }
                if (this.item2Text) { this.item2Text.destroy(); }

                menuOpened = false;
            }, {interactItemMenu: this.interactItemMenu, menu: menuDo3, interactInnerMenu: this.interactInnerMenu, item1Button:this.item1Button, item2Button:this.item2Button, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, stirButton: this.stirButton, item1Text: this.item1Text, item2Text: this.item2Text, lookAtText: this.lookAtText, useWithText: this.useWithText, stirText: this.stirText});
        } // end if cauldron
    },
    showTopText: function(topText, str) {
        topText.text = str;
        //game.time.events.add(Phaser.Timer.SECOND * 5, function(){topText.text = '';}, this);
    }
};