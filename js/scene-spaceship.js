SceneSpaceship = function() {
    this.items = null;
    this.interactItemMenu = null;

    this.lookAtButton = null;
    this.pickUpButton = null;
    this.useWithButton = null;
    this.closeButton = null;

    this.topText = null;

    this.lookAtText = null;
    this.pickUpText = null;
    this.useWithText = null;
    this.item1Text = null;
};

SceneSpaceship.prototype = {
    preload: function() {
        currentScene = 'scene-spaceship';
        player = new Player();
        menuOpened = false;
    },
    create: function() {
        this.background = game.add.sprite(0, 0, 'bg-spaceship');

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
                socks = this.items.create(198, 398, 'socks');
                socks.anchor.setTo(0,0);
                socks.inputEnabled = true;
                socks.events.onInputDown.add(this.interactItem, this);
            }
        }

        // spaceship
        spaceship = this.items.create(275, 108, 'spaceship');
        spaceship.anchor.setTo(0,0);
        spaceship.inputEnabled = true;
        spaceship.events.onInputDown.add(this.interactItem, this);

        // player
        player.create();

        this.topText = game.add.text(
            20,
            20,
            '',
            {
                font: "20px coolstory",
                fill: '#fff',
                align: 'left',
                stroke: '#000',
                strokeThickness: 10
            }
        );

    },
    update: function() {
    },
    openInventory: function(pointer) {

    },
    interactItem: function(pointer) {
        if (pointer.key === 'socks') {
            if (menuOpened) {
                return;
            }
            menuOpened = true;
            // open menu-do-2
            menuDo2 = this.interactItemMenu.create(socks.x, socks.y - 100, 'menu-do-2');

            // close
            this.closeButton = this.interactItemMenu.create(menuDo2.x + 102, menuDo2.y - 42, 'menu-close-btn');

            // look at
            this.lookAtButton = this.interactItemMenu.create(menuDo2.x + 2, menuDo2.y + 2, 'menu-item-btn');
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                this.showTopText(this.topText, inventory.socks.description);
            }, {topText:this.topText, showTopText:this.showTopText});
            // look at text
            this.lookAtText = game.add.text(
                this.lookAtButton.x + 2,
                this.lookAtButton.y + 2,
                'LOOK AT',
                {
                    font: "14px coolstory",
                    fill: '#000',
                    align: 'left'
                }
            );

            // pick up
            this.pickUpButton = this.interactItemMenu.create(menuDo2.x + 2, menuDo2.y + 44, 'menu-item-btn');

            // pick up text
            this.pickUpText = game.add.text(
                this.pickUpButton.x + 2,
                this.pickUpButton.y + 2,
                'PICK UP',
                {
                    font: "14px coolstory",
                    fill: '#000',
                    align: 'left'
                }
            );

            // pick up actions
            this.pickUpButton.inputEnabled = true;
            this.pickUpButton.events.onInputDown.add(function(pickUpPointer) {

                this.inventory[this.item.key].count = 1;
                this.items.remove(this.item);

                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.pickUpButton);
                this.lookAtText.destroy();
                this.pickUpText.destroy();
                this.interactItemMenu.remove(this.closeButton);

                menuOpened = false;

                this.showTopText(this.topText, 'Picked up "' + this.inventory[this.item.key].title + '"');

            }, {inventory: inventory, items: this.items, item: pointer, interactItemMenu: this.interactItemMenu, menu: menuDo2, lookAtButton: this.lookAtButton, pickUpButton: this.pickUpButton, lookAtText: this.lookAtText, pickUpText: this.pickUpText, closeButton: this.closeButton, showTopText: this.showTopText, topText: this.topText });

            // close
            this.closeButton.inputEnabled = true;
            this.closeButton.events.onInputDown.add(function(closePointer) {
                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.pickUpButton);
                this.lookAtText.destroy();
                this.pickUpText.destroy();
                this.interactItemMenu.remove(closePointer);

                menuOpened = false;
            }, {interactItemMenu: this.interactItemMenu, menu: menuDo2, lookAtButton: this.lookAtButton, pickUpButton: this.pickUpButton, lookAtText: this.lookAtText, pickUpText: this.pickUpText});
        } else if (pointer.key === 'spaceship') {
            if (menuOpened) {
                return;
            }

            menuOpened = true;
            // open menu-do-2
            menuDo2 = this.interactItemMenu.create(spaceship.x + 100, spaceship.y + 40, 'menu-do-2');

            // close
            this.closeButton = this.interactItemMenu.create(menuDo2.x + 102, menuDo2.y - 42, 'menu-close-btn');

            // look at
            this.lookAtButton = this.interactItemMenu.create(menuDo2.x + 2, menuDo2.y + 2, 'menu-item-btn');
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                var txt = dialog.spaceship[0];
                this.showTopText(this.topText, txt);
            }, {topText:this.topText, showTopText:this.showTopText});
            // look at text
            this.lookAtText = game.add.text(
                this.lookAtButton.x + 2,
                this.lookAtButton.y + 2,
                'LOOK AT',
                {
                    font: "14px coolstory",
                    fill: '#000',
                    align: 'left'
                }
            );

            // use with
            this.useWithButton = this.interactItemMenu.create(menuDo2.x + 2, menuDo2.y + 44, 'menu-item-btn');

            // use with text
            this.useWithText = game.add.text(
                this.useWithButton.x + 2,
                this.useWithButton.y + 2,
                'USE WITH',
                {
                    font: "14px coolstory",
                    fill: '#000',
                    align: 'left'
                }
            );

            // use with actions
            this.useWithButton.inputEnabled = true;
            this.useWithButton.events.onInputDown.add(function(useWithPointer) {
                var item1Txt = '?';
                this.useWithButton.inputEnabled = false;

                // remove closeButton
                this.interactItemMenu.remove(this.closeButton);

                // item inner menu
                this.interactInnerMenu = this.interactItemMenu.create(menuDo2.x + 100, menuDo2.y, 'menu-items-1');
                // item 1
                this.item1Button = this.interactItemMenu.create(menuDo2.x + 122, menuDo2.y + 2, 'menu-item-btn');
                // item 1 text
                if (this.inventory.jar_fuel.count === 1) {
                    item1Txt = 'JAR OF FUEL';
                }
                this.item1Text = game.add.text(
                    this.item1Button.x + 2,
                    this.item1Button.y + 2,
                    item1Txt,
                    {
                        font: "14px coolstory",
                        fill: '#000',
                        align: 'left'
                    }
                );

                // re-add close button
                this.closeButton = this.interactItemMenu.create(menuDo2.x + 202, menuDo2.y - 42, 'menu-close-btn');

                // item 1
                if (this.inventory.jar_fuel.count === 1) {
                    this.item1Button.inputEnabled = true;
                    this.item1Button.events.onInputDown.add(function(item1Pointer) {
                        this.showTopText(this.topText, 'Fueling up my spaceship...');
                        this.inventory.jar.count = 1;
                        this.inventory.jar_fuel.count = 0;

                        console.log('inventory = ' , this.inventory);

                        this.interactItemMenu.remove(this.menu);
                        this.interactItemMenu.remove(this.lookAtButton);
                        this.interactItemMenu.remove(this.useWithButton);
                        this.lookAtText.destroy();
                        this.useWithText.destroy();
                        this.item1Text.destroy();

                        this.interactItemMenu.remove(this.item1Button);
                        this.interactItemMenu.remove(this.interactInnerMenu);
                        this.interactItemMenu.remove(this.closeButton);

                        menuOpened = false;

                        // CONGRATULATIONS! YOU BEAT THE GAME!
                        isGameOver = true;

                        if (drankWater) {
                            // GO TO ENDING - SPACESHIP AS MUTANT
                            console.log('GO TO ENDING - SPACESHIP AS MUTANT');
                        } else {
                            // GO TO ENDING - SPACESHIP AS HUMAN
                            console.log('GO TO ENDING - SPACESHIP AS HUMAN');
                        }


                    }, {topText:this.topText, showTopText:this.showTopText, inventory:this.inventory, interactItemMenu: this.interactItemMenu, menu: this.menu, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, lookAtText: this.lookAtText, useWithText: this.useWithText, interactInnerMenu: this.interactInnerMenu, item1Button: this.item1Button, item1Text: this.item1Text, closeButton:this.closeButton});

                } else {
                    this.showTopText(this.topText, 'You have no items in your inventory that can be used with the spaceship.');
                }

                // re-add closeButton actions
                this.closeButton.inputEnabled = true;
                this.closeButton.events.onInputDown.add(function(closePointer) {
                    this.interactItemMenu.remove(this.menu);
                    this.interactItemMenu.remove(this.lookAtButton);
                    this.interactItemMenu.remove(this.useWithButton);
                    this.lookAtText.destroy();
                    this.useWithText.destroy();
                    this.item1Text.destroy();

                    this.interactItemMenu.remove(this.item1Button);
                    this.interactItemMenu.remove(this.interactInnerMenu);
                    this.interactItemMenu.remove(closePointer);

                    menuOpened = false;
                }, {interactItemMenu: this.interactItemMenu, menu: menuDo2, interactInnerMenu: this.interactInnerMenu, item1Button: this.item1Button, item1Text: this.item1Text, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, lookAtText: this.lookAtText, useWithText: this.useWithText});
            }, {inventory: inventory, items: this.items, item: pointer, interactItemMenu: this.interactItemMenu, menu: menuDo2, interactInnerMenu: this.interactInnerMenu, item1Button: this.item1Button, item1Text: this.item1Text, lookAtButton: this.lookAtButton, pickUpButton: this.pickUpButton, useWithButton: this.useWithButton, lookAtText: this.lookAtText, pickUpText: this.pickUpText, useWithText: this.useWithText, closeButton:this.closeButton, showTopText: this.showTopText, topText: this.topText });

            // close button
            this.closeButton.inputEnabled = true;
            this.closeButton.events.onInputDown.add(function(closePointer) {
                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.useWithButton);
                this.lookAtText.destroy();
                this.useWithText.destroy();
                if (this.item1Text) { this.item1Text.destroy(); }

                this.interactItemMenu.remove(this.item1Button);
                this.interactItemMenu.remove(this.interactInnerMenu);
                this.interactItemMenu.remove(closePointer);

                menuOpened = false;
            }, {interactItemMenu: this.interactItemMenu, menu: menuDo2, interactInnerMenu: this.interactInnerMenu, item1Button: this.item1Button, item1Text: this.item1Text, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, lookAtText: this.lookAtText, useWithText: this.useWithText});
        }
    },
    showTopText: function(topText, str) {
        topText.text = str;
        //game.time.events.add(Phaser.Timer.SECOND * 5, function(){topText.text = '';}, this);
    }
};