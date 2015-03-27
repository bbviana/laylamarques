var $ = require('jquery');
var createStore = require('../flux/create-store');
var ActionTypes = require('../actions/ActionTypes');

// state
var books = [];

// Store
var BookListStore = createStore({
    init: function () {
        this.bindAction(ActionTypes.RECEIVE_BOOKS, receiveBooks);
    },

    getBooks: function () {
        return books;
    }
});

// private
function receiveBooks(payload) {
    books = payload.books;
    this.emitChange();
}

module.exports = BookListStore;