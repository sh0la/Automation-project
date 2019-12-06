const {src, dest, series} = require('gulp');
const autoprefix = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const babel = require('gulp-babel');
const concatenate = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

function html(cb) {
  src('./src/index.html')
    .pipe(dest('./dest'))
    cb()
}

function styles(cb) {
  src('./src/css/**/*.css')
    .pipe(autoprefix())
    .pipe(cleancss())
    .pipe(dest('./dest/css'))
    cb()
}

function reimage(cb) {
  src('./src/images/**/*')
  .pipe(imagemin())
  .pipe(dest('./dest/images'))
  cb()
}


function js(cb) {
  //src('./src/js/**/*.js')

  src([
    './src/js/**/resources.js',
    './src/js/**/app.js',
    './src/js/**/engine.js'
  ])
    .pipe(concatenate('main.js'))
    .pipe(dest('./dest/js'))
    cb()
}

//exports.js = js;
exports.default = series(html, styles, js)