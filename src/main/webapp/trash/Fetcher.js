import React, {PropTypes} from 'react'
import assign from 'object-assign'
import {ctx, xhr} from 'utils'
import LoadingWindow from './LoadingWindow'

var Fetcher = {
    wrap(component) {
        return React.createClass({
            getInitialState() {
                this.fetchRequestPending = true;
                return {data: {}, query: null}
            },

            _fetchData(query) {
                xhr.get(query).then(function (data) {
                    console.log("...");
                    this.fetchRequestPending = false;
                    // setState pra forçar o render novamente, mas desta vez com data já populado
                    this.setState({data: data, query: query})
                }.bind(this));
            },

            render() {
                console.log("Fetcher:render");

                // <Component query='items/20' />: componente decorado passa a query
                // <Component  />: componente nao passa query; desta forma pegamos o location
                var query = this.props.query || currentPath();

                // data ja esta populado e a query nao foi alterada: neste caso não fazemos o fetch
                var alreadyFetch = this.state.query && this.state.query === query;

                // request nao foi feita ainda ou esta em execução
                if (!alreadyFetch && this.fetchRequestPending) {
                    this._fetchData(query);
                    return <LoadingWindow />
                }

                // request ja terminou
                this.fetchRequestPending = true;

                var newProps = assign({}, this.props, this.state.data);
                return React.createElement(component, newProps);
            }
        });
    }
};

function currentPath() {
    var contextPath = ctx(); // /app
    var currentPath = window.location.pathname; // /app/items/42
    currentPath = currentPath.replace(contextPath, ""); // /items/42
    currentPath = currentPath.replace(/^\//, ""); // items/42
    return currentPath;
}

export default Fetcher