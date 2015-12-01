require.config({
	baseUrl: '/js',
	paths: {
		'validator':'lib/validator',
		'bootstrap' : 'lib/bootstrap',
		'module' : 'workOvertime'
	}
});

require(['validator', 'bootstrap', 'module/service',  'module/usersCtrl',  'module/controller', 'module/filter',
	'module/editCtrl', 'module/directive'], function() {
	validator.bind();
	angular.module('myApp', ['moduleListCtrl', 'moduleDetailCtrl', 'moduleSvc', 'moduleFilter', 'moduleDirect']);
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['myApp']);
	});
});
