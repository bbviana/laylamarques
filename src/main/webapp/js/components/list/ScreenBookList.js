var React = require('react');
var PropTypes = React.PropTypes;

var ActionCreators = require('app/actions/ActionCreators');
var BookListStore = require('app/stores/BookListStore');
var StoreWatchMixin = require('app/flux/StoreWatchMixin');

var BookList = require('./BookList');


var ScreenBookList = React.createClass({
    mixins: [StoreWatchMixin(BookListStore)],

    getStateFromStores: function () {
        return {
            books: BookListStore.getBooks()
        };
    },
    componentDidMount: function () {
        ActionCreators.loadBooks();
    },

    render: function () {
        return (
            <div>
                <BookList title="Java" books={this.state.books}/>
            </div>
        );
    }
});

var _ = {
    container: {}
};

module.exports = ScreenBookList;