/**
 * Created by zhaoky on 2017/1/18.
 */
const gulp = require("gulp");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
gulp.task('default', () => {
	return browserify("dev/index.js")
		.transform(babelify,{presets:["es2015"]})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest("dist"));
});