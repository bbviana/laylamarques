var babelify = require("babelify");
var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var notifier = require("node-notifier");
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var paths = {
    src: './src/main/webapp/node_modules',
    target: './target/laylamarques/js'
};

gulp.task('browserify', function () {
    var bundler = browserify({
        entries: [paths.src + '/main.js'], // Only need initial file, browserify finds the deps
        transform: [babelify], /// es6 to es5 + reactify
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher = watchify(bundler);

    var bundle = function () {
        watcher.bundle()
            .on('error', function (error) {
                gutil.log(gutil.colors.red(error.message));
                notifier.notify({
                    title: 'Error',
                    message: 'Check console for details'
                })
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(paths.target))
    };

    watcher.on('time', function (time) {
        gutil.log('Bundle Gerado', gutil.colors.magenta(time + 'ms'));
        notifier.notify({
            title: 'Bundle Gerado',
            message: time + 'ms'
        });
    });

    // When any files update
    watcher.on('update', bundle);

    return bundle();
});

gulp.task('default', ['browserify']);
