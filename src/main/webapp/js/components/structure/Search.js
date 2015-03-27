var React = require('react');

var m = require('app/utils').m;


var Search = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                <input style={styles.input} placeholder="Busca"/>

                <button style={styles.button} type="button">
                    <i className="glyphicon glyphicon-search"></i>
                </button>
            </div>
        );
    }
});

var styles = {
    container: {
        height: 60,
        marginLeft: 220,
        paddingTop: 15
    },

    input: {
        height: 30,
        padding: '0 8px',
        width: 550
    },

    button: {
        background: '-webkit-linear-gradient(top,#4387fd,#4683ea)',
        border: '1px solid transparent',
        borderRadius: '0 2px 2px 0',
        color: '#FFFFFF',
        height: 30,
        margin: 0,
        outline: 'none',
        padding: '0 0',
        width: 60
    }
};

module.exports = Search;
