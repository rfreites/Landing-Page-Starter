var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var source = require('vinyl-source-stream');




function compile(watch){
	var bundle = watchify(browserify('./assets/js/index.js'));

	function rebundle(){
		bundle
			.transform(babel)
			.bundle()
			.on('error', function(err){
				console.log(err);
				this.emit('end')
			})
			.pipe(source('./assets/js/index.js'))
			.pipe(rename('bundle.js'))
			.pipe(gulp.dest('assets/js'))
		gulp
		  	.src([
				'assets/js/tether.js',
				'node_modules/jquery/dist/jquery.min.js',
				'node_modules/bootstrap/dist/js/bootstrap.min.js',
				'assets/js/bundle.js'
				])
			.pipe(concat('app.js'))
		  	.pipe(gulp.dest('public/js/'))

			}

	if (watch) {
		bundle.on('update', function(){
			console.log('--> Bundling..');
			rebundle();
		})
	}

	rebundle();
}
gulp.task('imagemin', () =>
  gulp.src('assets/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('public/img'))
  );

gulp.task('sass', function () {
  gulp.src('./assets/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(rename('app.min.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('assets/sass/*.scss', ['sass']);
});

gulp.task('build', function(){
	return compile();
});

gulp.task('js:watch', function(){
	return compile(true);
});

gulp.task('default', ['sass:watch','js:watch']);




