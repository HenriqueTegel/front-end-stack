var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var runSequence = require('run-sequence');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var htmlreplace = require('gulp-html-replace');
var browserSync = require('browser-sync').create();

var paths = {
  sass: 'app/src/css/sass/**/*',
  scripts: 'app/src/js/lib/**/*',
  images: 'app/src/img/**/*',
  fonts: 'app/src/font/**/*'
};

//////////// BUILD TASKS ////////////

// Clean dist path
gulp.task('clean', function() {
  return del('dist');
});

// Copy html pages
gulp.task('copy-html', function() {
  return gulp.src([
    'app/**/',
    '!app/src/**/',
    '!app/src/index.html'
    ])
    .pipe(gulp.dest('dist/'));
});

// Copy index.html
gulp.task('copy-index', function() {
  return gulp.src('app/index.html')
  .pipe(htmlreplace({
      'css': 'src/css/main.min.css',
      'js': 'src/js/main.min.js'
  }))
  .pipe(gulp.dest('dist/'));
});

// Copy compiled styles
gulp.task('copy-styles', ['sass'], function() {
  return gulp.src('app/src/css/main.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/src/css'));
});

// Copy compiled scripts
gulp.task('copy-scripts', ['scripts'], function() {
  return gulp.src('app/src/js/main.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/src/js'));
});

// Copy all static images
gulp.task('copy-images', function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/src/img'));
});

// Copy all static fonts
gulp.task('copy-fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('dist/src/font'));
});

// The build task to generate dist path
gulp.task('build', function(){
  runSequence('clean', 'copy-html', 'copy-index', 'copy-styles', 'copy-scripts', 'copy-images', 'copy-fonts');
});

//////////// DEV TASKS ////////////

// Clean local compile files
gulp.task('clean-local', function() {
  return del(['app/src/css/main.css', 'app/src/js/main.js']);
});

// Build sass and generate main.css
gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('app/src/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Build scripts and generate main.js
gulp.task('scripts', function() {
  var b = browserify({
    entries: 'app/src/js/lib/main.js'
  });
  
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest('app/src/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Rerun the task when a file changes
gulp.task('watch', ['browserSync'], function() {
  gulp.watch(paths.sass, ['clean-local', 'sass', 'scripts']);
  gulp.watch(paths.scripts, ['clean-local', 'sass', 'scripts']);
  gulp.watch('app/*.html', browserSync.reload);
});

// Start browsersync server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "app/"
    },
  })
})

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean-local', 'sass', 'scripts', 'watch']);