var React = require('react');
var PropTypes = React.PropTypes;

var BookCard = require('app/components/BookCard');

var SeeMore = require('./SeeMore');


var BookList = React.createClass({
    propTypes: {
        title: PropTypes.string,
        books: PropTypes.arrayOf(PropTypes.object)
    },

    render: function () {
        console.log("BookList:render");

        return (
            <div className="book-list" style={_.container}>
                <h1 className="heading" style={_.heading}>
                    <a style={_.title} href="books/tag/XXX">{this.props.title}</a>
                    <SeeMore />
                </h1>
                <div className="book-list" style={_.list}>
                    {this.props.books.map(function (book, i) {
                        return <BookCard book={book} key={i} />;
                    })}
                </div>
            </div>
        );
    }
});

var _ = {
    container: {
        padding: '0 100px'
    },
    heading: {
        cursor: 'default',
        fontSize: 28,
        height: 50,
        lineHeight: '50px',
        margin: 0,
        padding: 5,
        position: 'relative'
    },
    title: {
        color: '#333',
        textDecoration: 'none'
    },
    list: {}
};

module.exports = BookList;
