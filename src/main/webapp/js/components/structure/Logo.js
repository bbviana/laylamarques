var React = require('react');


var Logo = React.createClass({
    render: function () {
        return (
            <a style={styles.container} href="/touch-library/">
                <img style={styles.logo} src="/touch-library/img/app-logo.png"/>
            </a>
        );
    }
});

var styles = {
    container: {
        float: 'left',
        height: 60,
        lineHeight: '60px',
        padding: '0 30px'
    },
    logo: {
        height: 40
    }
};

module.exports = Logo;
