import React, {Component, PropTypes} from 'react'

/**
 * Exemplos de path:
 * items/12: path exato
 * items/.*: wildcard => items/1, items/2 etc
 * qualquer outra regex serve
 *
 * path nao deve conter barra no começo (ainda)
 */
class Route extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired
    }

    render = () => {
        if(React.Children.count(this.props.children) > 1){
            throw "Route só pode conter um único filho.";
        }

        var contextPath = document.body.dataset.contextPath;
        var currentPath = window.location.pathname;
        var regex = new RegExp("\^" + contextPath + "/" + this.props.path + "\$");

        if(regex.test(currentPath)){
            return this.props.children;
        }

        return null;
    }
}

export default Route
