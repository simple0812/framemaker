gulp 项目建立规范
====

1、安装Chrome LiveReload //https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
2、通过npm安装http-server ，快速建立http服务 //npm install http-server -g
3、通过cd找到发布环境目录dist
4、运行http-server，默认端口是8080
5、访问路径localhost:8080
6、再打开一个cmd，通过cd找到项目路径执行gulp，清空发布环境并初始化
7、执行监控 gulp watch
8、点击chrome上的LiveReload插件，空心变成实心即关联上，你可以修改css、js、html即时会显示到页面中。


browser-sync与gulp-livereload的区别
1.前者自带web服务器,后者需要配合其他web服务(如http-server express等).
2.前者不需要安装插件，后期需要安装浏览器插件或者桌面插件
3.browser-sync 需要页面有body元素
4.总结后者更灵活，可以配合express等开发程序。前者更方便，如果只是单纯的静态页面(不需要后台渲染)开发可以优先使用