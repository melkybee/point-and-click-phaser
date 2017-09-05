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

        /*
        // wood
        if (inventory.wood.count === 0) {
            wood = this.items.create(580, 400, 'wood');
            wood.anchor.setTo(0,0);
            wood.inputEnabled = true;
            wood.events.onInputDown.add(this.interactItem, this);
        }
        */

        console.log('player ' , player);

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

        console.log('tt ' , this.topText);

    },
    update: function() {
    },
    interactItem: function(pointer) {
        console.log('clicked on = ' + pointer.key);
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
                console.log('item = ' , this.item);

                // item 1
                if (this.inventory.jar.count === 1 && this.jarState === 'EMPTY') {
                    this.interactInnerMenu = this.interactItemMenu.create(menuDo2.x + 100, menuDo2.y, 'menu-items-1');
                    this.item1Button = this.interactItemMenu.create(menuDo2.x + 122, menuDo2.y + 2, 'menu-item-btn');
                    this.item1Button.inputEnabled = true;
                    this.item1Button.events.onInputDown.add(function(item1Pointer) {
                        console.log('item 1 ');
                        this.showTopText(this.topText, 'The jar is now full of water from the lake.');
                        this.jarState = 'WATER';
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
                    this.showTopText(this.topText, 'You have no items in your inventory use with the lake.');
                }
            }, {inventory: inventory, items: this.items, item: pointer, jarState: jarState, interactItemMenu: this.interactItemMenu, menu: menuDo2, interactInnerMenu: this.interactInnerMenu, item1Button:this.item1Button, item2Button:this.item2Button, lookAtButton: this.lookAtButton, pickUpButton: this.pickUpButton, useWithButton: this.useWithButton, showTopText: this.showTopText, topText: this.topText });
            this.closeButton.inputEnabled = true;
            this.closeButton.events.onInputDown.add(function(closePointer) {
                this.interactItemMenu.remove(this.menu);
                this.interactItemMenu.remove(this.lookAtButton);
                this.interactItemMenu.remove(this.useWithButton);
                this.interactItemMenu.remove(closePointer);

                menuOpened = false;
            }, {interactItemMenu: this.interactItemMenu, menu: menuDo2, lookAtButton: this.lookAtButton, useWithButton: this.useWithButton});
        } // end if lake
    },
    showTopText: function(topText, str) {
        console.log('t ' , topText);
        topText.text = str;
        game.time.events.add(Phaser.Timer.SECOND * 5, function(){topText.text = '';}, this);
    }
};