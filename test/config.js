// Test configuration for edp-test
// Generated on Wed Jul 08 2015 15:13:45 GMT+0800 (CST)
var webpack = require('../webpack.config');

module.exports = function(config) {

    function isCoverage(argument) {
        return argument === '--coverage';
    }

    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    var reporters = ['spec'];

    if (process.argv.some(isCoverage)) {
        reporters.push('coverage');
    }

    var reporters = ['spec'];

    var testConfig = {

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        reporters: reporters,

        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            // 'test/**/*Spec.js',
            'test/spec.helper.js',
            'test/test.bundle.js'
        ],

        preprocessors: {
            'test/test.bundle.js': ['webpack']
        },
        webpack: webpack.getTestWebConfig(),

        webpackServer: {
            noInfo: true, //please don't spam the console when running in karma!
            stats: {
                colors: true
            }
        },

        // list of files to exclude
        exclude: [

        ],

        // optionally, configure the reporter
        coverageReporter: {
            // text-summary | text | html | json | teamcity | cobertura | lcov
            // lcovonly | none | teamcity
            type: 'text|html',
            dir: 'test/coverage/'
        },

        // web server port
        port: 8120,


        // enable / disable watching file and executing tests whenever any file changes
        watch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - Firefox
        // - Opera
        // - Safari
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'Chrome'
            // 'Firefox',
            // 'Safari',
            // 'PhantomJS'
        ],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,


        // Custom HTML templates
        // context | debug | runner
        templates: {
            // context: 'context.html'
        }
    };
    if (process.argv.some(isCoverage)) {
        testConfig.coverageReporter = {
            dir: 'coverage/',
            reporters: [{
                type: 'lcovonly',
                subdir: '.',
                file: 'lcov.info'
            }, {
                type: 'html',
                subdir: 'html'
            }]
        };
    }

    config.set(testConfig);
};
