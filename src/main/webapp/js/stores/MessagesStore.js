var createStore = require('../flux/create-store');
var ActionTypes = require('../actions/ActionTypes');

// state

// Store
var MessagesStore = createStore({
    init: function () {
        this.bindAction(ActionTypes.ACTION_FAILED, receiveErrorMessage);

    },

    isLoading: function () {
        return isLoading;
    }
});

// TODO criar componente para exibir mensagens
// private
function receiveErrorMessage(payload) {
    console.error(payload.message);
    this.emitChange();
}

module.exports = MessagesStore;