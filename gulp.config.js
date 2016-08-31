module.exports = function() {
    var app = 'app/',
        temp = './.tmp/',
        dist = 'prod/';

    var config = {
        /**
         * Files paths
         */
        alljs: [
            app + '**/*.js',
            './*.js'
        ],
        injectInput: [
            './app/_html/base/head.php', 
            './app/_html/base/scripts.php'
        ],
        injectOutput: app + '_html/base',
        allsass: [
            app + 'styles/**/*.sass',
            app + 'styles/**/*.scss'
        ],
        allhtml: app + '_html/**/*.php',
        css: app + 'css',
        sass: app + 'styles/styles.sass',
        js: [
            app + 'scripts/**/*.js',
            '!' + app + 'scripts/plugins/*.js',
        ],
        html: app + '_html/',
        fonts: app + 'fonts/**/*.*',
        images: [
            app + 'images/**/*.*',
            dist + 'images/**/*.*'
        ],
        dist: dist,
        client: app,
        temp: temp,

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components',
            exclude: ['bower_components/modernizr/modernizr.js'],
            ignorePath: '../'
        }
    };

    /**
     * Compass config
    */
    config.getCompassOptions = function() {
        var options = {
            config_file: './config.rb',
            css: './app/css',
            sass: './app/styles',
            time: true,
            comments: true,
            style: 'expanded'
        };
        return options;
    };

    /**
     * Wiredep config
     */
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            exclude: config.bower.exclude,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    /**
     * PHP server config
     */
    config.getPHPServerOptions = function() {
        var options = {
            // bin: 'D:/wamp/bin/php/php5.5.12/php.exe',
            // ini: 'D:/wamp/bin/php/php5.5.12/php.ini',
            base: './',
            port: 8010, 
            keepalive: true
        }
        return options;
    };

    /**
     * BrowserSync config
     */
    config.getBrowserSyncOptions = function() {
        var options = {
                notify: false,
                proxy: '127.0.0.1:8010/app/',
                port: 80,
                open: true
            };
        return options;
    };

    return config;
};
