var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var LoadingStore = require('app/stores/LoadingStore');

var LoadingWindow = React.createClass({
    mixins: [PureRenderMixin],

    //getInitialState() {
    //    return {loading: false}
    //},

    //componentDidMount() {
    //    window.addEventListener("loading", this._setLoading);
    //},
    //componentWillUnmount() {
    //    window.removeEventListener("loading", this._setLoading);
    //},

    _setLoading(e){
        this.setState({loading: e.loading});
    },

    render() {
        console.log("LoadingWindow:render");

        if (!this.props.loading) {
            return null;
        }

        return (
            <div style={_.container}>
                <div style={_.inner}>
                    <i className="fa fa-spin fa-spinner"></i>
                </div>
            </div>
        );
    }
});

var _ = {
    container: {
        backgroundColor: '#e5e5e5',
        bottom: 0,
        display: 'table',
        fontSize: 100,
        height: '100%',
        left: 0,
        opacity: .8,
        position: 'fixed',
        right: 0,
        top: 0,
        width: '100%',
        zIndex: 20000
    },

    inner: {
        display: 'table-cell',
        textAlign: 'center',
        verticalAlign: 'middle'
    }
};

module.exports = LoadingWindow;