var React = require('react');
var PropTypes = React.PropTypes;

var Field = require('./Field');


var TextAreaField = React.createClass({
    render: function () {
        return (
            <Field label={this.props.label}>
                <textarea
                    style={_.description}
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
    container: {},
    description: {
        height: 200
    }
};

module.exports = TextAreaField;