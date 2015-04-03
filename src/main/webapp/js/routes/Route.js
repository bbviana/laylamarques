var React = require('react');
var PropTypes = React.PropTypes;

var Route = React.createClass({
    propTypes: {
        path: PropTypes.string.isRequired
    },

    render() {
        var isPathMath = false;

        // usar  React.createElement(LoadingWindow, null),
        return isPathMath ? this.props.children : null;
    }
});

module.exports = Route;