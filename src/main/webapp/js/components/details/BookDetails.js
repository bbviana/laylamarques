var React = require('react');
var PropTypes = React.PropTypes;

var Image = require('app/components/Image');
var StarRating = require('app/components/StarRating');

var Description = require('./Description');
var DownloadButton = require('./DownloadButton');
var MoreActions = require('./MoreActions');
var Reviews = require('./Reviews');
var Similar = require('./Similar');


var BookDetails = React.createClass({
    propTypes: {
        book: PropTypes.object
    },

    render: function () {
        console.log("BookDetails:render");

        var book = this.props.book;
        var reviews = book.reviews || {};

        return (
            <div style={_.container}>
                <div style={_.detailsSection}>
                    <Image style={_.cover} src={book.cover.id} />

                    <div style={_.info}>
                        <h1 style={_.title}>{book.title}</h1>

                        <div style={_.subtitle}>
                            <a style={_.author} href="#">{book.author}</a>
                            <div style={_.separator}>-</div>
                            <div style={_.datePublished}>{book.datePublished}</div>
                            <div style={_.publisher}>{book.publisher}</div>
                        </div>

                        <div style={_.actions}>
                            {book.files.map(function (file, i) {
                                return <DownloadButton key={i} file={file} />
                            })}

                            <MoreActions bookId={book.id} />
                        </div>

                        <div style={_.divider}></div>

                        <div>
                            <StarRating score={reviews.score} />
                            <div style={_.reviewsCount}>
                                (<i className="glyphicon glyphicon-user"></i> {reviews.count})
                            </div>
                        </div>
                    </div>
                </div>

                <Description text={book.description}/>

                <Reviews reviews={reviews} />

                <Similar list={book.similar}/>
            </div>
        );
    }
});

var _ = {
    container: {
        background: '#f5f5f5'
    },
    detailsSection: {
        background: '#e5e5e5',
        borderBottom: '2px solid #d6d6d6',
        padding: 26
    },
    cover: {
        boxShadow: '0 0 4px #8d8d8d',
        display: 'inline-block',
        width: 200
    },
    info: {
        display: 'inline-block',
        padding: '0 30px',
        verticalAlign: 'top'
    },
    title: {
        color: '#333',
        fontSize: 28,
        lineHeight: '35px',
        margin: 0
    },
    subtitle: {
        color: '#8d8d8d',
        fontSize: 13
    },
    author: {
        color: '#8d8d8d',
        display: 'inline-block',
        fontWeight: 'bold'
    },
    separator: {
        display: 'inline-block',
        margin: '0 5px'
    },
    datePublished: {
        display: 'inline-block'
    },
    actions: {
        margin: '10px 0'
    },
    divider: {
        borderTop: '1px solid rgba(0,0,0,0.1)',
        margin: '15px 0',
        maxWidth: 510,
        width: '100%'
    },
    reviewsCount: {
        color: '#8d8d8d',
        display: 'inline-block',
        fontSize: 13,
        marginLeft: 5,
        verticalAlign: 'middle'
    }
};

module.exports = BookDetails;
