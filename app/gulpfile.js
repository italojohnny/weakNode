var gulp = require("gulp");
var gutil = require("gulp-util");
var concat = require("gulp-concat");
var minifycss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var livereload = require("gulp-livereload");

var css = {
	source: "static/src/css",
	target: "static/public/css"
};

var js = {
	source: "static/src/js",
	target: "static/public/js"
};

gulp.task("css", function () {
	gulp.src([
		css.source + "/normaset.css",
		css.source + "/*.css"
	])
	.pipe(minifycss())
	.pipe(concat("all.min.css"))
	.pipe(gulp.dest(css.target))
	.pipe(livereload());
});

gulp.task("js", function () {
	gulp.src([
		js.source + "/vendor/*.js",
		js.source + "/*.js"
	])
	.pipe(concat("all.min.js"))
	.pipe(uglify({mangle: true}).on("error", gutil.log))
	.pipe(gulp.dest(js.target))
	.pipe(livereload());
});

gulp.task("default", ["css", "js"]);
gulp.task("watch", function () {
	livereload.listen();
	gulp.watch("static/src/css/*.css", ["css"]);
	gulp.watch("static/src/js/*.js", ["js"]);
});
