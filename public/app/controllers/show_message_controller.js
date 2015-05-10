FoorumApp.controller('ShowMessageController', function($scope, $routeParams, Api){
  // Toteuta kontrolleri tähän
  
  //$scope.newReply = {};
    
  Api.getMessage($routeParams.id).success(function(message){
     $scope.message = message; 
  });
  
  $scope.addReply = function () {
        if ($scope.reply.content != undefined) {
            Api.addReply($scope.reply, $routeParams.id).success(function (reply) {
                //$scope.newReply = {};
                $scope.message.Replies[$scope.message.Replies.length] = reply;
            });
        };
    };
});
