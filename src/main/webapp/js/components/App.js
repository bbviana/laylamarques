var React = require('react');
var RouterMixin = require('react-mini-router').RouterMixin;

var Footer = require('app/components/structure/Footer');
var Header = require('app/components/structure/Header');
var LoadingWindow = require('app/components/structure/LoadingWindow');

var ScreenBookDetails = require('app/components/details/ScreenBookDetails');
var ScreenBookList = require('app/components/list/ScreenBookList');
var ScreenCreateBook = require('app/components/form/ScreenCreateBook');
var ScreenEditBook = require('app/components/form/ScreenEditBook');


var App = React.createClass({
    mixins: [RouterMixin],

    routes: {
        '/': 'home',
        '/books/create': 'create',
        '/books/edit/:id': 'edit',
        '/books/:id': 'details'
    },

    home() {
        return <ScreenBookList />
    },
    create() {
        return <ScreenCreateBook />
    },
    details(id) {
        return <ScreenBookDetails bookId={id} />
    },
    edit(id) {
        return <ScreenEditBook bookId={id}/>
    },

    render() {
        console.log("App:render");

        return (
            <div style={_.container}>
                <LoadingWindow />
                <Header />
                <div style={_.center}>
                    {this.renderCurrentRoute()}
                </div>
                <Footer />
            </div>
        );
    }
});

var _ = {
    container: {
        background: '#e5e5e5',
        minHeight: '100%',
        paddingBottom: 100, // footer
        position: 'relative'
    },
    center: {
        marginTop: 25
    }
};

module.exports = App;
