var createStore = require('../flux/create-store');
var ActionTypes = require('../actions/ActionTypes');

// state
var categories = [];

// Store
var CategoryStore = createStore({
    init: function () {
        this.bindAction(ActionTypes.RECEIVE_CATEGORIES, receiveCategories);
    },

    list: function () {
        return categories;
    }
});

// private
function receiveCategories(payload) {
    categories = payload.categories;
    this.emitChange();
}

module.exports = CategoryStore;