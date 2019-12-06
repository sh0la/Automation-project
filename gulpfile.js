const {src, dest} = require('gulp');
const autoprefix = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');


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





exports.styles = styles;