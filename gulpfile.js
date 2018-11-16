var gulp = require("gulp")
var minifycss = require("gulp-clean-css")
var uglify = require("gulp-uglify")
var htmlmin = require("gulp-htmlmin")
var htmlclean = require("gulp-htmlclean")
var imagemin = require("gulp-imagemin")

// ѹ��html
gulp.task("minify-html", function () {
  return gulp.src("./public/**/*.html")
    .pipe(htmlclean())
    .pipe(htmlmin({
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }))
    .pipe(gulp.dest("./public"))
})

// ѹ��css
gulp.task("minify-css", function () {
  return gulp.src("./public/**/*.css")
    .pipe(minifycss({
      compatibility: "ie8",
      rebase: false
    }))
    .pipe(gulp.dest("./public"))
})

// ѹ��js
gulp.task("minify-js", function () {
  return gulp.src("./public/js/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./public"))
})

// ѹ��ͼƬ
gulp.task("minify-images", function () {
  return gulp.src("./public/images/**/*.*")
    .pipe(imagemin(
      [imagemin.gifsicle({ "optimizationLevel": 3 }),
        imagemin.jpegtran({ "progressive": true }),
        imagemin.optipng({ "optimizationLevel": 7 }),
        imagemin.svgo()],
      { "verbose": true }))
    .pipe(gulp.dest("./public/images"))
})

// Ĭ������
gulp.task("default", gulp.series(gulp.parallel("minify-html", "minify-css", "minify-images")))
