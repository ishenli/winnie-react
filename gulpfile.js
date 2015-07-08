var gulp = require('gulp');
var config = require('./webpack.config');
var webpack = require('webpack');
var shelljs = require('shelljs');
var path = require('path');
var babel = require('gulp-babel');
var fs = require('fs');
var karma = require('karma').server;
var cwd = process.cwd();

// clean all files
gulp.task('clean', function () {
    shelljs.rm('-rf', path.join(cwd, 'build'));
});


gulp.task('compile', ['clean'] , function(done) {
    return gulp.src(['src/**/.js', 'src/**/*.jsx'])
        .pipe(babel())
        .pipe(gulp.dest('asset'));
});

function printResult(stats) {
    stats = stats.toJson();
    (stats.errors || []).forEach(function (err) {
        console.error('error', err);
    });

    stats.assets.forEach(function (item) {
        var size = (item.size / 1024.0).toFixed(2) + 'kB';
        console.log('generated', item.name, size);
    });
}

gulp.task('webpack', function (done) {
  webpack(config.getWebConfig(), function (err, stats) {
    if (err) {
        console.error('error', err);
    }
    printResult(stats);
    done(err);
  });
});

gulp.task('build', ['webpack'], function () {

    var tpl = fs.readFileSync(path.join(__dirname, './demo/jsx2html.tpl'), {
        encoding: 'UTF-8'
    });

    var highlight = require('highlight.js');
    var entries = config.getEntry();

    /**
     entry: {
        'pager/simple': './demo/pager/simple.js',
        'tab/simple': './demo/tab/simple.js'
     }
     */
    for (var key in entries) {
        var file = entries[key];
        var mod = key.split('/')[0];
        var source = path.join(cwd, file);
        console.log('source', source);

        var sourceContent = fs.readFileSync(source, {
            encoding: 'UTF-8'
        });

        var code = highlight.highlightAuto(sourceContent).value;
        var appHtml = path.join(cwd, file.replace(/\.jsx?$/, '.html'));

        //  计算各种打包之后的文件
        var commonJs = path.join(cwd, 'build', 'common.js');
        var appJs = path.join(cwd, 'build', key + '.js');
        var appCss = path.join(cwd, 'build', config.staticPath, key + '.css');

        var commonPath = path.relative(path.dirname(appHtml), commonJs);
        var appPath = path.relative(path.dirname(appHtml), appJs);
        var cssPath = path.relative(path.dirname(appHtml), appCss);

        var html = format(tpl, {
            modName: mod,
            common: commonPath,
            app: appPath,
            code: code,
            css: cssPath
        });

        console.log('appHtml:', appHtml);
        fs.writeFileSync(appHtml, html, {
            encoding: 'UTF-8'
        });
    }
});

gulp.task('watch', function () {
    gulp.watch(['./demo/**/*.js', './demo/**/*.less'],['webpack']);
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/test/config.js',
    }, done);
});

function format(html, data) {
    return html.replace(/\$\{([^\{\}]*)\}/g, function (_, name) {
        var value = data[name.trim()];
        return value == null ? '' : value + '';
    });
}
