var xhr = require('./xhr');

// ws/items/*
var ItemClient = {
    byCategory: function (categoryId) {
        return xhr.promise({
            url: '/laylamarques/ws/items/category/' + categoryId,
            type: 'GET',
            dataType: 'json'
        });
    }
};

module.exports = ItemClient;