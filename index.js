var ejs = require('ejs')
var path = require('path')
var merge = require('merge')
var utils = require('loader-utils')
var htmlmin = require('html-minifier')

module.exports = function(source,data){
    var self = this;
    this.cacheable && this.cacheable();
    var opts = merge({}, utils.parseQuery(this.query));
    opts.client = true;
    // 运行时跳过编译调试
    // webpack --optimize-minimize
    if (this.minimize && opts.compileDebug === undefined) {
        opts.compileDebug = false;
    }

    // 使用文件的工作的目录相对与项目的根目录
    opts.filename = path.relative(process.cwd(), this.resourcePath);

    // 如果设置了 htmlmin 就进行压缩
    // 简单的设置参数
    // 设置参数 https://github.com/kangax/html-minifier#options-quick-reference
    if (opts.htmlmin) {
        var opthtml = {}
        if(opts.htmlmin){
            var opthtml_arr = opts.htmlmin.split("|")
            for(var i =0;i<opthtml_arr.length;i++){
                opthtml[opthtml_arr[i]]=true
            }
        }
        source = htmlmin.minify(source, opthtml|| {});
    }

    opts['rmWhitespace'] = true;
    var template = ejs.compile(source, opts);
    return 'module.exports = ' + template;
}