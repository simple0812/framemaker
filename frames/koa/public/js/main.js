define([], function() {
    require.config({
        baseUrl:'/js',
        paths: {
            bootstrap: 'lib/bootstrap',
            angular:'lib/angular',
            underscore: 'lib/underscore',
            extension:'lib/extension',
            common: 'lib/common',
            moment:'/lib/moment',
            validator: 'lib/validator',
            backbone:'lib/backbone',
            pager:'lib/pager',
            extension :'lib/extension',
            'jquery.ui.widget' :'lib/jquery.ui.widget',
            'jquery.fileupload' :'lib/jquery.fileupload',
            md5:'md5'
        },
        shim:{
            'common': ['jquery', 'bootstrap'],
            'moment' : {exports : 'moment'},
            'validator' : {exports : 'validator',  deps:['jquery', 'common']},
            'bootstrap':['jquery'],
            'extension':{exports:'extension', deps:['jquery']},
            'pager': {exports: 'pager'},
            'jquery.fileupload':['jquery', 'jquery.ui.widget']
        }
    });
});

