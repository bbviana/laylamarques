var React = require('react');

var ActionBar = require('./ActionBar');
var Logo = require('./Logo');
var MenuBar = require('./MenuBar');
var Search = require('./Search');
var UserInfo = require('./UserInfo');


var Header = React.createClass({
    render: function () {
        return (
            <div>
                <div style={styles.row1}>
                    <Logo />
                    <Search />
                    <UserInfo />
                </div>
                <div style={styles.row2}>
                    <MenuBar />
                    <ActionBar />
                </div>
            </div>
        );
    }
});

var styles = {
    row1: {
        background: '#f1f1f1',
        height: 60,
        position: 'relative'
    },

    row2: {
        position: 'relative'
    }
};

module.exports = Header;
