var React = require('react');
var PropTypes = React.PropTypes;

var Field = require('./Field');


var DateField = React.createClass({
    render: function () {
        return (
            <Field label={this.props.label}>
                <input
                    type="date"
                    className="form-control"
                    onChange={this.props.onChange}
                    name={this.props.name}
                    placeholder={this.props.placeHolder}
                    value={this.props.value} />
            </Field>
        );
    }
});

var _ = {
    container: {}
};

module.exports = DateField;