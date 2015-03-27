var ActionTypes = require('./ActionTypes');
var BookClient = require('../client/BookClient');
var FileClient = require('../client/FileClient');
var dispatch = require('../flux/Dispatcher').dispatch;
var invariant = require('../invariant');
var navigate = require('react-mini-router').navigate;


var ActionCreators = {
    // TODO arrumar o scrollTop a navegar

    changeBook: function (partialBook) {
        dispatch({action: ActionTypes.CHANGE_BOOK, partialBook: partialBook});
    },

    insertBook: function (book) {
        this.loading(true);
        dispatch({action: ActionTypes.CREATE_BOOK, book: book});

        BookClient
            .insert(book)
            .then(function (savedBook) {
                dispatch({action: ActionTypes.RECEIVE_BOOK, book: savedBook});
                navigate("/touch-library/books/" + savedBook.id);
                ActionCreators.loading(false);
            }, handleError);
    },

    updateBook: function (book) {
        this.loading(true);
        dispatch({action: ActionTypes.UPDATE_BOOK, book: book});

        BookClient
            .update(book)
            .then(function (savedBook) {
                dispatch({action: ActionTypes.RECEIVE_BOOK, book: savedBook});
                navigate("/touch-library/books/" + savedBook.id);
                ActionCreators.loading(false);
            }, handleError);
    },

    loadBook: function (bookId) {
        dispatch({action: ActionTypes.LOAD_BOOK, bookId: bookId});

        if (!bookId) {
            dispatch({action: ActionTypes.RECEIVE_BOOK, book: null});
            return;
        }

        this.loading(true);
        BookClient
            .load(bookId)
            .then(function (book) {
                dispatch({action: ActionTypes.RECEIVE_BOOK, book: book});
                ActionCreators.loading(false);
            }, handleError);
    },

    loadBooks: function () {
        this.loading(true);
        dispatch({action: ActionTypes.LOAD_BOOKS});

        BookClient
            .loadAll()
            .then(function (data) {
                dispatch({action: ActionTypes.RECEIVE_BOOKS, books: data});
                ActionCreators.loading(false);
            }, handleError);

    },

    loading: function (loading) {
        dispatch({action: ActionTypes.CHANGE_LOADING, loading: loading});
    },

    removeBook: function (bookId) {
        this.loading(true);
        dispatch({action: ActionTypes.REMOVE_BOOK, bookId: bookId});

        BookClient
            .remove(bookId)
            .then(function () {
                navigate("/touch-library/");
            }, handleError);
    },

    addFile: function () {
        dispatch({action: ActionTypes.ADD_FILE});
    },

    removeFile: function (index) {
        dispatch({action: ActionTypes.REMOVE_FILE, index: index});
    },

    uploadFile: function (name, file) {
        dispatch({action: ActionTypes.UPLOAD_FILE});

        FileClient.uploadFile({
            file: file,
            progress: function (data) {
                dispatch({action: ActionTypes.UPLOAD_FILE_PROGRESS, name: name, progressStatus: data});
            },
            success: function (data) {
                dispatch({action: ActionTypes.UPLOAD_FILE_SUCCESS, name: name, hash: data});
            }
        });
    }
};

function handleError(error) {
    dispatch({action: ActionTypes.ACTION_FAILED, message: error});
    ActionCreators.loading(false);
}


module.exports = ActionCreators;