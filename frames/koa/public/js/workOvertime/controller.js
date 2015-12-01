define([
    'lib/angular',
    'lib/extension',
    'lib/underscore',
    'lib/pager'
], function () {
    if(location.href.indexOf('/workOvertime/v') == -1) return;
    var moduleListCtrl =  angular.module('moduleListCtrl', []);
    moduleListCtrl.controller('modelsCtrl',['$scope', '$window', 'svc', modelsCtrl]);

    function modelsCtrl($scope, $window, svc) {


        query_list.uid = common.getQueryString('uid');

        showList();

        $scope.models = [];



        $scope.$on('$destroy', function() {
            console.log($scope.models.length + '..')
        });

        $scope.remove = function(scope, obj) {
            if(confirm('确认删除项目吗？')) {
                svc.delete([scope.model.id])
                    .done(function() {
                        showList();
                    }).fail(function(msg) {
                        common.popBy(obj, msg);
                    });
            }
        };

        $scope.navToEdit = function(scope, obj) {
            var uid = scope.model.attributes.uid;
            var url = (typeof uid == 'array') ? "/user/v/" + uid[0] : '/user/v/' + uid;
            location.href = url;
        };

        $scope.removeModels = function(scope, obj) {
            if($('.chkItem:checked').length == 0) return common.popBy(obj, '请选择要删除的项目');
            var ids = [];
            $('.chkItem:checked').each(function(i, o) {
                ids.push($(o).val());
            });

            if(confirm('确认删除选中的项目吗？')) {
                svc.delete(ids).done(function() {
                    showList();

                }).fail(function(msg) {
                    common.popBy(obj, msg);
                });
            }
        };

        $scope.showEditModal = function(scope, obj) {
            var editScope = $('#createUserModal').scope();

            $('#btnSave').data('save-type', 'edit');
            for(var each in scope.model)
                editScope.model[each] = scope.model[each]
            $('#logoImg').attr('src', scope.model.logo).show();
            $('#createUserModal').modal('show');
        };

        $scope.showCreateModal = function() {
            $('#btnSave').data('save-type', 'create');
            $('#createUserModal').modal('show');
        };

        $scope.search = function(obj) {
            query_list.month = $('#searchInput').val();
            showList();
        };

        function initCalendar(data, month) {
            month = month? new Date(month) : new Date();
            var options = {
                height: 550,
                width: 980,
                navHeight: 30,
                labelHeight: 25,
                calendarStartDate: month,
                firstDayOfWeek: 1,
                onMonthChanging: function(dateIn) {
                    query_list.month = moment(dateIn).format("YYYY-MM");
                    showList();
                    return true;
                },
                onEventLinkClick: function(event) {
                    return true;
                },
                onEventBlockClick: function(event) {
                    return true;
                },
                onEventBlockOver: function(event) {
                    return true;
                },
                onEventBlockOut: function(event) {
                    return true;
                },
                onDayLinkClick: function(date) {
                    return false;
                },
                onDayCellClick: function(date) {
                    return true;
                },
                navLinks: {
                    enableToday: true,
                    enableNextYear: true,
                    enablePrevYear: true,
                    p:'&lsaquo;&lsaquo; 上一月',
                    n:'下一月 &rsaquo;&rsaquo;',
                    t:'本月'
                },
                locale: {
                    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    weekMin: 'wk'
                }
            };

            $.jMonthCalendar.Initialize(options, data);

        }

        function dataAdapter(workOvertimes) {
            return _.map(workOvertimes, function(item) {
                return { "EventID": item.id,
                    "Date": new Date(item.createdAt * 1000),
                    "Title": item.remark,
                    "URL": "#",
                    "Description": item.remark,
                    "CssClass": "overtime"
                };
            })
        }

        function showList() {
            $("#jMonthCalendar").hide();
            svc.retrieve()
              .done(function(json) {
                  initCalendar(dataAdapter(json.result), query_list.month);
                  $("#jMonthCalendar").show();
              }).fail(function() {
                  console.log('数据获取失败');
              })
        }
    }
});
