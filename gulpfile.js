var gulp = 					require('gulp');

var sass = 					require('gulp-sass');
var jade = 					require('gulp-jade');
var browserSync = 	require('browser-sync').create();
var plumber = 			require('gulp-plumber');
var autoprefixer = 	require('gulp-autoprefixer');

gulp.task('jade', function() {
	gulp.src('jade/*.jade')
		.pipe(plumber())
		.pipe(jade())
		.pipe(gulp.dest('.'))
		.pipe(browserSync.stream());
});

gulp.task('sass', function() {
	gulp.src(['sass/*.sass', 'sass/*.scss'])
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: '.'
		}
	})
});

gulp.task('watch', function() {
	gulp.watch(['sass/*.sass', 'sass/*.scss'], ['sass']);
	gulp.watch('jade/*.jade', ['jade']);
});

gulp.task('default', ['sass', 'jade', 'watch', 'browser-sync']);
