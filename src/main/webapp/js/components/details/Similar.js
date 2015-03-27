var React = require('react');

var BookCard = require('app/components/BookCard');


var Similar = React.createClass({
    render: function () {
        var books = this.props.list || [];
        return (
            <div style={styles.container}>
                <h1 style={styles.title}>Similares</h1>
                {books.map(function (book, i) {
                    return <BookCard key={i} book={book}/>
                })}
            </div>
        );
    }
});

var styles = {
    container: {
        padding: 26
    },
    title: {
        margin: '0 0 10px 0',
        fontSize: 28,
        lineHeight: '40px'
    }
};

module.exports = Similar;