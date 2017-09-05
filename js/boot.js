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

    // tap
    tap,

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

    // inventory for items that can be picked up
    inventory = {
        // scene - spaceship
        'crackers': {
            'count': 0,
            'description': 'Crackers'
        },
        'socks': {
            'count': 0,
            'description': 'Socks'
        },

        // scene - outer house
        'axe': {
            'count': 0,
            'description': 'Axe'
        },
        'key': {
            'count': 0,
            'description': 'Key'
        },

        // scene - inner house
        'cereal': {
            'count': 0,
            'description': 'Cereal'
        },
        'jar': {
            'count': 0,
            'description': 'Jar'
        },
        'milk': {
            'count': 0,
            'description': 'Spoiled milk'
        },
        'veggie': {
            'count': 0,
            'description': 'Veggie'
        },

        // scene - basement
        'batteries': {
            'count': 0,
            'description': 'Used batteries'
        },

        // scene - lake
        'jar_water' : {
            'count': 0,
            'description': 'Jar full of water'
        },

        // scene - forest
        'wood': {
            'count': 0,
            'description': 'Wood'
        },
        // mixed items in cauldron
        'fuel': {
            'count': 0,
            'description': 'Made of used batteries, spoiled milk, and jar of water'
        }
    },

    // things in scenes that can be interacted with but can't be collected in inventory

    // scene - spaceship
    spaceship, // USE WITH - fuel, wood

    // scene - outer house
    door, // USE WITH - key.  OPEN
    doormat, // PULL

    // scene - inner house
    bookLake, // how to make fuel.  READ
    bookTrees, // how to make ship parts.  READ
    crate, // open after chopping wood (if player has strength).  OPEN

    // scene - basement

    // scene - lake
    man, // transforms into boat after you feed him the right thing (crackers).  TALK TO, GIVE ITEM
    lake, // collect water in the jar.  USE WITH - jar

    // scene - forest
    tree, // USE WITH - axe
    cauldron, // USE WITH - jar_water, battereries, spoiled milk (fuel). or USE WITH - jar_water, key, socks (wormhole)
    wormhole,


    // player properties
    hasStrength = false, // 'true' after chopping wood


    // items in scene properties

    // scene - outer house
    isDoorOpened = false, // 'true' after using key in door

    // scene - inner house
    isCrateOpened = false, // 'true' after opening, after hasStrength is true

    // scene - lake
    isManHungry = true, // 'false' after feeding him right thing (crackers). if 'true' also means can't cross lake.

    // scene - forest
    hasWormhole = false, // 'true' after mixing items in cauldron

    // dialog
    dialog = {
        'book_lake': {
            '0': 'Properties of lake, how to make fuel'
        },
        'book_trees': {
            '0': 'Properties of wood, using it on vehicles'
        },
        'crate_closed': {
            '0': 'The crate will not budge. I am way too weak.'
        },
        'door_locked': {
            '0': 'The door is locked. I need a key...'
        },
        'made_fuel': {
            '0': 'Fuel was created.'
        },
        'made_wormhole': {
            '0': 'A wormhole was created.'
        },
        'man_boat': {
            '0': 'I can take you across the lake! Would you like to cross?'
        },
        'man_fed_right': {
            '0': 'Wow! That is perfect! Thank you! Nom nom nom...'
        },
        'man_fed_wrong': {
            '0': 'That looks gross! Got anything else to eat?'
        },
        'man_hungry': {
            '0': 'Feed me! I want something I have never eaten before!'
        },
        'nothing': {
            '0': 'Nothing happened!'
        },
        'strength': {
            '0': 'I feel much stronger!'
        }
    },

    menuOptions = {
        'DRINK': 'DRINK',  // for spoiled milk
        'GIVE_TO': 'GIVE TO',
        'LOOK_AT': 'LOOK AT',
        'PICK_UP': 'PICK UP',
        'PULL': 'PULL',
        'USE': 'USE',
        'WITH': 'WITH'
    }



// booting / preloading assets
Boot = function () {
    this.player = null;
    this.loadText = null;
};
Boot.prototype = {
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
        game.load.image('bg-forest', 'img/bg-forest.png', 720, 480);
        game.load.image('bg-outer-house', 'img/bg-outer-house.png', 720, 480);
        game.load.image('bg-inner-house', 'img/bg-inner-house.png', 720, 480);
        game.load.image('bg-basement', 'img/bg-basement.png', 720, 480);

    },
    create: function() {
        // transition to title screen when loaded
        game.state.start('scene-spaceship');
    }
};