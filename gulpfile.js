var browserify = require('gulp-browserify');
var babel = require("gulp-babel");
var babelify = require("babelify");
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var reactify = require('reactify');
var uglify = require('gulp-uglify');

var paths = {
    src: 'src/main/webapp/js',
    target: 'target/laylamarques/js'
};

var reactifyES6 = function (file) {
    return reactify(file, {'es6': true});
};

gulp.task('clean:modules:app', function (cb) {
    del(['node_modules/app/**'], cb)
});

gulp.task('clean:bundlejs', function (cb) {
    del(paths.target + "/bundle.js", cb)
});


// permite usar require('app/...') e evita que tenhamos que usar require('../../../../')
gulp.task('copy:to:node_modules', function () {
    gulp.src(paths.src + '/**/*.js')
        .pipe(babel())
        .on('error', function (err) {
            console.error('Babel ERROR in ' + err.fileName);
            console.error(err.message);
            this.end();
        })
        .pipe(gulp.dest('node_modules/app'));
});

gulp.task('browserify', ['clean:bundlejs', 'copy:to:node_modules'], function () {
    gulp.src(paths.src + '/main.js')
        .pipe(browserify({
            transform: [babelify], // es6 to es5 + reactify
            debug: true // gera source maps
        }))
        .on('error', function (err) {
            console.error('JSX ERROR in ' + err.fileName);
            console.error(err.message);
            this.end();
        })
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(paths.target));
});


gulp.task('default', ['browserify']);

gulp.task('watch', function () {
    gulp.watch(paths.src + '/**/*.js', ['default']);
});
