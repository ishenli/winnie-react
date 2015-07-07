var cwd = process.cwd();
var fs = require('fs');
var path = require('path');
var pkg = require(path.join(cwd, 'package.json'));
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var staticPath = 'asset/css/';


function getModName() {
    var exampleDir = path.join(cwd, 'demo'); // 得到demo文件夹路径
    var mods = fs.readdirSync(exampleDir).filter(function(item) {
        return item.indexOf('.') === -1; // 只拿到文件夹的名字
    });
    return mods;
}
function getEntry() {
    var exampleDir = path.join(cwd, 'demo'); // 得到demo文件夹路径
    var mods = getModName();
    var entry = {};

    mods.forEach(function(mod) {
        var modPath = path.join(exampleDir, mod);
        var files = fs.readdirSync(modPath);
        files.forEach(function(f){
            var extname = path.extname(f);
            var name = path.basename(f, extname);
            if (extname === '.js' || extname === '.jsx') {
                var htmlFile = path.join(modPath, name + '.html');
                // if (fs.existsSync(htmlFile)) {
                    entry[mod + '/' + name] = './demo/' + mod + '/' + f;
                // }
            }
        });
    });

    console.log('entry:', entry);
    return entry;

}

function getResolve() {
    var alias = {};
    var resolve = {
        root: cwd,
        extensions: ['', '.js', '.jsx'],
        alias: alias
    };
    var name = pkg.name;
    alias[name] = cwd;
    return resolve;
}

function getWebConfig() {
    return {
        resolveLoader: {
            root: path.join(__dirname, 'src')
        },

        entry: getEntry(),

        output: {
            path: path.join(cwd, 'build'),
            filename: '[name].js'
        },

        module: {
            loaders: [{
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel'
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            }]
        },

        resolve: getResolve(),

        externals: {
            react: "React"
        },

        plugins: [
            // ./robot is automatically detected as common module and extracted
            new webpack.optimize.CommonsChunkPlugin("common.js"),
            new ExtractTextPlugin(staticPath + '[name].css')
        ]
    };
}

module.exports = {
    getWebConfig: getWebConfig,
    getEntry: getEntry,
    getModName: getModName,
    staticPath: staticPath
};
