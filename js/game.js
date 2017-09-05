var GAME_WIDTH = 720,
    GAME_HEIGHT = 480,

    // Phaser game object
    game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game_div', { preload: this.preload, create: this.create, update: this.update, render: this.render }),

    // buttons
    playButton,
    playAgainButton,
    mainMenuButton,
    closeButton,

    // game title
    gameTitle,

    // tap
    tap,

    // current scene
    currentScene = 'scene-spaceship',

    // inventory menu
    inventoryMenu,

    // interact item menu
    interactItemMenu,

    // player
    player,

    // player position
    playerLeftX = 72,
    playerRightX = 648,
    playerX = GAME_WIDTH/2,
    playerY = 400,

    // items
    items = null,

    pickedUpJar = false,

    // inventory for items that can be picked up
    inventory = {
        // scene - spaceship
        'socks': {
            'key': 'socks',
            'count': 0,
            'title': 'A pair of sweaty socks',
            'description': 'Ew! My smelly socks still fresh with perspiration.'
        },

        // scene - tent
        'jar': {
            'key': 'jar',
            'count': 0,
            'title': 'An empty glass jar',
            'description': 'Ah! An empty jar! I wonder what I can fill this up with.'
        },
        'jar_fuel': {
            'key': 'jar_fuel',
            'count': 0,
            'title': 'A jar full of fuel',
            'description': 'Yay! Now I have a jar full of fuel!'
        },

        // scene - lake
        'jar_water' : {
            'key': 'jar_water',
            'count': 0,
            'title': 'A jar full of water',
            'description': 'The jar is now full of water.'
        }
    },

    // things in scenes that can be interacted with

    // scene - spaceship
    socks = null,  // LOOK AT, PICK UP
    spaceship = null,  // LOOK AT, USE WITH - fuel, wood

    // scene - tent
    cauldron = null,  // LOOK AT, USE WITH - water/socks
    jar = null,  // LOOK AT, PICK UP, USE WITH - water, fuel
    book = null,  // READ

    // scene - lake
    lake = null,  // LOOK AT, USE WITH - jar
    tree = null,  // LOOK AT, CHOP
    sign = null,  // READ

    // player properties
    hasStrength = false, // 'true' after punching tree

    drankWater = false, // 'true' after drinking lake water

    menuOpened = false,

    cauldronList = [],
    cauldronListMax = 2,

    // dialog
    dialog = {
        'book': {
            '0': 'Chapter 5...How to make fuel...Radioactive water and human sweat!'
        },
        'cauldron': {
            '0': 'An old pot on a stove. Combine 2 items to make something cool.',
            '1': 'The old pot contains: ',
            '2': 'I don\'t have enough things in here yet to stir.',
            '3': 'Grrr...The ladle won\'t budge!',
            '4': 'Stirring...I\'ve made fuel! Putting the fuel now in the jar!',
            '5': 'Nothing there. I\'ve already put the fuel in my glass jar.',
            '6': 'I\'ve made what I needed to make -- fuel! Let\'s fuel up my spaceship and go home!',
            '7': 'I have no items in my inventory that can be added into the pot.'
        },
        'ending': {
            'spaceship_human': {
                '0': 'Regular spaceship ending!'
            },
            'spaceship_mutant': {
                '0': 'Spaceship ending but as a mutant!'
            }
        },
        'lake': {
            '0': 'The water from the lake is almost hypnotizing.',
            '1': 'Glug glug glug! Ohhh...I feel...not the same anymore. What is wrong with me...',
            '2': 'Please, I don\'t wanna drink this anymore.'
        },
        'sign': {
            '0': 'DON\'T DRINK THE WATER!'
        },
        'spaceship': {
            '0': 'My spaceship needs a bit of fuel so I can get home!'
        },
        'tree': {
            '0': 'Punch the tree and get stronger!',
            '1': 'I suddenly feel much stronger!',
            '2': 'Not again! I\'m exhausted!'
        }
    },

    menuOptions = {
        'LOOK_AT': 'LOOK AT',
        'PICK_UP': 'PICK UP',
        'PUNCH': 'PUNCH',
        'READ': 'READ',
        'STIR': 'STIR',
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
            'Loading things...',
            {
                font: "24px coolstory",
                fill: '#fff',
                align: 'center'
            }
        );
        this.loadText.anchor.setTo(0.5,0.5);

        // preload all of the game assets

        // menu assets
        // game.load.image('title', 'img/title.png');
        game.load.image('playButton', 'img/play-btn.png', 180, 44);
        game.load.image('mainMenuButton', 'img/main-menu-btn.png', 180, 44);

        // player assets
        game.load.spritesheet('chibi-walk', 'img/chibi-walk.png', 46, 76, 2);

        // background assets
        game.load.image('bg-spaceship', 'img/bg-spaceship.png', 720, 480);
        game.load.image('bg-lake', 'img/bg-lake.png', 720, 480);
        game.load.image('bg-tent', 'img/bg-tent.png', 720, 480);

        // items for inventory
        game.load.image('socks', 'img/items/socks.png', 32, 42);
        game.load.image('jar', 'img/items/jar.png', 25, 40);

        // items that can't be picked up but can be interacted with
        game.load.image('spaceship', 'img/items/spaceship.png', 436, 236);
        game.load.image('cauldron', 'img/items/cauldron.png', 58, 75);
        game.load.image('lake', 'img/items/lake.png', 400, 100);
        game.load.image('sign', 'img/items/sign.png', 42, 52);
        game.load.image('tree', 'img/items/tree.png', 112, 184);
        game.load.image('shed', 'img/items/shed.png', 314, 228);

        // item menu assets
        game.load.image('menu-do-1', 'img/menus/menuDo1.png', 100, 60);
        game.load.image('menu-do-2', 'img/menus/menuDo2.png', 100, 100);
        game.load.image('menu-do-3', 'img/menus/menuDo3.png', 100, 140);

        game.load.image('menu-items-1', 'img/menus/menuItems1.png', 120, 40);
        game.load.image('menu-items-2', 'img/menus/menuItems2.png', 120, 80);
        game.load.image('menu-items-3', 'img/menus/menuItems3.png', 120, 120);

        game.load.image('menu-item-btn', 'img/menus/menuItemButton.png', 80, 24);

        game.load.image('menu-close-btn', 'img/menus/closeButton.png', 30, 30);

    },
    create: function() {
        game.state.start('title');
    },
    collectItem: function(player, item) {
        console.log('collect: ' + item.key);
        inventory[item.key].count = 1;
        this.items.remove(item);
        console.log('inventory = ' , inventory);
    }
};