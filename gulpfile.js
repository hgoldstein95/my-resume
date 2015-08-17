var gulp = 					require('gulp');

var sass = 					require('gulp-sass');
var jade = 					require('gulp-jade');
var browserSync = 	require('browser-sync').create();
var autoprefixer = 	require('gulp-autoprefixer');

var sassPath = 'sass';
var scssPath = 'sass';
var cssPath = 'css'
var jadePath = 'jade';

gulp.task('jade', function() {
	gulp.src(jadePath + '/*.jade')
		.pipe(jade())
		.on('error', console.error.bind(console))
		.pipe(gulp.dest('.'))
		.pipe(browserSync.stream());
});

gulp.task('sass', function() {
	gulp.src([sassPath + '/*.sass', scssPath + '/*.scss'])
		.pipe(sass())
		.on('error', console.error.bind(console))
		.pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
		.on('error', console.error.bind(console))
		.pipe(gulp.dest(cssPath))
		.pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: '.'
		},
		notify: false
	})
});

gulp.task('watch', function() {
	gulp.watch([sassPath + '/*.sass', scssPath + '/*.scss'], ['sass']);
	gulp.watch(jadePath + '/*.jade', ['jade']);
});

gulp.task('default', ['sass', 'jade', 'watch', 'browser-sync']);
