var React = require('react');
var navigate = require('react-mini-router').navigate;

var AddBookButton = require('./AddBookButton');

var ActionBar = React.createClass({
    _addButtonHandler: function () {
        navigate('/touch-library/books/create');
    },

    render: function () {
        return (
            <div style={styles.container}>
                <AddBookButton icon="cloud-upload" label="Adicionar Livro" onClick={this._addButtonHandler} />
            </div>
        );
    }
});

var styles = {
    container: {
        position: 'absolute',
        right: 25,
        top: 9
    }
};

module.exports = ActionBar;