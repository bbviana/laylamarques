var React = require('react');


var Description = React.createClass({
    render: function () {
        return (
            <div style={_.container}>
                <h1 style={_.title}>Descrição</h1>
                <div style={_.body}>
                    {this.props.text}
                </div>
            </div>
        );
    }
});

var _ = {
    container: {
        padding: 26
    },

    title: {
        margin: '0 0 10px 0',
        fontSize: 28,
        lineHeight: '40px'
    },

    body: {
        lineHeight: '22px',
        textAlign: 'justify'
    }
};

module.exports = Description;