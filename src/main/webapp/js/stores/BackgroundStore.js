var createStore = require('../flux/create-store');
var ActionTypes = require('../actions/ActionTypes');

// state
var images = [];

// Store
var BackgroundStore = createStore({
    init: function () {
        this.bindAction(ActionTypes.RECEIVE_BG_IMAGES, receiveImages);
    },

    list: function () {
        return images;
    }
});

// private
function receiveImages(payload) {
    images = payload.images;
    this.emitChange();
}

module.exports = BackgroundStore;