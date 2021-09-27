module.exports = function () {
  $.gulp.task('copy', function () {
    return $.gulp.src([
        '*.html'
    ], {
      base: '.'
    })
        .pipe($.gulp.dest('build'));
  });
};
