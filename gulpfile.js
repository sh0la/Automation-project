const {src, dest, series, watch} = require('gulp');
const autoprefix = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const babel = require('gulp-babel');
const concatenate = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

function html() {
  return src('./src/index.html')
    .pipe(dest('./dest'))
    
}

function styles() {
  return src('./src/css/**/*.css')
    .pipe(autoprefix('last 2 versions'))
    .pipe(cleancss())
    .pipe(dest('./dest/css'))
}

function reimage() {
  return src('./src/images/**/*')
    .pipe(imagemin())
    .pipe(dest('./dest/images'))
}


function js() {
  return src([
      './src/js/**/resources.js',
      './src/js/**/app.js',
      './src/js/**/engine.js'
    ])
      .pipe(concatenate('main.js'))
      .pipe(dest('./dest/js'))
}

function watching(cb) {
  watch('./src/index.html').on('change', html)
  watch('./src/js/**/*.js').on('change', js)
  watch('./src/css/**/*.css').on('change', styles)
  cb()
}

//exports.js = js;
exports.default = series(html, styles, js, reimage, watching)