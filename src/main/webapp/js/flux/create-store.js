var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('./Dispatcher');
var assign = require('object-assign');

function bindActions(store) {
    return Dispatcher.register(function (payload) {
        var action = payload.action;

        var callback = store.actionListeners[action];
        if (callback) {
            // TODO usar promises aqui para logar erro
            callback.call(store, payload);
        }
    });
}

var CHANGE_EVENT = 'change';
var Store = assign({}, EventEmitter.prototype, {
    init: function () {
        // do nothing
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    bindAction: function (action, callback) {
        this.actionListeners[action] = callback;
        return this; // for chaining
    }
});

var createStore = function (definitions) {
    var store = assign({actionListeners: []}, Store, definitions);

    store.init();
    store.dispatchToken = bindActions(store);

    return store;
};

/**
 *  // state
 *  var property1;
 *
 *  var MyStore = createStore({
 *      init: function(){
 *          bindAction(ActionNames.ACTION1, handleAction1).
 *          bindAction(ActionNames.ACTION2, handleAction2);
 *      },
 *
 *      getProperty1: function(){
 *          return property1;
 *      }
 *  });
 *
 *  // private
 *  function privateFunction1(){...}
 *
 *  function handleAction1(){...}
 *
 *
 */

module.exports = createStore;