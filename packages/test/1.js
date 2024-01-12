'use strict';
/* eslint-env es6 */
const childProcess = require('child_process'); //githash用
const BufferStreams = require('bufferstreams'); //githash用
const chalk = require('chalk');
const log = require('fancy-log');
const preprocess = require('gulp-preprocess');
const del = require('del');
const yargs = require('yargs');
const plumber = require('gulp-plumber');
const path = require('path');
const URL = require('url');
const gulp = require('gulp');
const debug = require('gulp-debug');
const postcss = require('gulp-postcss');
const postUrl = require('postcss-url');
const map = require('map-stream');
const fs = require('fs');
const express = require('express');
const replace = require('gulp-replace');
const imagemin = require('gulp-imagemin');
const devip = require('dev-ip');
const jmUploader = require('jm-uploader');


const projRootDir = path.join(process.cwd(), 'src');
let baseURL = 'http://f0.jmstatic.com/wx/';
let gitFileInfo = {};
const fileUploader = jmUploader({
	// 文件上传配置
	base: '/static/wx/',
	user: 'jumeife',
	password: process.env.CI_UPLOAD_PASSWORD || '123456',
	url: 'http://pic.int.jumei.com/zip_async_upload',
	// 网络请求超时时间，65.535秒
	timeout: 0xFFFF,
});

function errorHandle(error) {
	log();
	if (!process.exitCode) {
		process.exitCode = 1;
	}
}

function plumberHandle() {
	return plumber(errorHandle);
}
// 获取带git hash的文件名
function getPathWithHash(file) {
	let fileInfo = gitFileInfo[path.join('src', file)];
	if (fileInfo) {
		return file.replace(/(\.\w+)?$/, '_' + fileInfo.hash + '$1');
	}
}
// 文件上传任务
function img_up() {
	return gulp.src(['src/images/**/*.*'], {
		base: projRootDir,
	})
		.pipe(plumberHandle())
		.pipe(imagemin())
		.pipe(map((file, cb) => {
			let newPtah = getPathWithHash(file.relative);
			if (newPtah) {
				file.path = path.join(projRootDir, newPtah);
			}
			cb(null, file);
		}))
		.pipe(fileUploader);
}


function cdnUrl(url) {
	url = getPathWithHash(url) || url;
	url = URL.resolve(baseURL, url.replace(/\\/g, '/'));
	return decodeURI(url);
}
// wxss 替换url功能
function wxss() {
	return gulp.src(['src/**/*.wxss'], {
		base: projRootDir,
	}).pipe(plumberHandle()).pipe(postcss([
		postUrl({
			// 配置url替换规则
			url: function (asset) {
				return cdnUrl(path.relative(projRootDir, asset.absolutePath));
			}
		})
	])).pipe(gulp.dest('dist'));
}
// wxml 替换url功能
function wxml() {
	return gulp.src(['src/**/*.wxml'], {
		base: projRootDir,
	}).pipe(plumberHandle()).pipe(replace(/\bsrc=(["']?)(.+?)\1/, function (s, quote, url) {
		if (!url || /^(?:\w+?:)?\/\//.test(url)) {
			return s;
		} else if (/^\//.test(url)) {
			url = url.slice(1);
		} else {
			url = path.join(path.dirname(this.file.relative), url);
		}
		if (/^images/.test(url)) {
			return `src=${quote}${cdnUrl(url)}${quote}`;
		}
		return s;
	})).pipe(gulp.dest('dist'));
}
// git_hash
function git_hash() {
	return getGitFiles().then(result => {
		gitFileInfo = result;
		return gitFileInfo;
	}).catch(errorHandle);
}
// git_hash:获取git仓库中所有文件的详细信息
function getGitFiles() {
	return getBuffer(getGitLsFiles()).then(getHash);
}
// git_hash:从stream对象中获取buffer对象
function getBuffer(stream) {
	return new Promise((resolve, reject) => {
		stream.pipe(new BufferStreams(function (err, buf, cb) {
			cb(err, buf);
			if (buf) {
				resolve(buf);
			} else if (err) {
				reject(err);
			}
		}));
	});
}
// git_hash:执行git命令'git ls-files --stage -z'命令，返回控制台输出stream对象
function getGitLsFiles() {
	const diff = childProcess.spawn('git', ['ls-files', '--stage', '-z']);
	return diff.stdout;
}
// git_hash:回调
function getHash(data) {
	let result = {};
	if (data && data.length) {
		// https://git-scm.com/docs/git-diff#_raw_output_format
		let str = data.toString();
		str.replace(/(\d+)\s+(\w+)\s+(\d+)\t(.+?)\u0000/g, function (s, mode, hash, stage, file) {
			result[path.normalize(file)] = {
				mode, hash, stage
			};
		});
	}
	return result;
}
// js文件条件注释语法支持
function file_cc() {
	return gulp.src(['src/config/index.js', 'src/app.json'], {
		base: projRootDir,
	})
		.pipe(plumberHandle())
		.pipe(jscc())
		.pipe(gulp.dest('dist')
		);
}
function patchAppJson(done) {
	if (!/^release\b/.test(process.env.CI_BUILD_REF_NAME)) {
		debugger
		let file = require.resolve('./dist/app.json');
		let date = require(file);
		date.debug = false;
		fs.writeFile(file, JSON.stringify(date), done);
	} else if (done) {
		done();
	}
}

if (process.env.CI_DEBUG_TRACE && process.env.CI_DEBUG_TRACE !== 'false') {
	// 调试语句，打印以CI或GIT开头的环境变量
	Object.keys(process.env).forEach(key => {
		if (/^(?:CI|GIT(?:LAB)?)(?:_|$)/.test(key)) {
			console.log(key, process.env[key]);
		}
	});
}

process.on('unhandledRejection', errorHandle);

function file_copy() {
	return gulp.src([
		'src/**/*',
		'!src/images/**/*',
		'!src/*.js',
		'!src/**/*.wxss',
		'!src/images/**/*',
	], {
			base: projRootDir,
		}).pipe(gulp.dest('dist'));
}

exports.default = gulp.series(git_hash, gulp.parallel(file_cc, wxss, wxml), patchAppJson);
exports.deploy = gulp.series(git_hash, img_up);
exports.watch = function () {
	const app = express();
	const argv = yargs.argv;
	const port = parseInt(argv.port) || 3000;
	const ip = argv.ip || devip()[0];
	app.use('/wx/', express.static('src/'));
	app.listen(port, function () {
		console.log(`HTTP server ready on http://${ip}:${port}`);
	});
	baseURL = `http://${ip}:${port}/wx/`;
	file_cc();
	wxss();
	wxml();
	patchAppJson();
	file_copy();
	return gulp.watch('src/**/*', gulp.parallel(file_cc, wxss, wxml, file_copy));
};
