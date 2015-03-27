var React = require('react');


var WriteAReview = React.createClass({
    render: function () {
        return (
            <button style={styles.container}>
                <i className="glyphicon glyphicon-pencil"></i> Escreva uma avaliação
            </button>
        );
    }
});

var styles = {
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 36,
        color: '#737373',
        fontWeight: 'bold',
        border: '1px solid rgba(0,0,0,0.17)',
        borderRadius: 2,
        padding: '0 20px',
        boxShadow: '0 1px 0 rgba(0,0,0,0.05)',
        background: '#FFFFFF',
        fontSize: 14
    }
};

module.exports = WriteAReview;