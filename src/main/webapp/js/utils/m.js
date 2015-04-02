var assign = require('object-assign');

/**
 * @returns {} objeto resultante de um merge entre os arguments recebidos que não forem false
 */
module.exports = function(){
    var res = {};
    for(var i = 0; i < arguments.length; i++){
        if(arguments[i]){
            assign(res, arguments[i]);
        }
    }
    return res;
};
