var React = require('react');
var FetcherMixin = require('app/utils/FetcherMixin');
var Route = require('app/utils/Route');

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
    mixins: [FetcherMixin({items: []})],

    render() {
        console.log("App:render");

        return (
            <div style={_.container}>
                <LoadingWindow loading={this.state.loading}/>
                <Background images={BGImages}/>

                <div style={{color:"#FFF"}}>Hello 2</div>

                <div style={_.sideMenu}>
                    <Logo />
                    <Menu categories={Categories}/>
                    <SocialInfoSection />
                    <AddressSection />
                </div>

                <div style={_.center}>
                    <Route path="/">
                        <span>Home</span>
                    </Route>
                    <Route path="items/category/:id">
                        <ItemList query="items/category/11" items={[]}/>
                    </Route>
                </div>
            </div>
        );
    }
});

//<ItemList items={this.state.items}/>

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
