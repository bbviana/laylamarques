var React = require('react');
var PropTypes = React.PropTypes;

var FloatingMenu = require('app/components/FloatingMenu');
var HoverMixin = require('app/mixins/HoverMixin');
var m = require('app/utils').m;


var Menu = React.createClass({
    propTypes: {
        items: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string
        })),
        title: PropTypes.string.isRequired,
        url: PropTypes.string
    },

    mixins: [HoverMixin('#e8e8e8')],

    render: function () {
        return (
            <div style={styles.container}>
                {this.props.items ?
                    <DropdownMenu title={this.props.title} items={this.props.items}/> :
                    <SimpleMenu title={this.props.title} url={this.props.url}/>}
            </div>
        );
    }
});

var SimpleMenu = React.createClass({
    render: function () {
        return <a style={styles.link} href={this.props.url}>{this.props.title}</a>;
    }
});

var DropdownMenu = React.createClass({
    render: function () {
        return (
            <div className="dropdown-button">
                <span>{this.props.title}</span>
                <span style={styles.dropdownIcon}></span>

                <FloatingMenu top={44} left={15}>
                    {this.props.items.map(function (item, i) {
                        return <SimpleMenu key={i} title={item.title} url={item.url} />
                    })}
                </FloatingMenu>
            </div>
        );
    }
});

var styles = {
    container: {
        cursor: 'pointer',
        display: 'inline-block',
        lineHeight: '48px',
        padding: '0 14px',
        position: 'relative'
    },
    link: {
        display: 'block',
        textDecoration: 'none'
    },
    dropdownIcon: {
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAjUlEQVQoz2P4//8/A7mYYYhrzs3N5SsqKsoE0jLYFGZmZgoWFhZmAYEEhmagxsri4uL/QPwYaIAyssbs7GxhoPwFkDyQnoOhGWiqLlDyA7oBaBp/AdW5YfVzfn6+ObIBeXl5xsgagXQA3gBDM+AnLo04QxtqwHeoAX+xacQbVUC/RQA1vQQF5HBNYeRgAKO6bfkUgtZHAAAAAElFTkSuQmCC)',
        backgroundPositionY: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'inline-block',
        height: 15,
        margin: '17px 3px 1px 3px',
        verticalAlign: 'top',
        width: 15
    }
};

module.exports = Menu;