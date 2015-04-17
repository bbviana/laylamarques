var React = require('react');
var PropTypes = React.PropTypes;

var Route = React.createClass({
    propTypes: {
        path: PropTypes.string.isRequired
    },

    render() {
        var isPathMath = true;

        return isPathMath ? this.props.children : null;
    }
});

module.exports = Route;