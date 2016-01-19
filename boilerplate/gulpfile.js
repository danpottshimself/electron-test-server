var gulp = require('gulp');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');
var del = require('del');

var paths = {
    scripts: 'app/**.js',
    html: 'index.html',
    images: 'app/images/*.*'
};

gulp.task('clean', function () {
    return del(['.build']);
});

gulp.task('images', ['clean'], function () {
    return gulp.src(paths.images)
        // Pass in options to the task
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('.build/img'));
});

gulp.task('scripts', function () {
    return gulp.src('app/**/*.js')

        .pipe(concat('app.js'))
        .pipe(gulp.dest('.build/scripts'));
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
});

gulp.task('copyHTML', function (){
	return gulp.src('index.html')
		.pipe(gulp.dest('.build/'));
});

gulp.task('copyServer', function (){
	return gulp.src('index.js')
		.pipe(gulp.dest('.build/'));
});

gulp.task('default', ['images', 'copyHTML', 'copyServer','scripts', 'watch']);
