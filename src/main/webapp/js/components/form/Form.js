var React = require('react');
var PropTypes = React.PropTypes;


var Form = React.createClass({
    render: function () {
        return (
            <form className="container" action="#" style={this.props.style}
                onSubmit={this.props.onSubmit} onChange={this.props.onChange}>
                {this.props.children}
            </form>
        );
    }
});

var _ = {
    container: {}
};

module.exports = Form;