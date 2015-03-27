var React = require('react');
var PropTypes = React.PropTypes;

var m = require('app/utils').m;


var AddBookButton = React.createClass({
    propTypes: {
        icon: PropTypes.string,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        style: PropTypes.object
    },

    render: function () {
        return (
            <button style={m(styles.container, this.props.style)} onClick={this.props.onClick}>
                <i style={styles.icon} className={"glyphicon glyphicon-" + this.props.icon}></i>
                <span style={styles.label}>{this.props.label}</span>
            </button>
        );
    }
});

var styles = {
    container: {
        backgroundColor: '#1aa1e1',
        border: 'none',
        borderRadius: 2,
        boxShadow: '0 1px 0 rgba(0,0,0,.05)',
        color: '#FFF',
        fontSize: '14px',
        fontWeight: 'bold',
        height: 30,
        margin: '0px 5px',
        outline: 'none',
        padding: '0 13px',
        verticalAlign: 'top'
    },
    icon: {},
    label: {
        marginLeft: 5
    }
};

module.exports = AddBookButton;