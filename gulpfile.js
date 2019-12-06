const {src, dest} = require('gulp');




function html(cb) {
  src('./src/index.html')
    .pipe(dest('./dest'))
    cb()
}







exports.html = html;