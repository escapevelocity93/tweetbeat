var app = angular.module('myApp', []);
app.controller('tweetController', function($scope, $http) {

  $scope.formData = {};
    $scope.check = function () {
      console.log($scope.formData.searchText.$modelValue); //works
    }

  $scope.getTweets = function() {

        console.log($scope.formData.lat);

        $http.post('/search', $scope.formData).
        success(function(data) {
            console.log("posted successfully");
            console.log(data);
            $scope.tweets = data;
        }).error(function(data) {
            console.error("error in posting");
        })
    }

    $scope.stream = function() {


          $http.post('/stream', $scope.formData).
          success(function(data) {
              console.log("posted successfully");
              console.log(data);
              $scope.tweets = data;
          }).error(function(data) {
              console.error("error in posting");
          })
      }

});
