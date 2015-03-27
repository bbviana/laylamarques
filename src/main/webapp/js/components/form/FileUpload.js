var React = require('react');
var PropTypes = React.PropTypes;
var assign = require('object-assign');

var Styles = require('app/Styles');

var FileUpload = React.createClass({
    propTypes: {
        file: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired
    },

    _onChange: function (e) {
        this.props.onChange(e);
    },

    render: function () {
        var file = this.props.file;

        var main;
        if (file.id) {
            main = <div>{file.name}</div>
        } else {
            main = <input type="file" onChange={this._onChange} />
        }

        return (
            <div style={_.container}>
                {main}
                <div style={_.progressStatus}>{file.progressStatus}</div>
            </div>
        );
    }
});

var _ = assign({
    container: {
        display: 'inline-block'
    },
    progressStatus: {}
}, Styles);


module.exports = FileUpload;