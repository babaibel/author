var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({lazy: true}),
    config = require('./gulp.config')(),
    ghelp = $.showhelp.show,
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    args = require('yargs').argv,
    del = require('del'),
    fs = require('fs'),
    cleanCSS = require('gulp-clean-css'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    jsFiles = 0;
	
$.cleanCSS = cleanCSS;   

gulp.task('help', function() {
    log('Hello. This is a list of main tasks.');
    ghelp();
});

gulp.task('default', ['help']);

gulp.task('optimize', ['inject'], function () {
    var assets = $.useref.assets({searchPath: ['app', 'app/scripts', 'app/css']}); // ({searchPath: ['.tmp', 'app', '.']});

    log('Optimize the javascript, css, html');
    
    return gulp.src(config.allhtml)
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cleanCSS()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest(config.dist + '_html'));
});

gulp.task('styles', ['clean-styles'], function() {
    log('Compiling Sass --> CSS');

    var compassOptions = config.getCompassOptions();

    return gulp
        .src(config.sass)
        .pipe($.plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe($.compass(compassOptions))
        .pipe($.autoprefixer({
            browsers: ['last 2 version', '> 5%']
        }))
        .pipe(gulp.dest(config.css))
        .pipe(browserSync.stream());
});

gulp.task('clean-styles', function(done) {
    var files = './app/css/**/*.css';
    clean(files, done);
});

gulp.task('wiredep', function() {
    log('Wire up the bower css + js and our app js into the html');

    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.injectInput)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js, {read: false}), {
            ignorePath: '../',
            addRootSlash: false,
            relative: true
        }))
        .pipe(gulp.dest(config.injectOutput));
});

gulp.task('inject', ['styles', 'wiredep'], function() {
    log('Wire up the app css into our html and call wiredep');

    return gulp
        .src(config.injectInput)
        .pipe($.inject(gulp.src('./app/css/styles.css', {read: false}), {
            ignorePath: '../',
            addRootSlash: false,
            relative: true
        }))
        .pipe(gulp.dest(config.injectOutput));
});

// gulp.task('start', ['inject'], function() {
//     log('Concat HTML files after all injections');

//     return gulp
//         .src(config.templates)
//         .pipe($.plumber())
//         .pipe($.rigger())
//         .pipe(gulp.dest(config.html));
// });

// gulp.task('templates', function() {
//     log('Concat HTML files');

//     return gulp
//         .src(config.templates)
//         .pipe($.plumber())
//         .pipe($.rigger())
//         .pipe(gulp.dest(config.html));
// });

gulp.task('images', function() {
    log('Copying and compressing the images');

    return gulp
        .src(config.images)
        .pipe($.imagemin({
            progressive: true,
            interlaced: true,
            // don't remove IDs from SVGs, they are often used
            // as hooks for embedding and styling
            svgoPlugins: [{cleanupIDs: false}]
        }))
        .pipe(
            gulp.dest(config.dist + 'images')
        );
});

gulp.task('fonts', function() {
    log('Copying fonts');

    return gulp
        .src(config.fonts)
        .pipe(
            gulp.dest(config.dist + 'fonts')
        );
});

gulp.task('iconfont', function(){
    log('Creating svg-font');

    var fontName = 'iconic';

    return gulp.src([config.client+'fonts/svg/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            // При использовании файла формата SASS у шрифта возникали некоторые проблемы отображения
            path: config.client+'styles/components/svg-fonts/iconfont-template.scss',
            targetPath: '../styles/components/svg-fonts/_iconfont.scss',
            fontPath: '../fonts/',
            cssClass: 'iconic'
        }))
        .pipe(iconfont({
            fontName: fontName,
            formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
            startUnicode: true,
            appendUnicode: true,
            normalize: true,
            fontHeight: 1001,
            centerHorizontally: true
        })).pipe(
            gulp.dest(config.client+'fonts/')
        );
});

gulp.task('extras', ['index-list', 'data'], function() {
    log('Copying extras');

    return gulp.src([
        'app/_html/*.*',
        '!app/_html/*.php',
        
    ], {
        dot: true
    }).pipe(
        gulp.dest(config.dist + '_html')
    );
});

gulp.task('index-list', function() {
    log('Copying project pages list (index.html)');

    return gulp
        .src('app/index.html')
        .pipe(
            gulp.dest(config.dist)
        );
});

gulp.task('data', function() {
    log('Copying json test filest');

    return gulp
        .src('app/_data/*.json')
        .pipe(
            gulp.dest(config.dist + '_data')
        );
});

// gulp.task('clean-dist', function(done) {
//     clean(config.dist + '**/*', done);
// });

// gulp.task('js:counter', function() {
//     fs.readdir('./app/scripts/', function(err, files) {
//         if(err) throw err;

//         if(jsFiles !== files.length) {
//             jsFiles = files.length;
//         }
//         console.log(jsFiles);
//     });
// });

gulp.task('php', function() {
    log('Start php server');

    var options = config.getPHPServerOptions();

    $.connectPhp.server(options);
});

gulp.task('serve', ['php', 'inject', 'styles', 'fonts'], function() {
    log('Start Browser Sync to develop and watching for changes in ' + $.util.colors.yellow(config.client) + ' folder');

    var options = config.getBrowserSyncOptions();

    browserSync.init(options);

    gulp.watch([
        config.allhtml,
        config.js,
        'app/images/**/*'
    ]).on('change', reload);

    gulp.watch(config.allsass, ['styles']);
    gulp.watch(config.fonts, ['fonts']);
}).help = 'to develop your webapp and watching for changes';

gulp.task('serve:build', ['php'], function() {
    log('Start Browser Sync with production build in ' + $.util.colors.yellow('./') + ' folder');

    browserSync.init({
        notify: false,
        proxy: '127.0.0.1:8010/',
        port: 80,
        open: true
    });
}).help = 'to preview the production build';

gulp.task('build', ['optimize', 'images', 'fonts', 'extras'], function() {
    log('Gzipp all files in ' + $.util.colors.yellow('./') + ' folder');

    return gulp.src([
        config.dist + '_html/**/*',
        config.dist + 'fonts/**/*',
        config.dist + 'images/**/*',
        config.dist + 'scripts/**/*',
        config.dist + 'styles/**/*',
        ]).pipe($.size({title: 'build', gzip: true}));
}).help = 'to build your webapp for production';

// gulp.task('dist', ['clean-dist'], function() {
//     gulp.start('build');
// });

/////////////////////

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
