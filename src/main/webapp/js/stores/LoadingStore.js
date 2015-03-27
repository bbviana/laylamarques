var createStore = require('../flux/create-store');
var ActionTypes = require('../actions/ActionTypes');

// state
var isLoading = false;

// Store
var LoadingStore = createStore({
    init: function () {
        this.bindAction(ActionTypes.CHANGE_LOADING, loading);

    },

    isLoading: function () {
        return isLoading;
    }
});

// private
function loading(payload) {
    isLoading = payload.loading;
    this.emitChange();
};

module.exports = LoadingStore;