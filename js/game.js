var GAME_WIDTH = 720,
    GAME_HEIGHT = 480,

    // Phaser game object
    game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game_div', { preload: this.preload, create: this.create, update: this.update, render: this.render }),

    // background
    bg,

    // world
    world,

    // title
    title,

    // buttons
    playButton,
    playAgainButton,
    mainMenuButton,
    gameTitle,

    // header text style
    STYLE_HEADER = {
        font: "24px dimbo",
        fill: '#fff',
        stroke: '#333',
        strokeThickness: 4,
        align: 'center'
    },

    // body text style
    STYLE_BODY = {
        font: "18px dimbo",
        fill: '#fff',
        stroke: '#333',
        strokeThickness: 4,
        align: 'center'
    },

    currentScene = 'scene-spaceship',

    // backpack on screen opens inventory menu
    backpack,

    inventoryMenu,

    dialogMenu,

    bookMenu,

    // player
    player,

    // player position
    playerLeftX = 72,
    playerRightX = 648,
    playerX = GAME_WIDTH/2,
    playerY = 400,

    // items
    items = null,

    // scene - spaceship
    socks = null,

    // inventory for items that can be picked up
    inventory = {
        // scene - spaceship
        'socks': {
            'count': 0,
            'description': 'Socks'
        },

        // scene - tent
        'jar': {
            'count': 0,
            'description': 'Jar'
        },
        'jar_fuel': {
            'count': 0,
            'description': 'Jar full of fuel'
        },

        // scene - lake
        'jar_water' : {
            'count': 0,
            'description': 'Jar full of water'
        },
        'wood': {
            'count': 0,
            'description': 'Wood'
        }
    },

    // things in scenes that can be interacted with but can't be collected in inventory

    // scene - spaceship
    spaceship, // USE WITH - fuel, wood
    tree, // CHOP

    // scene - tent
    bookLake, // how to make fuel.  READ
    bookTrees, // how to make ship parts.  READ
    cauldron, // USE WITH - jar_water, socks.


    // player properties
    hasStrength = false, // 'true' after chopping wood


    // dialog
    dialog = {
        'book_lake': {
            '0': 'Properties of lake, how to make fuel.'
        },
        'book_trees': {
            '0': 'Properties of wood, using it on vehicles.'
        },
        'cauldron': {
            '0': 'Combine 3 items to make something cool.'
        },
        'cauldron_contains': {
            '0': 'The cauldron contains: '
        },
        'ending': {
            'spaceship': {
                '0': 'Spaceship ending!'
            },
            'monster_by_fuel': {
                '0': 'Monster by fuel ending!'
            },
            'zombie_by_water': {
                '0': 'Zombie by water ending!'
            }
        },
        'made_fuel': {
            '0': 'Fuel was created.'
        },
        'nothing': {
            '0': 'Nothing happened!'
        },
        'strength': {
            '0': 'I suddenly feel much stronger!'
        }
    },

    menuOptions = {
        'LOOK_AT': 'LOOK AT',
        'MIX': 'MIX',
        'PICK_UP': 'PICK UP',
        'READ': 'READ',
        'USE_WITH': 'USE WITH'
    },

    isGameOver;

// booting / preloading assets
Game = function () {
    this.loadText = null;
};
Game.prototype = {
   preload: function() {
        // loading screen
        game.stage.backgroundColor = '#000';
        this.loadText = game.add.text(
            GAME_WIDTH/2,
            GAME_HEIGHT/2,
            'Loading things, blah blah blah...',
            {
                font: "24px dimbo",
                fill: '#fff',
                align: 'center'
            }
        );
        this.loadText.anchor.setTo(0.5,0.5);

        // preload all of the game assets

        // menu assets
        // game.load.image('title', 'img/title.png');
        // game.load.image('playButton', 'img/play-btn.png', 180, 44);
        // game.load.image('mainMenuButton', 'img/main-menu-btn.png', 180, 44);
        // game.load.image('playAgainButton', 'img/play-again-btn.png', 180, 44);

        // player assets
        game.load.spritesheet('chibi-walk', 'img/chibi-walk.png', 100, 150, 1);

        // background assets
        game.load.image('bg-spaceship', 'img/bg-spaceship.png', 720, 480);
        game.load.image('bg-lake', 'img/bg-lake.png', 720, 480);
        game.load.image('bg-tent', 'img/bg-tent.png', 720, 480);

        // items
        game.load.image('crackers', 'img/items/crackers.png', 40, 40);
        game.load.image('socks', 'img/items/socks.png', 40, 40);

    },
    create: function() {
        game.state.start('scene-spaceship');
    },
    collectItem: function(player, item) {
        console.log('collect: ' + item.key);
        inventory[item.key].count = 1;
        this.removeItem(item);
        console.log('inventory = ' , inventory);
    },
    removeItem: function(itemSprite) {
        items.remove(itemSprite);
    }
};