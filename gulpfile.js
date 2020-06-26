var gulp = require('gulp');
var uglify = require('gulp-uglify');


gulp.task('uglify',function(){
    gulp.src('./js/index.js').pipe(uglify()).pipe(gulp.dest('./gulp/ysjs'));
});


gulp.task('html', function () {
    gulp.src('./goods.html').pipe(gulp.dest('./gulp/html'))
  });


var concat = require('gulp-concat');
gulp.task('concat', function () {
  // concat(文件名称)   合并之后保存的文件名称
  return gulp.src('./js/*.js').pipe(concat('all.js')).pipe(gulp.dest('./gulp/js'));
})


var watch = require('gulp-watch');

gulp.task('html', function (done) {
    gulp.src('./html/index.html').pipe(connect.reload());
    done();
  });
  //搭建服务器
  gulp.task('server', function (done) {
    connect.server({
      root: './html',
      port: 8080,
      livereload: true
    });
    done();
  })
  
  //指定监听
  gulp.task('watch', function (done) {
    watch('./html/*.html', gulp.series('html'));
    done();
  })
  gulp.task('default', gulp.parallel('server', 'html', 'watch'))


  var babel = require('gulp-babel');
gulp.task('babel', function (done) {
  gulp.src('./html/goods.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./dist'));

  done();
});


var  sass = require('gulp-sass');