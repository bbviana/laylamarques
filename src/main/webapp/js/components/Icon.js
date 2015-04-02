var React = require('react');
var PropTypes = React.PropTypes;

var Icon = React.createClass({
    propTypes: {
        name: PropTypes.string.isRequired
    },

    render() {
        return (
            <i className={"fa fa-" + this.props.name}></i>
        );
    }
});

module.exports = Icon;