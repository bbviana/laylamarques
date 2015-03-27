var React = require('react');
var PropTypes = React.PropTypes;
var HoverMixin = require('../mixins/HoverMixin');
var m = require('../utils/').m;


var FloatingMenu = React.createClass({
    propTypes: {
        left: PropTypes.number,
        top: PropTypes.number
    },
    getDefaultProps: function () {
        return {
            left: 0,
            top: 0
        }
    },
    getInitialState: function () {
        return {open: false}
    },

    componentDidMount: function () {
        var parentNode = this.getDOMNode().parentNode;
        parentNode.addEventListener('click', this._toggle);
        document.addEventListener('click', this._close);
    },
    componentWillUnmount: function () {
        var parentNode = this.getDOMNode().parentNode;
        parentNode.removeEventListener('click', this._toggle);
        document.removeEventListener('click', this._close);
    },

    _toggle: function (e) {
        // para nao subir pro document e fechar o Menu
        e.fromToggle = true;
        this.setState({open: !this.state.open});
    },
    _close: function (e) {
        if (!e.fromToggle) {
            this.setState({open: false});
        }
    },

    render: function () {
        var position = {
            left: this.props.left,
            top: this.props.top
        };

        return (
            <ul style={m(s.container, position, this.state.open && s.open)}>
                {this.props.children.map(function (child, i) {
                    return <Item key={i}>{child}</Item>
                })}
            </ul>
        );
    }
});

var Item = React.createClass({
    mixins: [HoverMixin('#e8e8e8')],

    render: function () {
        return <li style={s.item}>{this.props.children}</li>
    }
});

var s = {
    container: {
        backgroundColor: '#FFF',
        border: '1px solid #d6d6d6',
        borderRadius: 3,
        boxShadow: '0 2px 40px rgba(0,0,0,0.4)',
        color: '#333',
        display: 'none',
        fontSize: 13,
        listStyle: 'none',
        margin: 0,
        padding: '6px 0',
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: 200,
        zIndex: 100
    },
    item: {
        height: 30,
        lineHeight: '30px',
        paddingLeft: 15,
        textAlign: 'left'
    },
    open: {
        display: 'block'
    }
};

module.exports = FloatingMenu;