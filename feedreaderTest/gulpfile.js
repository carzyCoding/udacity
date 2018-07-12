var gulp = require('gulp');
var concat = require('gulp-concat'); //把多个js连接到一个js
var uglify = require('gulp-uglify');//压缩js
var browserSync = require('browser-sync').create();//创建浏览器实例

gulp.task('default',['copy-html','copy-css','script'],function() {
	browserSync.init({
		server:'./dist'
	});
});

gulp.task('copy-html',function(){
	gulp.src('./index.html')
	.pipe(gulp.dest('./dist'));
})

gulp.task('copy-css',function(){
	gulp.src('src/css/**/*.css')
	.pipe(gulp.dest('dist/css'));
})

gulp.task('script',function(){
	gulp.src('src/js/**/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
})

gulp.task('jasmine',function(){
	gulp.src('src/jasmine/**/**')
	.pipe(gulp.dest('dist/jasmine'))
})

gulp.task('fonts',function(){
	gulp.src('src/fonts/**')
	.pipe(gulp.dest('dist/fonts'));
})

