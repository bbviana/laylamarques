var React = require('react');
var PropTypes = React.PropTypes;


var Image = React.createClass({
    propTypes: {
        src: PropTypes.string,
        style: PropTypes.object
    },

    render: function () {
        if (!this.props.src) {
            return null;
        }

        var src =  this.props.src;
        var isImageId = src.indexOf("data:image") != 0;
        if(isImageId){
            src = "/touch-library/ws/files/image/" + src;
        }

        return <img style={this.props.style} src={src}/>;
    }
});

module.exports = Image;