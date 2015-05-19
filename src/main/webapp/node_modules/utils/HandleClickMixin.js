/**
 * Ouve o click de ancoras e coloca o seu href na barra de navegação (permite o back do browser)
 */
var HandleClickMixin = {
    getInitialState() {
        return {path: window.location.pathname}
    },

    componentDidMount() {
        this.getDOMNode().addEventListener('click', this._handleClick);
        window.addEventListener('popstate', this._handlePopState);
    },
    componentWillUnmount() {
        this.getDOMNode().removeEventListener('click', this._handleClick);
        window.removeEventListener('popstate', this._handlePopState);
    },

    _handleClick(e) {
        var url = extractURL(e);

        if (url) {
            e.preventDefault();
            window.history.pushState({}, '', url);
            this.setState({path: url});
        }
    },

    _handlePopState(e){
        var url = window.location.pathname;
        this.setState({path: url});
    }
};

var extractURL = function (e) {
    var target = e.target;
    return target.href;
};


module.exports = HandleClickMixin;