var React = require('react');

var ActionCreators = require('app/actions/ActionCreators');
var FloatingMenu = require('app/components/FloatingMenu');


var MoreActions = React.createClass({
    render: function () {
        return (
            <button style={styles.container}>
                <i className="glyphicon glyphicon-option-vertical"></i>

                <FloatingMenu top={35}>
                    <EditButton bookId={this.props.bookId} />
                    <RemoveButton bookId={this.props.bookId} />
                </FloatingMenu>
            </button>
        );
    }
});

var EditButton = React.createClass({
    render: function () {
        return (
            <a style={styles.editButton} href={"/touch-library/books/edit/" + this.props.bookId}>
                <i className="glyphicon glyphicon-pencil"></i> Editar
            </a>
        );
    }
});

var RemoveButton = React.createClass({
    _onClick: function () {
        if(confirm("Remover Livro?")){
            ActionCreators.removeBook(this.props.bookId);
        }
    },

    render: function () {
        return (
            <div onClick={this._onClick}>
                <i className="glyphicon glyphicon-remove"></i> Remover
            </div>
        );
    }
});

var styles = {
    container: {
        backgroundColor: '#f5f5f5',
        boxShadow: '0 1px 0 rgba(0,0,0,0.05)',
        border: '1px solid rgba(0,0,0,.17)',
        borderRadius: 2,
        color: '#737373',
        display: 'inline-block',
        fontSize: 14,
        height: 36,
        lineHeight: '36px',
        marginRight: 10,
        outline: 'none',
        position: 'relative',
        textDecoration: 'none',
        verticalAlign: 'middle'
    },
    editButton: {
        display: 'block',
        textDecoration: 'none'
    }
};

module.exports = MoreActions;