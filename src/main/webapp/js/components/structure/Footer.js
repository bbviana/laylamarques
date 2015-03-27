var React = require('react');


var Footer = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                ©2015 Touch Health
            </div>
        );
    }
});

var styles = {
    container: {
        background: '#e5e5e5',
        color: '#555555',
        fontSize: 13,
        textAlign: 'center',
        padding: 28,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 100
    }
};

module.exports = Footer;