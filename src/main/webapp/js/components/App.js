var React = require('react');
var RouterMixin = require('react-mini-router-async').RouterMixin;
var Promise = require('es6-promise').Promise;

var AddressSection = require('./AddressSection');
var Background = require('./Background');
var ItemList = require('./ItemList');
var LoadingWindow = require('./LoadingWindow');
var Logo = require('./Logo');
var Menu = require('./Menu');
var SocialInfoSection = require('./SocialInfoSection');

// TODO mocks: apagar
var BGImages = require('../mock/BGImages');
var Categories = require('../mock/Categories');


var App = React.createClass({
    mixins: [RouterMixin],

    routes: {
        '/': 'home',
        '/categories/:id': {
            fetcher: 'loadItemsByCategory',
            handler: 'itemList'
        }
    },
    home() {
        return null;
    },

    loadItemsByCategory(id){
        return new Promise(function(resolve, reject){
            console.log("loadItemsByCategory");

            resolve();
        });

    },

    itemList() {
        return <ItemList />
    },

    render() {
        console.log("App:render");

        return (
            <div style={_.container}>
                <LoadingWindow />
                <Background images={BGImages}/>

                <div style={_.sideMenu}>
                    <Logo />
                    <Menu categories={Categories}/>
                    <SocialInfoSection />
                    <AddressSection />
                </div>

                <div style={_.center}>
                    {this.renderCurrentRoute()}
                </div>
            </div>
        );
    }
});

var _ = {
    container: {
        height: '100%',
        position: 'relative'
    },
    center: {
        //border: '1px solid blue',
        height: '100%',
        marginLeft: 240 // sideMenu.width
    },
    sideMenu: {
        //border: '1px solid red',
        height: '100%',
        left: 0,
        padding: 50,
        position: 'absolute',
        top: 0,
        width: 240
    }
};

module.exports = App;
