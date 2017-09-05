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

    // current scene
    currentScene = 'scene-spaceship',

    // backpack on screen opens inventory menu
    backpack,

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

    // things in scenes that can be interacted with

    // scene - spaceship
    socks = null,  // LOOK AT, PICK UP
    spaceship = null,  // LOOK AT, USE WITH - fuel, wood

    // scene - tent
    cauldron = null,  // LOOK AT, USE WITH - water/socks
    jar = null,  // LOOK AT, PICK UP, USE WITH - water, fuel
    bookLake = null,  // READ
    bookTrees = null,  // READ

    // scene - lake
    lake = null,  // LOOK AT, USE WITH - jar
    tree = null,  // LOOK AT, CHOP
    wood = null,  // LOOK AT, PICK UP
    sign = null,  // READ


    // player properties
    hasStrength = false, // 'true' after chopping wood

    menuOpened = false,


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
        'no_way': {
            '0': 'No way!'
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
        'PICK_UP': 'PICK UP',
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
        game.load.image('socks', 'img/items/socks.png', 40, 40);

        // item menu assets
        game.load.image('menu-do-look-chop', 'img/menus/menuDoLookChop.png', 100, 100);
        game.load.image('menu-do-look-pick', 'img/menus/menuDoLookPick.png', 100, 100);
        game.load.image('menu-do-look-use', 'img/menus/menuDoLookUse.png', 100, 100);
        game.load.image('menu-do-look-use-stir', 'img/menus/menuDoLookUseStir.png', 100, 140);
        game.load.image('menu-do-read', 'img/menus/menuDoRead.png', 100, 60);

        game.load.image('menu-items-1', 'img/menus/menuItems1.png', 120, 40);
        game.load.image('menu-items-2', 'img/menus/menuItems2.png', 120, 80);
        game.load.image('menu-items-3', 'img/menus/menuItems3.png', 120, 120);

        game.load.image('menu-item-btn', 'img/menus/menuItemButton.png', 96, 36);

        console.log('game = ' , game);

    },
    create: function() {
        game.state.start('scene-spaceship');
    },
    collectItem: function(player, item) {
        console.log('collect: ' + item.key);
        inventory[item.key].count = 1;
        this.items.remove(item);
        console.log('inventory = ' , inventory);
    }
};