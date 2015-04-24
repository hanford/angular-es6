var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var $ = require('gulp-load-plugins')();

var config = {
  entryFile: './app/js/app.js',
  outputDir: './dist/js/',
  outputFile: 'app.js',
};

var paths = {
  index: './app/index.html',
  scss: './app/scss/**.scss'
}

// clean the output directory
gulp.task('clean', function(cb){
    rimraf(config.outputDir, cb);
});

var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify(config.entryFile, _.extend({ debug: true }, watchify.args)));
  }
  return bundler;
};

function bundle() {
  return getBundler()
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(config.outputFile))
    .pipe(gulp.dest(config.outputDir))
    .pipe(reload({ stream: true }));
}

gulp.task('build-persistent', function() {
  return bundle();
});

gulp.task('build', ['build-persistent'], function() {
  process.exit(0);
});

gulp.task('index', function() {
  return gulp.src('./app/index.html')
    .pipe(gulp.dest('./dist/'))
})

gulp.task('scss', function() {
  return gulp.src(paths.scss)
    .pipe($.sass())
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('watch', ['build-persistent', 'index', 'scss'], function() {

  browserSync({
    server: {
      baseDir: './dist/'
    }
  });

  getBundler().on('update', function() {
    gulp.start('build-persistent')
  });

  gulp.watch(paths.index, ['index'])
  gulp.watch(paths.scss, ['scss'])
});
