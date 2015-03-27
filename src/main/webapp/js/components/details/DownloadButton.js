var React = require('react');
var PropTypes = React.PropTypes;

var DownloadButton = React.createClass({
    propTypes: {
        file: PropTypes.object.isRequired
    },

    _extractFileExtension: function (fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1).toUpperCase();
    },

    render: function () {
        var file = this.props.file;
        var fileName = file.name;
        var fileExtension = this._extractFileExtension(fileName);

        return (
            <a style={_.container}
                href={"/touch-library/ws/files/digital/" + file.id}
                title={fileName}>
                <i className="glyphicon glyphicon-cloud-download"></i> {fileExtension}
            </a>
        );
    }
});

var _ = {
    container: {
        backgroundColor: '#1aa1e1',
        boxShadow: '0 1px 0 rgba(0,0,0,0.05)',
        border: 1,
        borderRadius: 2,
        color: '#FFF',
        display: 'inline-block',
        fontSize: 14,
        fontWeight: 'bold',
        height: 36,
        lineHeight: '36px',
        marginRight: 10,
        padding: '0 20px',
        textDecoration: 'none',
        verticalAlign: 'middle'
    }
};

module.exports = DownloadButton;
