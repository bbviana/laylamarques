var React = require('react');
var PropTypes = React.PropTypes;

var AddressSection = React.createClass({
    render() {
        return (
            <div style={_.container}>
                Rua Jeroaquara, 406 <br />
                Vila Romana <br />
                São Paulo - SP <br />
                (11) 99410-9856 <br />
            </div>
        );
    }
});

var _ = {
    container: {
        background: '#FFF',
        fontSize: '0.9em',
        padding: 10
    }
};

module.exports = AddressSection;