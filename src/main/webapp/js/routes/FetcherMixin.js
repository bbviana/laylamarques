var xhr = require('./xhr');

var FetcherMixin = function (state) {
    return {
        getInitialState() {
            state.loading = false;
            return state;
        },

        componentDidMount() {
            this.getDOMNode().addEventListener('click', this._handleClick);
        },
        componentWillUnmount() {
            this.getDOMNode().removeEventListener('click', this._handleClick);
        },

        _handleClick(e) {
            var url = extractURL(e);

            if (url) {
                e.preventDefault();

                var self = this;

                self.setState({loading: true});

                xhr.get(url).then(function (data) {
                    // montar um novo estado a partir de "state"
                    data.loading = false;
                    self.setState(data);
                }, errorHandler);
            }
        }
    }
};

var extractURL = function (e) {
    var target = e.target;
    return target.href;
};

var errorHandler = function (error) {
    console.error(error);
};

module.exports = FetcherMixin;