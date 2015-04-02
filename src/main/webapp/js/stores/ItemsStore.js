var createStore = require('../flux/create-store');
var ActionTypes = require('../actions/ActionTypes');

var ItemsStore = createStore({
    init: function () {
        this.bindAction(ActionTypes.RECEIVE_ITEMS, receiveItems);
    },

    list: function () {
        return items;
    }
});

var items = [];

function receiveItems(payload) {
    items = payload.items;
    this.emitChange();
}

module.exports = ItemsStore;