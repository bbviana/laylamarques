import $ from 'jquery'
import fakeServer from 'database/fakeServer'

var xhr = {
    get(url, settings) {
        return new Promise(function (resolve, reject) {
            console.log("Requesting...", url);

            var completeSettings = Object.assign({}, settings, {
                url: url,
                type: 'GET',
                dataType: 'json',

                success(data) {
                    console.log("Response", data);
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



var xhrMock = {
    get(url, settings) {
        return new Promise(function (resolve, reject) {
            console.log("Requesting...", url);

            var data = fakeServer(url);

            setTimeout(function(){
                console.log("Response", data);
                resolve(data);
            }, 500);
        });
    },

    post(url, settings) {
        return new Promise(function (resolve, reject) {
            console.log("Posting...", url);

            var data = fakeServer(url);

            setTimeout(function(){
                console.log("Response", data);
                resolve(data);
            }, 500);
        });
    }
};


// FIXME remover xhrMock
export default xhrMock
//export default xhr
