FoorumApp.controller('TopicsListController', function ($scope, $location, Api) {
    $scope.newTopic = {};

    Api.getTopics().success(function (topics) {
        $scope.topics = topics;
    });

    $scope.addTopic = function () {
        if ($scope.newTopic.name != undefined) {
            Api.addTopic($scope.newTopic).success(function (topic) {
                $scope.newTopic = {};
                $location.path('/topics/' + topic.id);
            });
        }
        ;
    };


});
