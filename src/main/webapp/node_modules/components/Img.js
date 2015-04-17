var React = require('react/addons');
var PropTypes = React.PropTypes;
var PureRenderMixin = React.addons.PureRenderMixin;

var Img = React.createClass({
    mixin: [PureRenderMixin],
    propTypes: {
        src: PropTypes.string.isRequired,
        style: PropTypes.object
    },

    render() {
        return (
            <img style={this.props.style} src={"/laylamarques/" + this.props.src} />
        );
    }
});

module.exports = Img;