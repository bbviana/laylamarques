var xhr = require('./xhr');

 // /ws/categories/*
var CategoryClient = {
    all: function () {
        return xhr.promise({
            url: '/laylamarques/ws/categories',
            type: 'GET',
            dataType: 'json'
        });
    }
};

module.exports = CategoryClient;