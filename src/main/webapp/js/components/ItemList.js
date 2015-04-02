var React = require('react');
var PropTypes = React.PropTypes;
var ActionCreators = require('app/actions/ActionCreators');
var ItemsStore = require('app/stores/ItemsStore');
var StoreWatchMixin = require('app/mixins/StoreWatchMixin');

var Img = require('./Img');

var ItemList = React.createClass({
    mixins: [StoreWatchMixin(ItemsStore)],

    getStateFromStores() {
        return {items: ItemsStore.list()}
    },

    //componentDidMount() {
    //    ActionCreators.loadItemsByCategory(this.props.categoryId);
    //},

    render() {
        return (
            <div style={_.container}>
                {this.state.items.map(function (item, i) {
                    return <Img style={_.item} src={item} key={i} />
                })}
            </div>
        );
    }
});

var _ = {
    container: {},
    item: {
        margin: 10,
        width: 150
    }
};

module.exports = ItemList;