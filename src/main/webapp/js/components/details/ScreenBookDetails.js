var React = require('react');
var PropTypes = React.PropTypes;

var ActionCreators = require('app/actions/ActionCreators');
var BookStore = require('app/stores/BookStore');
var StoreWatchMixin = require('app/flux/StoreWatchMixin');

var BookDetails = require('app/components/details/BookDetails');


var ScreenBookDetails = React.createClass({
    propTypes: {
        bookId: PropTypes.string
    },
    mixins: [StoreWatchMixin(BookStore)],

    getStateFromStores: function () {
        return {book: BookStore.getBook()}
    },

    componentDidMount: function () {
        if (this.props.bookId !== this.state.book.id) { // já foi carregado?
            ActionCreators.loadBook(this.props.bookId);
        }
    },

    render: function () {
        return <BookDetails book={this.state.book} />
    }
});

var _ = {
    container: {}
};

module.exports = ScreenBookDetails;