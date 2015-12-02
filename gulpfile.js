//dependencies
//nongulp
var exec = require('child_process').exec;
var path = require('path');
//gulps
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
var outputDistJsDir = 'public/dist/js';
var outputDistCssDir = 'public/dist/css';
var outputDistViewDir = 'public';

//scripts
var appScripts = [
	'src/client/*.js'
];

var pagesScripts = [
	'src/client/pages/*.js',
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

//back end
var backendScripts = [
	'src/backend/*.js'
];


//other extras
var headerBanner = '//Developed by Sy Le. Coprighted by Salesforce.com 2015\n';


//task detail
//front end
var generateStyles = function(src, dest){
	return function(){
		return gulp.src(src)
			.pipe(plumber())
		    .pipe(less())
		    .pipe(concat(dest))
		    .pipe(minify({
		        mangle: false
		    }))
		    .pipe(gulp.dest(outputDistCssDir));
	}
}

var generateViews = function(src){
	return function(){
		return gulp.src(src, {base: './view'})
			.pipe(gulp.dest(outputDistViewDir));
	}
}


var generateScripts = function(src, srcBase){
	return function(){
		return gulp.src(src, srcBase)
			.pipe(plumber())
		    // .pipe(sourcemaps.init())
		    .pipe(babel({
				resolveModuleSource: function(source, filename) {
					//remap the path
					const newPath = source.replace('/aura-explorer/', 'dist/js/');
					return newPath;
				}
		    }))
		    // .pipe(sourcemaps.write("."))
		    .pipe(header(headerBanner))
		    // .pipe(minify({
		    //     mangle: false
		    // }))
		    .pipe(gulp.dest(outputDistJsDir));
	}
}

var generateScripts_Frontend_App = function(){
	return generateScripts(appScripts, { base : './src/client' });
}

var generateScripts_Frontend_Pages = function(){
	return generateScripts(pagesScripts, { base : './src/client' });
}

var generateScripts_Frontend_Vendor = function(){
	return function(){
		return gulp.src(vendorScripts)
			.pipe(plumber())
		    .pipe(concat('vendor.js'))
		    .pipe(header(headerBanner))
		    .pipe(gulp.dest(outputDistJsDir));
	}
}


//back end
var generateScripts_Backend = function(src){
	return generateScripts(src, { base : './src' });
}


//task definitons
//frontend
gulp.task('views', generateViews(appViews));
gulp.task('styles', generateStyles(appStyles, 'app.css'));
gulp.task('scripts_frontend_app',    generateScripts_Frontend_App()    );
gulp.task('scripts_frontend_pages',  generateScripts_Frontend_Pages()  );
gulp.task('scripts_frontend_vendor', generateScripts_Frontend_Vendor() );
//back end
gulp.task('scripts_backend', generateScripts_Backend(backendScripts));
//build data
gulp.task('pkg', function (cb) {
	exec('npm run pkg', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
})

gulp.task('dev', function(){
	gulp.run('default');
	gulp.watch(appScripts,  ['scripts_frontend_app']);
	gulp.watch(vendorScripts,  ['scripts_frontend_vendor']);
	gulp.watch(pagesScripts,  ['scripts_frontend_pages']);
	gulp.watch(appStyles,  ['styles']);
	gulp.watch(appViews,  ['views']);
})


//publis alias
gulp.task('scripts', ['scripts_frontend_app', 'scripts_frontend_pages', 'scripts_frontend_vendor', 'scripts_backend']);
gulp.task('default', ['scripts', 'styles', 'views']);
