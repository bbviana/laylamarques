var React = require('react');

var StarRating = require('app/components/StarRating');


var ReviewCard = React.createClass({
    render: function () {
        var author = this.props.review.author;
        var avatar = this.props.review.avatar;
        var rating = this.props.review.rating;
        var title = this.props.review.title;
        var text = this.props.review.text;

        return (
            <div style={styles.container} className="review-card">
                <img style={styles.avatar} src={avatar}/>

                <div style={styles.info}>
                    <div style={styles.author}>{author}</div>

                    <StarRating score={rating}/>

                    <div style={styles.text}>
                        <span style={styles.title}>{title}</span> {text}
                    </div>
                    <div style={styles.paragraphEnd}></div>
                </div>
            </div>
        );
    }
});

var styles = {
    container: {
        maxWidth: 340,
        fontSize: 16,
        position: 'relative',
        margin: '0 30px 30px 0',
        display: 'inline-block'
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        boxShadow: '0 1px 2px #8d8d8d',
        float: 'left'
    },
    info: {
        marginLeft: 63
    },
    author: {
        display: 'inline-block',
        fontSize: 13,
        fontWeight: 'bold',
        marginRight: 10
    },
    title: {
        color: '#555',
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    text: {
        color: '#8d8d8d',
        overflow: 'hidden',
        maxHeight: 68
    },
    paragraphEnd: {
        background: 'linear-gradient(to right,rgba(245,245,245,0),rgba(245,245,245,1))',
        width: 40,
        height: 25,
        position: 'absolute',
        right: 0,
        bottom: 0
    }
};

module.exports = ReviewCard;