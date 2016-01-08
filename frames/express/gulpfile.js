/**
 * 初始化
 * npm install gulp-util gulp-imagemin gulp-sass gulp-minify-css gulp-uglify gulp-rename gulp-concat gulp-clean gulp-clean tiny-lr --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'); //基础库
var imagemin = require('gulp-imagemin'); //图片压缩
var sass = require('gulp-sass'); //sass
var minifycss = require('gulp-minify-css'); //css压缩
var jshint = require('gulp-jshint'); //js检查
var uglify = require('gulp-uglify'); //js压缩
var rename = require('gulp-rename'); //重命名
var concat = require('gulp-concat'); //合并文件
var clean = require('gulp-clean'); //清空文件夹
var nodemon = require('gulp-nodemon'); //监控文件修改，重启node服务
var livereload = require('gulp-livereload'); // 浏览器同步
var rimraf = require('rimraf'); //删除文件夹里面的文件
var rjs = require('gulp-requirejs');


// HTML处理
gulp.task('html', function() {
    var htmlSrc = 'src/*.html';
    var htmlDst = 'public/';

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst))
        .pipe(livereload());
});

// 其他文件处理
gulp.task('file', function() {
    var fileSrc = 'src/fonts/**/*';
    var fileDst = 'public/fonts/';

    gulp.src(fileSrc)
        .pipe(gulp.dest(fileDst))
        .pipe(livereload());
});

// 样式处理
gulp.task('css', function() {
    var cssSrc = 'src/css/**/*';
    var cssDst = 'public/css';

    gulp.src(cssSrc)
        // .pipe(sass({
        //     style: 'expanded'
        // }))
        // .pipe(gulp.dest(cssDst))
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst))
        .pipe(livereload());
});

// 图片处理
gulp.task('images', function() {
    var imgSrc = 'src/images/**/*';
    var imgDst = 'public/images';

    gulp.src(imgSrc)
        // .pipe(imagemin())
        .pipe(gulp.dest(imgDst))
        .pipe(livereload());
})

// js处理
gulp.task('js', function() {

    var rjsSrc = ['src/js/lib/require.js', 'src/js/lib/jquery.js', 'src/js/lib/bootstrap.js'];
    var rjsDst = 'public/js/lib';
    var mainSrc = ['src/js/main.js'];
    var mainDst = 'public/js';
    
    gulp.src(rjsSrc)
        .pipe(uglify({
            compress: true
        }))
        .pipe(gulp.dest(rjsDst))
        .pipe(livereload());

    gulp.src(mainSrc)
        .pipe(uglify({
            compress: true
        }))
        .pipe(gulp.dest(mainDst))
        .pipe(livereload());

    ['user', 'article'].forEach(adapter)
});


function ug(dir) {
    var appSrc = 'src/js/' + dir + '/*.js';
    var appDst = 'public/js/' + dir;

    gulp.src(appSrc)
        .pipe(uglify({compress:true}))
        .pipe(gulp.dest(appDst))
        .pipe(livereload());
}

// var rjsConf = require('./rjsConf');

function adapter(moduleName) {
     rjs({
            name: moduleName + '/app',
            baseUrl: 'src/js', //相对于appDir
            out: 'app.js',
            // optimize: "uglify",
            excludeShallow: ['bootstrap', 'jquery'], //将公共的库排除
            paths: {
                'angular': 'lib/angular',
                'bootstrap': 'lib/bootstrap',
                'underscore': 'lib/underscore',
                'common': 'lib/common',
                'moment': 'lib/moment',
                'validator': 'lib/validator',
                'pager': 'lib/pager',
                'jquery' : 'lib/jquery',
                'hashChange': 'lib/hashChange',
                'md5': 'md5',
                'commonDirect': 'common/directive',
                'commonFilter': 'common/filter',
                'service': moduleName + '/service',
                'controller': moduleName + '/controller'
            },
            shim: {
                'angular': {
                    exports: 'angular'
                },
                'underscore': {
                    exports: '_'
                },
                'common': {
                    exports: 'common',
                    deps: ['jquery', 'bootstrap']
                },
                'hashChange': {
                    exports: 'hashChange',
                    deps: ['jquery']
                },
                'pager': {
                    exports: 'pager',
                    deps: ['hashChange']
                },
                'moment': {
                    exports: 'moment'
                },
                'validator': {
                    exports: 'validator',
                    deps: ['jquery', 'common']
                },
                'bootstrap': ['jquery'],
                'commonDirect': {
                    exports: 'commonDirect',
                    deps: [
                        'angular',
                        'common'
                    ]
                },
                'commonFilter': {
                    exports: 'commonFilter',
                    deps: [
                        'angular',
                        'moment'
                    ]
                }
            }
        })
        // .pipe(uglify({
        //     compress: true
        // }))
        .pipe(gulp.dest('public/js/' + moduleName))
        .pipe(livereload());
}

gulp.task('rjs', function() {
    ['user', 'article'].forEach(adapter)
});

// 清空图片、样式、js
gulp.task('clean', function(cb) {
    rimraf('./public', cb)
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function() {
    gulp.start('html', 'css', 'images', 'js', 'file');
});

//监控文件修改，重启node服务
gulp.task('serve', function(cb) {

    livereload.listen();

    nodemon({
        script: 'app.js',
        ext: 'html js',
        watch: ['controllers/*', 'models/*', 'proxy/*', 'views/*', 'utils/*']
    }).on('start', function() {
        setTimeout(function() {
            livereload.reload();
        }, 1000);
    })
});

// 监听任务 运行语句 gulp watch
gulp.task('watch', function() {
    gulp.run('serve');

    // 监听静态文件
    gulp.watch('src/*.html', function(event) {
        gulp.run('html');
    })

    // 监听css
    gulp.watch('src/css/**', function() {
        gulp.run('css');
    });

    // 监听images
    gulp.watch('src/images/**/*', function() {
        gulp.run('images');
    });

    // 监听js
    gulp.watch(['src/js/**/*'], function() {
        gulp.run('js');
    });
});