define([
    'lib/angular'
], function () {
    var moduleDetailCtrl =  angular.module('moduleDetailCtrl', []);
    moduleDetailCtrl.controller('editCtrl',['$scope', '$http', '$window', 'svc', editCtrl]);

    function editCtrl($scope, $http, $window, svc) {
        initScope();

        function initScope() {
            $scope.model = {
                id : "",
                uid : common.getQueryString('uid') || '',
                userName : $("#userField").html(),
                remark : "",
                status : 1,
                createdAt : new Date().getTime()
            };
        }

        $scope.save = function() {
            if(!validator.validateAll('#createUserModal')) return;
            var saveType = $('#btnSave').data('save-type');
            if(saveType == 'edit') update();
            else if(saveType == 'create') create();
        };

        function create() {
            $scope.model.createdAt = new Date($("#datetimepicker").val()).getTime();
            svc.create($scope.model).done(function(p) {
                var scope = $('#user').scope();
                scope.models.push(p);
                console.log(p);

                $('#createUserModal').modal('hide');
                $('#btnSave').data('save-type', '');
                var t = {
                    "EventID": p.id,
                    "StartDateTime": new Date(p.createdAt * 1000),
                    "Title": p.remark,
                    "URL": "#",
                    "Description": p.remark,
                    "CssClass": "overtime"
                };

                if($.jMonthCalendar){
                    console.log(t);
                    $.jMonthCalendar.AddEvents(t);
                }

            }).fail(function(err) {
               common.popBy($('#btnSave'), err);
            });

        }

        function update() {
            svc.update($scope.model).done(function() {
                var scope = $('#user').scope();
                var model = _.find(scope.models, function(item) {return item.id == $scope.model.id;});

                for(var each in $scope.model)
                    model[each] = $scope.model[each]

                $('#createUserModal').modal('hide');
                $('#btnSave').data('save-type', '');
            }).fail(function() {
                $('#createUserModal').modal('hide');
                $('#btnSave').data('save-type', '');
            });
        }

        $('#createUserModal').on('hidden.bs.modal', function (e) {
            $('#datetimepicker').val(moment().format("YYYY-MM-DD HH:mm"));

            initScope();
        })
    }
});