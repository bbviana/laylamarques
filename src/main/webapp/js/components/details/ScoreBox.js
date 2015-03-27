var React = require('react');

var StarRating = require('app/components/StarRating');


var ScoreBox = React.createClass({
    render: function () {
        var score = this.props.score;
        var count = this.props.count;

        return (
            <div style={styles.container}>
                <div style={styles.score}>
                    {score}
                </div>
                <div style={styles.starRating}>
                    <StarRating score={score} size="medium" />
                </div>
                <div style={styles.count}>
                    <i className="glyphicon glyphicon-user"></i> {count} total
                </div>
            </div>
        );
    }
});

var styles = {
    container: {
        width: 160,
        height: 160,
        background: '#FFFFFF',
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: 20,
        textAlign: 'center',
        float: 'left'
    },

    score: {
        fontSize: 64,
        lineHeight: '64px'
    },

    count: {
        color: '#8d8d8d',
        lineHeight: '40px'
    }
};

module.exports = ScoreBox;