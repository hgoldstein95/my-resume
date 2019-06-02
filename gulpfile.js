var gulp = require("gulp");

var sass = require("gulp-sass");
var jade = require("gulp-jade");
var browserSync = require("browser-sync").create();
var autoprefixer = require("gulp-autoprefixer");

var sassPath = "sass";
var scssPath = "sass";
var cssPath = "css";
var jadePath = "jade";

gulp.task("jade", function() {
  return gulp
    .src(jadePath + "/*.jade")
    .pipe(jade())
    .on("error", console.error.bind(console))
    .pipe(gulp.dest("."))
    .pipe(browserSync.stream());
});

gulp.task("sass", function() {
  return gulp
    .src([sassPath + "/*.sass", scssPath + "/*.scss"])
    .pipe(sass())
    .on("error", console.error.bind(console))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .on("error", console.error.bind(console))
    .pipe(gulp.dest(cssPath))
    .pipe(browserSync.stream());
});

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "."
    }
  });
});

gulp.task("watch", function() {
  gulp.watch([sassPath + "/*.sass", scssPath + "/*.scss"], gulp.series("sass"));
  gulp.watch(jadePath + "/*.jade", gulp.series("jade"));
});

gulp.task(
  "default",
  gulp.parallel(gulp.series("sass", "jade", "watch"), "browser-sync")
);
