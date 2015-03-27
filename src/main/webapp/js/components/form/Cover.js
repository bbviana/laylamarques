var React = require('react');
var PropTypes = React.PropTypes;

var Image = require('app/components/Image');
var Styles = require('app/Styles');

/**
 * TODO permitir especificar uma url de imagem
 */
var Cover = React.createClass({
    getInitialState: function () {
        return {preview: null}
    },

    _onChange: function (e) {
        this._showPreview(e);
        this.props.onChange(e);
    },
    _showPreview: function (e) {
        var file = e.target.files[0];

        if (!file || !isImage(file.type)) {
            this.setState({preview: null});
            return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            this.setState({preview: e.target.result});
        }.bind(this);
        reader.readAsDataURL(file);
    },

    render: function () {
        var file = this.props.file;

        var main;
        if (file.id) {
            main = (
                <div>
                    <div>{file.name}</div>
                    <div style={_.link}>Trocar</div>
                </div>
            )
        } else {
            main = <input type="file" onChange={this._onChange} />
        }

        return (
            <div style={_.container}>
                {main}
                <div style={_.progressStatus}>{file.progressStatus}</div>
                <Image style={_.preview} src={file.id || this.state.preview}/>
            </div>
        );
    }
});

function isImage(mimeType) {
    return mimeType && mimeType.indexOf("image/") === 0;
}

var _ = {
    container: {
        display: 'inline-block'
    },
    preview: {
        marginTop: 10,
        width: 100
    },
    progressStatus: {}
};

module.exports = Cover;