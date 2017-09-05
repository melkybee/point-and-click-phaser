Game = function() {
};

Game.prototype = {
    preload: function() {
    },
    create: function() {
    },
    update: function() {
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