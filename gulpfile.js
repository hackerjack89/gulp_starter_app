'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var slim = require('gulp-slim');
var gutil = require('gulp-util');
var connect = require('gulp-connect');

var path = {
  sass_src: ["./src/sass/**/*.scss", "./src/sass/*.scss"],
  sass_dest: "./dist/css",

  coffee_src: ["./src/coffee/**/*.coffee", "./src/coffee/*.coffee"],
  coffee_dest: "./dist/js", 

  slim_src: ["./src/slim/**/*.slim", "./src/slim/*.slim"],
  slim_dest: "./dist/"

}


gulp.task('slim', function() {
  gulp.src(path.slim_src)
    .pipe(slim({
      pretty: true  
    }))
    .pipe(gulp.dest(path.slim_dest))
    .pipe(connect.reload());
});

gulp.task("coffee", function(){
  gulp.src(path.coffee_src)
    .pipe(coffee({bare:true}).on('error', gutil.log))
    .pipe(gulp.dest(path.coffee_dest))
    .pipe(connect.reload());
});


gulp.task("sass", function() {
  gulp.src(path.sass_src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.sass_dest))
    .pipe(connect.reload());
});

gulp.task("slim:watch", function() {
  gulp.watch(path.slim_src, ['slim']);
});


gulp.task("watch", function() {
  connect.server({
    root: './dist',
    livereload: true
  });
  gulp.watch(path.slim_src, ['slim']);
  gulp.watch(path.coffee_src, ['coffee']);
  gulp.watch(path.sass_src, ['sass']);
});
