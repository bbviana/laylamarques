/**
 * Comunicação com /ws/files/*: upload de arquivos
 */
var FileClient = {
    uploadFile: function (payload) {
        var file = payload.file;
        var onProgressCallback = payload.progress;
        var onSuccessCallback = payload.success;

        // upload
        var data = new FormData();
        data.append("file", file);

        var xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", function (e) {
            onProgressCallback(roundToTwo((e.loaded / e.total) * 100) + "%");
        }, false);

        xhr.addEventListener("load", function (e) {
            var hash = e.target.responseText;
            onSuccessCallback(hash);
        }, false);

        // TODO ouvir evento de erro

        xhr.open("post", "/touch-library/ws/files/upload", true);
        xhr.send(data);
    }
};

// private

function roundToTwo(num) {
    return Math.round(num * 100) / 100;
}

module.exports = FileClient;