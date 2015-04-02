var RouterMixin = require('react-mini-router').RouterMixin;
var assign = require('object-assign');

var AsyncRouterMixin = assign({}, RouterMixin, {
    handleClick(evt) {
        console.log("handleClick");
        RouterMixin.handleClick.call(this, evt);
    }
});


module.exports = AsyncRouterMixin;