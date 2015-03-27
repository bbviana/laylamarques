var React = require('react');

var ReviewCard = require('./ReviewCard');
var ScoreBox = require('./ScoreBox');
var WriteAReview = require('./WriteAReview');


var Reviews = React.createClass({
    render: function () {
        var score = this.props.reviews.score;
        var count = this.props.reviews.count;
        var list = this.props.reviews.list || [];

        return (
            <div className="clearfix" style={styles.container}>
                <div style={styles.heading}>
                    <h1 style={styles.title}>Reviews</h1>
                    <WriteAReview />
                </div>

                <div style={styles.body}>
                    <ScoreBox score={score} count={count}/>

                    <div style={styles.reviews}>
                    {list.map(function (review, i) {
                        return <ReviewCard key={i} review={review}/>
                    })}
                    </div>
                </div>
            </div>
        );
    }
});

var styles = {
    container: {
        padding: 26
    },
    heading: {
        position: 'relative'
    },
    title: {
        margin: '0 0 10px 0',
        fontSize: 28,
        lineHeight: '40px'
    },
    body: {},
    reviews: {
        marginLeft: 190
    }
};

module.exports = Reviews;