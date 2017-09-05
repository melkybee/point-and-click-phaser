SceneSpaceship = function() {
    this.items = null;
    this.inputHandler = null;
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

        // items
        this.items = game.add.group();
        this.items.enableBody = true;
        this.items.physicsBodyType = Phaser.Physics.ARCADE;

        console.log('items ' , this.items);

        // socks
        if (inventory.socks.count === 0) {
            socks = this.items.create(580, 400, 'socks');
            socks.body.setSize(40, 40, 0, 0);
            socks.anchor.setTo(0.5,0.5);
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
            // open menuDoLookPick
        } else if (pointer.key === 'spaceship') {
            // open menuDoLookUse > open menuItems
        }
    }
};