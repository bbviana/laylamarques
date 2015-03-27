var React = require('react');
var PropTypes = React.PropTypes;

var Col = React.createClass({
    render: function () {
        var className = "col-lg-" + this.props.size;
        return <div className={className}>{this.props.children}</div>
    }
});

module.exports = Col;