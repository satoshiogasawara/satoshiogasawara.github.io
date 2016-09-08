var gulp = require("gulp");
var plumber = require("gulp-plumber");
var browser = require("browser-sync");
var cp          = require('child_process');
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browser.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browser.reload();
});


/*--------------------- sass [sass] --------------------*/
gulp.task("sass", function() {
  gulp.src("./_sass/main.sass")
    .pipe(plumber())
    .pipe(sass({pretty: true}))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./css/"))
    .pipe(browser.reload({stream:true}));
    });

/*--------------------- browser sync [server] --------------------*/
gulp.task("server", function() {
    browser({
        server: {
            baseDir: ["./_site/"],
        },
    });
});

gulp.task('watch', function () {
    gulp.watch('_sass/*.sass', ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html' ,'_posts/*'], ['jekyll-rebuild']);
});

gulp.task('default', ['server', 'watch']);
