//dependencies
var path = require('path');
var gulp = require('gulp');
var header = require('gulp-header');
var footer = require('gulp-footer');
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var less = require('gulp-less');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var minify = require('gulp-minify');


//output
var outputDir = 'public';
var outputDistDir = 'public/dist';
var outputDistComponentDir = 'public/dist/components';
var outputDistBackendDir = 'public/dist/backend';

//scripts
var appScripts = [
	'src/client/*.js'
];

var backendScripts = [
	'src/backend/*.js'
];

var componentScripts = [
	'src/client/components/*.js'
];

var vendorScripts = [
	'node_modules/jquery/dist/jquery.js',
	'node_modules/bootstrap/dist/js/bootstrap.js',
	'node_modules/react/dist/react-with-addons.js',
	'node_modules/react-dom/dist/react-dom.js',
	'src/clientInitScript.js'
];

var appStyles = [
	'style/app.less'
];

var appViews = [
	'view/**/*.html'
];


//other extras
var headerBanner = '//Developed by Sy Le. Coprighted by Salesforce.com 2015\n';


//task detail
var generateStyles = function(src, dest){
	return function(){
		return gulp.src(src)
			.pipe(plumber())
		    .pipe(less())
		    .pipe(concat(dest))
		    .pipe(minify({
		        mangle: false
		    }))
		    .pipe(gulp.dest(outputDistDir));
	}
}

var generateScripts = function(src){
	return function(){
		return gulp.src(src)
			.pipe(plumber())
		    // .pipe(sourcemaps.init())
		    .pipe(babel({
				resolveModuleSource: function(source, filename) {
					//remap the path
					return source.replace('./src/client', './dist').replace('/aura-explorer/data', './data').replace('/aura-explorer/backend', './backend');
				}
		    }))
		    // .pipe(sourcemaps.write("."))
		    .pipe(header(headerBanner))
		    .pipe(minify({
		        mangle: false
		    }))
		    .pipe(gulp.dest(outputDistDir));
	}
}


var generateScripts_ReactComponents = function(src){
	return function(){
		return gulp.src(src, {base: './src/client/components'})
			.pipe(plumber())
		    // .pipe(sourcemaps.init())
		    .pipe(babel({
				resolveModuleSource: function(source, filename) {
					//remap the path
					return source.replace('/src/client/', '/dist/');
				}
		    }))
		    // .pipe(sourcemaps.write("."))
		    .pipe(header(headerBanner))
		    .pipe(minify({
		        mangle: false
		    }))
		    .pipe(gulp.dest(outputDistComponentDir));
	}
}

var generateScripts_Backend = function(src){
	return function(){
		return gulp.src(src)
			.pipe(plumber())
		    // .pipe(sourcemaps.init())
		    .pipe(babel({
				resolveModuleSource: function(source, filename) {
					//remap the path
					return source.replace('/src/backend/', '/backend/');
				}
		    }))
		    // .pipe(sourcemaps.write("."))
		    .pipe(header(headerBanner))
		    .pipe(minify({
		        mangle: false
		    }))
		    .pipe(gulp.dest(outputDistBackendDir));
	}
}



var generateScripts_Vendor = function(src){
	return function(){
		return gulp.src(src)
			.pipe(plumber())
		    .pipe(concat('vendor.js'))
		    .pipe(header(headerBanner))
		    .pipe(gulp.dest(outputDistDir));
	}
}


var generateViews = function(src){
	return function(){
		return gulp.src(src, {base: './view'})
			.pipe(gulp.dest(outputDir));
	}
}


//task definitons
gulp.task('styles', generateStyles(appStyles, 'app.css'));
gulp.task('scripts_app', generateScripts(appScripts));
gulp.task('scripts_component', generateScripts_ReactComponents(componentScripts));
gulp.task('scripts_vendor', generateScripts_Vendor(vendorScripts));
gulp.task('scripts_backend', generateScripts_Backend(backendScripts));
gulp.task('views', generateViews(appViews));

gulp.task('dev', function(){
	gulp.run('default');
	gulp.watch(appScripts,  ['scripts_app']);
	gulp.watch(vendorScripts,  ['scripts_vendor']);
	gulp.watch(componentScripts,  ['scripts_component']);
	gulp.watch(appStyles,  ['styles']);
	gulp.watch(appViews,  ['views']);
})


//publis alias
gulp.task('scripts', ['scripts_app', 'scripts_component', 'scripts_vendor', 'scripts_backend']);
gulp.task('default', ['scripts', 'styles', 'views']);
