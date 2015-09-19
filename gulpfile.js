var babelify = require("babelify");
var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var notifier = require("node-notifier");
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var paths = {
    src: './src/main/webapp/node_modules',
    target: './src/main/webapp/js'
    // target: './target/laylamarques/js'
};

var build = function (watch) {
    var bundler = browserify({
        entries: [paths.src + '/main.jsx'],
        extensions: ['.js', '.jsx'],
        transform: [
            // es6 to es5 + reactify
            babelify.configure({
                stage: 0,
                optional: ["es7.decorators"]
            }),
        ],
        debug: true, // sourcemapping: TRUE em dev
        // cache, packageCache, fullPaths: necessários pra o watchify
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    //bundler.transform({global: true}, 'uglifyify');

    var bundle = function () {
        bundler.bundle()
            .on('error', function (error) {
                gutil.log(gutil.colors.red(error.message));
                notifier.notify({
                    title: 'Error',
                    message: 'Check console for details'
                })
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(paths.target))
            .pipe(livereload());
    };

    if (watch) {
        livereload.listen();

        bundler = watchify(bundler);

        bundler
            .on('update', bundle) // When any files update
            .on('time', function (time) {
                gutil.log('Bundle Gerado', gutil.colors.magenta(time + 'ms'));
                notifier.notify({
                    title: 'Bundle Gerado',
                    message: time + 'ms'
                });
            });
    }

    return bundle();
};

gulp.task('browserify-nowatch', build.bind(this, false));
gulp.task('browserify-watch', build.bind(this, true));
gulp.task('watch', ['browserify-watch']);
gulp.task('default', ['browserify-nowatch']);
