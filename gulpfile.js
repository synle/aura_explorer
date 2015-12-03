//dependencies
//nongulp
var _ = require('lodash');;
var exec = require('child_process').exec;
var path = require('path');
var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");


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
var outputDistJsNativeDir = 'public/dist/js';
var outputDistJsFrontendDir = 'public/dist/js/frontend';
var outputDistCssDir = 'public/dist/css';
var outputDistViewDir = 'public';

//scripts
var appScripts = [
	'src/frontend/*.js'
];

var pagesScripts = [
	'src/frontend/**/*.js'
	// 'src/frontend/pages/*.js',
	// 'src/frontend/components/*.js',
	// 'src/frontend/library/*.js'
];

var vendorScripts = [
	'node_modules/jquery/dist/jquery.js',
	'node_modules/bootstrap/dist/js/bootstrap.js',
	'node_modules/react/dist/react-with-addons.js',
	'node_modules/react-dom/dist/react-dom.js',
	'node_modules/q/q.js',
	'src/clientInitScript.js'
];

var appStyles = [
	'style/app.less'
];

var appViews = [
	'view/native/*.html'
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
		return gulp.src(src, {base: './view/native'})
			.pipe(gulp.dest(outputDistViewDir));
	}
}


var generateScripts = function(dest, src){
	var srcBase = { base : './src' };

	return function(){
		return gulp.src(src, srcBase)
			.pipe(plumber())
		    // .pipe(sourcemaps.init())
		    .pipe(babel({
				resolveModuleSource: function(source, filename) {
					//remap the path
					const newPath = source.replace('/aura-explorer/', '~/public/dist/js/');
					return newPath;
				}
		    }))
		    // .pipe(sourcemaps.write("."))
		    .pipe(header(headerBanner))
		    // .pipe(minify({
		    //     mangle: false
		    // }))
		    .pipe(gulp.dest(dest));
	}
}

var generateScripts_Frontend_App = function(){
	return generateScripts(outputDistJsDir, appScripts);
}

var generateScripts_Frontend_Pages = function(){
	return generateScripts(outputDistJsDir, pagesScripts);
}

var generateScripts_Frontend_Vendor = function(){
	return function(){
		return gulp.src(vendorScripts)
			.pipe(plumber())
		    .pipe(concat('vendor.js'))
		    // .pipe(minify({
		    //     mangle: false
		    // }))
		    .pipe(header(headerBanner))
		    .pipe(gulp.dest(outputDistJsFrontendDir));
	}
}


//task definitons
//frontend
gulp.task('views', generateViews(appViews));
gulp.task('styles', generateStyles(appStyles, 'app.css'));
gulp.task('scripts_frontend_app',    generateScripts_Frontend_App()    );
gulp.task('scripts_frontend_pages',  generateScripts_Frontend_Pages()  );
gulp.task('scripts_frontend_vendor', generateScripts_Frontend_Vendor() );

//build data
gulp.task('pkg', function (cb) {
	exec('npm run pkg', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
})

gulp.task('babelify', function (cb) {
	_.each(
		[
			'public/dist/js/frontend/pages/statPage.js',
			'public/dist/js/frontend/pages/dependenciesPage.js'
		],
		function(curScript){
			var curBaseScriptName = path.basename(curScript);
			console.log('babelify', outputDistJsNativeDir + '/' + curBaseScriptName);

			browserify({ debug: true })
			  .transform(babelify)
			  .require(curScript, { entry: true })
			  .bundle()
			  .on("error", function (err) { console.log("Error: " + err.message); })
			  .pipe(fs.createWriteStream(outputDistJsNativeDir + '/' + curBaseScriptName));
		}
	);
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
gulp.task('scripts', ['scripts_frontend_app', 'scripts_frontend_pages', 'scripts_frontend_vendor']);
gulp.task('default', ['scripts', 'styles', 'views']);



//babelify scripts
// browserify public/dist/js/frontend/pages/statPage.js -t babelify --outfile public/dist/js/statPage.native.js; browserify public/dist/js/frontend/pages/dependenciesPage.js -t babelify --outfile public/dist/js/dependenciesPage.native.js; browserify public/dist/js/frontend/pages/aboutPage.js -t babelify --outfile public/dist/js/aboutPage.native.js;
