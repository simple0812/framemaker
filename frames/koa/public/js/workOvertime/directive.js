define([
	'lib/angular'
], function() {
	var moduleDirect = angular.module('moduleDirect', []);

	moduleDirect.directive('datetimepicker',
		function() {
			return {
				priority: 0,
				template: '',
				replace: false,
				transclude: false,
				restrict: 'A',
				scope: false,
				link: function postLink(scope, iElement, iAttrs, ctrl) {
					$(iElement).val(query_list.month).datetimepicker({
						format: "yyyy-mm",
						autoclose: true,
						language: 'zh-CN',
						startView: "year",
						minView: "year",
						minuteStep: 1,
						endDate: new Date()
					});
				}
			};
		});
})