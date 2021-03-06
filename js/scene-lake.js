SceneLake = function() {
    this.items = null;
    this.interactItemMenu = null;
    this.lookAtButton = null;
    this.chopButton = null;
    this.drinkButton = null;
    this.pickUpButton = null;
    this.useWithButton = null;
    this.closeButton = null;
    this.topText = null;

    this.lookAtText = null;
    this.chopText = null;
    this.drinkText = null;
    this.pickUpText = null;
    this.useWithText = null;
    this.item1Text = null;
};

SceneLake.prototype = {
    preload: function() {
        currentScene = 'scene-lake';
        player = new Player();
        menuOpened = false;
    },
    create: function() {
        // google analytics
        trackGaEvent('Scene', 'View', 'Lake');
        this.background = game.add.sprite(0, 0, 'bg-lake');

        // items
        this.items = game.add.group();

        // sign
        sign = this.items.create(410, 380, 'sign');
        sign.anchor.setTo(0,0);
        sign.inputEnabled = true;
        sign.events.onInputDown.add(this.interactItem, this);

        // tree
        tree = this.items.create(450, 120, 'tree');
        tree.anchor.setTo(0,0);
        tree.inputEnabled = true;
        tree.events.onInputDown.add(this.interactItem, this);

        // player
        player.create();

        // lake
        lake = this.items.create(0, 394, 'lake');
        lake.anchor.setTo(0,0);
        lake.inputEnabled = true;
        lake.events.onInputDown.add(this.interactItem, this);

        // interactItemMenu
        this.interactItemMenu = game.add.group();

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
        player.update();
    },
    openInventory: function(pointer) {

    },
    interactItem: function(pointer) {
        if (pointer.key === 'lake') {
            if (menuOpened) {
                return;
            }
            // google analytics
            trackGaEvent('Item', 'Click', 'Lake');
            menuOpened = true;
            // open menu-do-2
            menuDo3 = this.interactItemMenu.create(lake.x + 200, lake.y - 100, 'menu-do-3');

            // close
            this.closeButton = this.interactItemMenu.create(menuDo3.x + 102, menuDo3.y - 32, 'menu-close-btn');

            // look at
            this.lookAtButton = this.interactItemMenu.create(menuDo3.x + 10, menuDo3.y + 10, 'menu-item-btn');
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                var txt = dialog.lake[0];
                // google analytics
                trackGaEvent('Button', 'Click', 'Lake - Look At');
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
            this.useWithButton = this.interactItemMenu.create(menuDo3.x + 10, menuDo3.y + 48, 'menu-item-btn');

            // drink
            this.drinkButton = this.interactItemMenu.create(menuDo3.x + 10, menuDo3.y + 84, 'menu-item-btn');

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

            // drink text
            this.drinkText = game.add.text(
                this.drinkButton.x + 2,
                this.drinkButton.y + 2,
                'DRINK',
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
                // google analytics
                trackGaEvent('Button', 'Click', 'Lake - Use With');
                this.useWithButton.inputEnabled = false;

                // remove closeButton
                this.interactItemMenu.remove(this.closeButton);

                // item inner menu
                this.interactInnerMenu = this.interactItemMenu.create(menuDo3.x + 100, menuDo3.y, 'menu-items-1');
                this.item1Button = this.interactItemMenu.create(menuDo3.x + 130, menuDo3.y + 10, 'menu-item-btn');

                // re-add close button
                this.closeButton = this.interactItemMenu.create(menuDo3.x + 202, menuDo3.y - 32, 'menu-close-btn');

                // item 1 text
                if (this.inventory.jar.count === 1) {
                    item1Txt = 'EMPTY JAR';
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

                // item 1
                if (this.inventory.jar.count === 1) {
                    this.item1Button.inputEnabled = true;
                    this.item1Button.events.onInputDown.add(function(item1Pointer) {
                        // google analytics
                        trackGaEvent('Button', 'Click', 'Lake - Use With - Jar');
                        this.showTopText(this.topText, 'The jar is now full of water from the lake.');
                        this.inventory.jar_water.count = 1;
                        this.inventory.jar.count = 0;

                        this.interactItemMenu.remove(this.menu);
                        this.interactItemMenu.remove(this.lookAtButton);
                        this.interactItemMenu.remove(this.useWithButton);
                        this.interactItemMenu.remove(this.drinkButton);

                        this.interactItemMenu.remove(this.item1Button);
                        this.interactItemMenu.remove(this.interactInnerMenu);
                        this.interactItemMenu.remove(this.closeButton);

                        this.lookAtText.destroy();
                        this.useWithText.destroy();
                        this.drinkText.destroy();
                        this.item1Text.destroy();

                        menuOpened = false;
                    }, {topText:this.topText, showTopText:this.showTopText, inventory:this.inventory, interactItemMenu: this.interactItemMenu, menu: this.menu, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, drinkButton: this.drinkButton, lookAtText: this.lookAtText, useWithText: this.useWithText, drinkText: this.drinkText, interactInnerMenu: this.interactInnerMenu, item1Button: this.item1Button, item1Text: this.item1Text, closeButton:this.closeButton});

                } else {
                    // google analytics
                    trackGaEvent('Button', 'Click', 'Lake - Use With - No Items');
                    this.showTopText(this.topText, 'I have no items in my inventory that can be used with the lake.');
                }

                // re-add closeButton actions
                this.closeButton.inputEnabled = true;
                this.closeButton.events.onInputDown.add(function(closePointer) {
                    // google analytics
                    trackGaEvent('Button', 'Click', 'Lake - Close');
                    this.interactItemMenu.remove(this.menu);
                    this.interactItemMenu.remove(this.lookAtButton);
                    this.interactItemMenu.remove(this.useWithButton);
                    this.interactItemMenu.remove(this.drinkButton);

                    this.interactItemMenu.remove(this.item1Button);
                    this.interactItemMenu.remove(this.interactInnerMenu);
                    this.interactItemMenu.remove(closePointer);

                    this.lookAtText.destroy();
                    this.useWithText.destroy();
                    this.drinkText.destroy();
                    this.item1Text.destroy();

                    menuOpened = false;
                }, {interactItemMenu: this.interactItemMenu, menu: menuDo3, interactInnerMenu: this.interactInnerMenu, item1Button:this.item1Button, item1Text: this.item1Text, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, drinkButton: this.drinkButton, lookAtText: this.lookAtText, useWithText: this.useWithText, drinkText: this.drinkText});
            }, {inventory: inventory, items: this.items, item: pointer, interactItemMenu: this.interactItemMenu, menu: menuDo3, interactInnerMenu: this.interactInnerMenu, item1Button:this.item1Button, item1Text: this.item1Text, lookAtButton: this.lookAtButton, pickUpButton: this.pickUpButton, useWithButton: this.useWithButton, drinkButton: this.drinkButton, lookAtText: this.lookAtText, pickUpText: this.pickUpText, useWithText: this.useWithText, drinkText: this.drinkText, closeButton:this.closeButton, showTopText: this.showTopText, topText: this.topText });

            // drink
            this.drinkButton.inputEnabled = true;
            this.drinkButton.events.onInputDown.add(function(drinkPointer) {
                var txt = '';
                // google analytics
                trackGaEvent('Button', 'Click', 'Lake - Drink');
                if (drankWater) {
                    txt = dialog.lake[2];
                } else {
                    txt = dialog.lake[1];
                }
                drankWater = true;
                this.showTopText(this.topText, txt);
            }, {topText:this.topText, showTopText:this.showTopText, inventory: inventory});

            // close button
            this.closeButton.inputEnabled = true;
            this.closeButton.events.onInputDown.add(function(closePointer) {
                // google analytics
                trackGaEvent('Button', 'Click', 'Lake - Close');
                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.useWithButton);
                this.interactItemMenu.remove(this.drinkButton);

                this.interactItemMenu.remove(this.item1Button);
                this.interactItemMenu.remove(this.interactInnerMenu);
                this.interactItemMenu.remove(closePointer);

                this.lookAtText.destroy();
                this.useWithText.destroy();
                this.drinkText.destroy();
                if (this.item1Text) { this.item1Text.destroy(); }

                menuOpened = false;
            }, {interactItemMenu: this.interactItemMenu, menu: menuDo3, interactInnerMenu: this.interactInnerMenu, item1Button:this.item1Button, item1Text: this.item1Text, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton, drinkButton: this.drinkButton, lookAtText: this.lookAtText, useWithText: this.useWithText, drinkText: this.drinkText});
        } else if (pointer.key === 'sign') {
            if (menuOpened) {
                return;
            }
            // google analytics
            trackGaEvent('Item', 'Click', 'Sign');
            menuOpened = true;
            // open menu-do-2
            menuDo1 = this.interactItemMenu.create(sign.x + 0, sign.y - 60, 'menu-do-1');
            this.closeButton = this.interactItemMenu.create(menuDo1.x + 102, menuDo1.y - 32, 'menu-close-btn');

            // look at
            this.lookAtButton = this.interactItemMenu.create(menuDo1.x + 10, menuDo1.y + 10, 'menu-item-btn');
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                // google analytics
                trackGaEvent('Button', 'Click', 'Sign - Look At');
                var txt = dialog.sign[0];
                this.showTopText(this.topText, txt);
            }, {topText:this.topText, showTopText:this.showTopText});
            // look at text
            this.lookAtText = game.add.text(
                this.lookAtButton.x + 2,
                this.lookAtButton.y + 2,
                'READ',
                {
                    font: "14px coolstory",
                    fill: '#000',
                    align: 'left'
                }
            );

            // close
            this.closeButton.inputEnabled = true;
            this.closeButton.events.onInputDown.add(function(closePointer) {
                // google analytics
                trackGaEvent('Button', 'Click', 'Sign - Close');
                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.chopButton);
                this.interactItemMenu.remove(closePointer);
                this.lookAtText.destroy();

                menuOpened = false;
            }, {interactItemMenu: this.interactItemMenu, menu: menuDo1, lookAtButton: this.lookAtButton, lookAtText: this.lookAtText});
        } else if (pointer.key === 'tree') {
            if (menuOpened) {
                return;
            }
            // google analytics
            trackGaEvent('Item', 'Click', 'Tree');
            menuOpened = true;
            // open menu-do-2
            menuDo2 = this.interactItemMenu.create(tree.x + 0, tree.y - 60, 'menu-do-2');

            // close button
            this.closeButton = this.interactItemMenu.create(menuDo2.x + 102, menuDo2.y - 32, 'menu-close-btn');

            // look at button
            this.lookAtButton = this.interactItemMenu.create(menuDo2.x + 10, menuDo2.y + 10, 'menu-item-btn');
            this.lookAtButton.inputEnabled = true;
            this.lookAtButton.events.onInputDown.add(function(lookAtPointer) {
                var txt = dialog.tree[0];
                // google analytics
                trackGaEvent('Button', 'Click', 'Tree - Look At');
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

            // chop button
            this.chopButton = this.interactItemMenu.create(menuDo2.x + 10, menuDo2.y + 48, 'menu-item-btn');
            this.chopButton.inputEnabled = true;
            this.chopButton.events.onInputDown.add(function(chopPointer) {
                // google analytics
                trackGaEvent('Button', 'Click', 'Tree - Chop');
                var txt = '';
                if (hasStrength) {
                    txt = dialog.tree[2];
                } else {
                    txt = dialog.tree[1];
                }
                this.showTopText(this.topText, txt);
                hasStrength = true;
            }, {topText:this.topText, showTopText:this.showTopText});
            // chop text
            this.chopText = game.add.text(
                this.chopButton.x + 2,
                this.chopButton.y + 2,
                'PUNCH',
                {
                    font: "14px coolstory",
                    fill: '#000',
                    align: 'left'
                }
            );

            this.closeButton.inputEnabled = true;
            this.closeButton.events.onInputDown.add(function(closePointer) {
                // google analytics
                trackGaEvent('Button', 'Click', 'Tree - Close');
                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.chopButton);
                this.interactItemMenu.remove(closePointer);
                this.lookAtText.destroy();
                this.chopText.destroy();

                menuOpened = false;
            }, {interactItemMenu: this.interactItemMenu, menu: menuDo2, lookAtButton: this.lookAtButton, lookAtText: this.lookAtText, chopButton: this.chopButton, chopText: this.chopText});
        } // end if
    },
    showTopText: function(topText, str) {
        topText.text = str;
        //game.time.events.add(Phaser.Timer.SECOND * 5, function(){topText.text = '';}, this);
    }
};