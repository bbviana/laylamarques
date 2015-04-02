var Promise = require('es6-promise').Promise;
var $ = require('jquery');
var assign = require('object-assign');

var xhr = {
    promise(settings) {
        return new Promise(function (resolve, reject) {
            var completeSettings = assign({}, settings, {
                success(data) {
                    resolve(data);
                },

                error(xhr, status, err) {
                    reject(err);
                }
            });

            $.ajax(completeSettings);
        });
    }
};


//module.exports = xhr;

// FIXME remover Server (mock)
var MockServer = require('app/mock/Server');

var xhrMock = {
    promise(settings) {
        return new Promise(function (resolve, reject) {
            var data = MockServer(settings.url);

            setTimeout(function(){
                resolve(data);
            }, 1000);
        });
    }
};

module.exports = xhrMock;