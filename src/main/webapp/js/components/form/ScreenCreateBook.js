var React = require('react');
var PropTypes = React.PropTypes;

var ActionCreators = require('app/actions/ActionCreators');
var BookStore = require('app/stores/BookStore');
var StoreWatchMixin = require('app/flux/StoreWatchMixin');
var invariant = require('app/invariant');

var BookForm = require('./BookForm');


var ScreenCreateBook = React.createClass({
    mixins: [StoreWatchMixin(BookStore)],

    getStateFromStores: function () {
        return {book: BookStore.getBook()};
    },
    componentDidMount: function () {
        ActionCreators.loadBook(null);
    },

    _onSave: function () {
        ActionCreators.insertBook(this.state.book);
    },

    render: function () {
        console.log("ScreenCreateBook:render");

        return <BookForm {...this.state.book} onSave={this._onSave} />
    }
});

module.exports = ScreenCreateBook;