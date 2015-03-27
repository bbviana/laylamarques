var ActionTypes = require('../actions/ActionTypes');
var $ = require('jquery');
var assign = require('object-assign');
var createStore = require('../flux/create-store');

// state

var BLANK_BOOK = {
    id: null,
    title: null,
    category: null,
    author: null,
    publisher: null,
    datePublished: null,
    description: "", // BUG do React ao setar null na textarea: o valor anterior nao muda
    cover: null,
    files: null
};

var book = cleanBook();

// Store

var BookStore = createStore({
    init: function () {
        this.bindAction(ActionTypes.CHANGE_BOOK, changeBook);
        this.bindAction(ActionTypes.RECEIVE_BOOK, receiveBook);
        this.bindAction(ActionTypes.ADD_FILE, addFile);
        this.bindAction(ActionTypes.REMOVE_FILE, removeFile);
        this.bindAction(ActionTypes.UPLOAD_FILE_PREVIEW, uploadFilePreview);
        this.bindAction(ActionTypes.UPLOAD_FILE_PROGRESS, uploadFileProgress);
        this.bindAction(ActionTypes.UPLOAD_FILE_SUCCESS, uploadFileSuccess);
    },

    getBook: function () {
        return book;
    }
});

// private

function cleanBook() {
    return assign({}, BLANK_BOOK, {cover: {}, files: []});
}

function changeBook(payload) {
    var partialBook = payload.partialBook;
    assign(book, partialBook);
    this.emitChange();
}

function receiveBook(payload) {
    book = payload.book || cleanBook();
    book.cover = book.cover || {};
    book.files = book.files || [];
    this.emitChange();
}

// TODO deveriamos usar Immutable nos metodos abaixo?
function addFile() {
    book.files.push({});
    this.emitChange();
}

function removeFile(payload) {
    book.files.splice(payload.index, 1);
    this.emitChange();
}

function uploadFilePreview(payload) {
    var file = getFile(book, payload.name);
    file.preview = payload.preview;
    this.emitChange();
}

function uploadFileProgress(payload) {
    var file = getFile(book, payload.name);
    file.progressStatus = payload.progressStatus;
    this.emitChange();
}

function uploadFileSuccess(payload) {
    var file = getFile(book, payload.name);
    file.hash = payload.hash;
    file.id = null;
    file.progressStatus = null;
    this.emitChange();
}

function getFile(book, name) {
    if (name === "cover") {
        return book.cover;
    }

    // files.{index}
    var index = name.substring(name.indexOf(".") + 1);
    index = parseInt(index);
    return book.files[index];
}

module.exports = BookStore;