if(typeof main !=='undefined' && main.init) {
	console.log('---')
	main.init('user')
}

require(['jquery', 'validator', 'bootstrap', 'service', 'controller', 'commonFilter', 'commonDirect'], function() {
    validator.bind();
    angular.module('myApp', ['moduleCtrl', 'moduleSvc', 'commonFilter', 'commonDirect']);
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['myApp']);
    });
});