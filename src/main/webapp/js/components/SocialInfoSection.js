var React = require('react');
var PropTypes = React.PropTypes;
var Img = require('./Img');

//TODO linkedin? loja? blog?
var SocialInfoSection = React.createClass({
    render() {
        return (
            <div style={_.container}>
                <a style={_.link} href="https://www.facebook.com/layla.marques.568" target="_blank" title="Facebook" >
                    <Img src="img/social/facebook.gif" />
                </a>

                <a style={_.link} href="https://instagram.com/laylamrs/" target="_blank" title="Instagram">
                    <Img src="img/social/instagram.gif" />
                </a>
            </div>
        );
    }
});

var _ = {
    container: {},
    link: {
        marginRight: 5
    }
};

module.exports = SocialInfoSection;