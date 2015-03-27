var React = require('react');
var PropTypes = React.PropTypes;

var Icon = React.createClass({
    propTypes: {
        name: PropTypes.string.isRequired
    },

    render: function () {
        return (
            <i className={"glyphicon glyphicon-" + this.props.name}></i>
        );
    }
});

module.exports = Icon;