var xhr = require('./xhr');

var BackgroundClient = {
    all: function (categoryId) {
        return xhr.promise({
            url: '/laylamarques/ws/background-images/',
            type: 'GET',
            dataType: 'json'
        });
    }
};

module.exports = BackgroundClient;