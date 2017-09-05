SceneSpaceship = function() {
    this.items = null;
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

        // crackers
        if (inventory.crackers.count === 0) {
            crackers = this.items.create(540, 300, 'crackers');
            crackers.body.setSize(40, 40, 0, 0);
            crackers.anchor.setTo(0.5,0.5);
        }

        // socks
        if (inventory.socks.count === 0) {
            socks = this.items.create(580, 400, 'socks');
            socks.body.setSize(40, 40, 0, 0);
            socks.anchor.setTo(0.5,0.5);
        }

        console.log('player ' , player);

    },
    update: function() {
        // collect item
        game.physics.arcade.overlap(
            player.sprite,
            this.items,
            this.collectItem,
            null, this
        );
    },
    collectItem: function(player, item) {
        console.log('collect: ' + item.key);
        inventory[item.key].count = 1;
        //game.removeItem(item);
        this.items.remove(item);
        console.log('inventory = ' , inventory);
    }
};