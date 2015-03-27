var React = require('react');
var PropTypes = React.PropTypes;


var Field = React.createClass({
    render: function () {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                {this.props.children}
            </div>
        );
    }
});

var _ = {
    container: {}
};

module.exports = Field;