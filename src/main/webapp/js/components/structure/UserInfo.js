var React = require('react');


var UserInfo = React.createClass({
    render: function () {
        var avatar = "/touch-library/img/user.jpg";

        return (
            <div style={styles.container}>
                <div style={styles.userName}>Bruno Viana</div>
                <img style={styles.avatar} src={avatar}/>
            </div>
        );
    }
});

var styles = {
    container: {
        height: 60,
        lineHeight: '60px',
        padding: '0 30px',
        position: 'absolute',
        right: 0,
        top: 0
    },
    userName: {
        display: 'inline-block',
        margin: '0 10px'
    },
    avatar: {
        borderRadius: '50%',
        boxShadow: '0 1px 2px #8d8d8d',
        height: 32,
        width: 32
    }
};

module.exports = UserInfo;