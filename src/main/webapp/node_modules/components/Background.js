var React = require('react/addons');
var PropTypes = React.PropTypes;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Img = require('./Img');

// TODO ReactCSSTransitionGroup tem um bug ao trocar de aba no browser; nao ha patch ainda
var Background = React.createClass({
    propTypes: {
        images: PropTypes.array.isRequired
    },
    getInitialState() {
        return {imageIndex: 0}
    },

    componentDidMount() {
        this.interval = setInterval(this._gotoNextImage, timeToShowImage);
    },
    componentWillUnmount() {
        clearInterval(this.interval);
    },

    _gotoNextImage() {
        var nextIndex = (this.state.imageIndex + 1) % this.props.images.length;
        this.setState({imageIndex: nextIndex});
    },

    render() {
        console.log("Background:render");

        var imgSrc = this.props.images[this.state.imageIndex];

        return (
            <div style={_.container}>
                <ReactCSSTransitionGroup transitionName="carousel">
                    <Img style={_.img} src={imgSrc} key={imgSrc}/>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});

var timeToShowImage = 995000; //ms

var _ = {
    container: {
        height: '100%',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: -999
    },

    img: {
        position: 'fixed',
        width: '100%'
    }
};

module.exports = Background;