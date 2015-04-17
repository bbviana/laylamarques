var React = require('react');
var PropTypes = React.PropTypes;
var Img = require('./Img');

//TODO como tornar o href automatico? ou seja, sempre enviar para contextPath?
var Logo = React.createClass({
    render() {
        return (
            <div style={_.container} >
                <a style={_.link} href="/laylamarques">
                    <Img src="img/logo.png" />
                </a>
            </div>
        );
    }
});

var _ = {
    container: {
        textAlign: 'center'
    },

    link: {
        display: 'inline-block'
    }
};

module.exports = Logo;