var React = require('react/addons');
var PropTypes = React.PropTypes;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Menu = React.createClass({
    propTypes: {
        categories: PropTypes.array.isRequired
    },

    render() {
        return (
            <div id="menu" className="no-text-select" >
                {this.props.categories.map(function (category, i) {
                    return category.children ?
                        <DropdownMenu item={category} key={i} /> :
                        <LinkMenu item={category} key={i} />
                })}
            </div>
        );
    }
});

var DropdownMenu = React.createClass({
    getInitialState() {
        return {open: false}
    },

    _toggle() {
        this.setState({open: !this.state.open});
    },

    render() {
        var item = this.props.item;

        return (
            <div className="menu-item">
                <div className="menu-title" onClick={this._toggle}>
                    {item.name}
                </div>
                <ReactCSSTransitionGroup transitionName="carousel">
                    {this.state.open &&
                    <SubMenus items={item.children}/>}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});

var SubMenus = React.createClass({
    render() {
        var items = this.props.items;

        return (
            <div className="menu-sub">
                {items.map(function (item, i) {
                    return <LinkMenu item={item} key={i}/>
                })}
            </div>
        );
    }
});

// TODO os links nao podem incluir o contextPath hard coded
var LinkMenu = React.createClass({
    render() {
        var item = this.props.item;

        return <a className="menu-title"  href={"/laylamarques/items/category/" + item.id}>{item.name}</a>
    }
});

// estilos em app.css

module.exports = Menu;
