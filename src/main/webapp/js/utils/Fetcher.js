var React = require('react');
var PropTypes = React.PropTypes;

var assign = require('object-assign');
var xhr = require('./xhr');

var Fetcher = {
    wrap(component){
        return React.createClass({
            getInitialState() {
                return {fetchRequestDone: false, data: {}}
            },

            render() {
                console.log("Fetcher:render");

                if (!this.state.fetchRequestDone) {
                    var query = this.props.query;

                    xhr.get(query).then(function (data) {
                        this.setState({fetchRequestDone: true, data: data})
                    }.bind(this));

                    return null;
                }

                var newProps = assign({}, this.props, this.state.data);
                return React.createElement(component, newProps);
            }
        });
    }
};

module.exports = Fetcher;

