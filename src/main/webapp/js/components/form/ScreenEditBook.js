var React = require('react');
var PropTypes = React.PropTypes;

var ActionCreators = require('app/actions/ActionCreators');
var BookStore = require('app/stores/BookStore');
var StoreWatchMixin = require('app/flux/StoreWatchMixin');
var invariant = require('app/invariant');

var BookForm = require('./BookForm');


var ScreenEditBook = React.createClass({
    propTypes: {
        bookId: PropTypes.string
    },
    mixins: [StoreWatchMixin(BookStore)],

    getStateFromStores: function () {
        return {book: BookStore.getBook()}
    },
    componentDidMount: function () {
        ActionCreators.loadBook(this.props.bookId);
    },

    _onSave: function () {
        ActionCreators.updateBook(this.state.book);
    },

    render: function () {
        return <BookForm {...this.state.book} onSave={this._onSave}/>
    }
});

module.exports = ScreenEditBook;