var React = require('react');
var PropTypes = React.PropTypes;
var Fetcher = require('app/utils/Fetcher');

var Img = require('./Img');

var ItemList = React.createClass({
    render() {
        return (
            <div style={_.container}>
                {this.props.items.map(function (item, i) {
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

module.exports = Fetcher.wrap(ItemList);