var Promise = require('es6-promise').Promise;
var $ = require('jquery');
var assign = require('object-assign');
var invariant = require('../invariant');

// Como toda a comunicação com o servidor é assincrona, TODOS os métodos que fazem requisições AJAX devem retornar um
// "Promise" (http://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)

/**
 * Comunicação com /ws/books/*: gerenciamento de livros
 */
var BookClient = {
    insert: function (book) {
        return asyncRequest({
            url: '/touch-library/ws/books',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(book),
            dataType: 'json'
        });
    },

    update: function (book) {
        invariant(book.id, "book.id deve ser diferente de nulo");

        return asyncRequest({
            url: '/touch-library/ws/books',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(book),
            dataType: 'json'
        });
    },

    load: function (bookId) {
        invariant(bookId, "id deve ser diferente de nulo");

        return asyncRequest({
            url: '/touch-library/ws/books/' + bookId,
            type: 'GET',
            dataType: 'json'
        });
    },

    loadAll: function () {
        return asyncRequest({
            url: '/touch-library/ws/books',
            type: 'GET',
            dataType: 'json'
        });
    },

    remove: function (bookId) {
        invariant(bookId, "id deve ser diferente de nulo");

        return asyncRequest({
            url: '/touch-library/ws/books/' + bookId,
            type: 'DELETE'
        });
    }
};

function asyncRequest(settings) {
    return new Promise(function (resolve, reject) {
        var completeSettings = assign({}, settings, {
            success: function (data) {
                resolve(data);
            },

            error: function (xhr, status, err) {
                reject(err);
            }
        });

        $.ajax(completeSettings);
    });
}

module.exports = BookClient;