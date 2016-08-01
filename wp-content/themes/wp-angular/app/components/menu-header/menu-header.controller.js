'use strict';
;(function(){
  angular
    .module('app.core')
    .controller('menuHeaderController', function($scope, $http){
          console.log('menuHeaderController');
          $http.get('/wp-json/wp-api-menus/v2/menus/2')
          .success(function(response){
            $scope.items = response.items;
            $scope.addStates();
            $scope.formatUrls();
          })
          $scope.addStates = function() {
            $scope.items.forEach(function(item){
              if(!item.children){
                 item.state = item.url.substr(1);
              }else {
                item.children.forEach(function(child){
                  child.state = child.url.substr(1);
                });
              }
            });
          }
          $scope.formatUrls = function() {
            $scope.items.forEach(function(item){
              if(item.children){
                 item.url = "#";
              }
            })
          }
      });
}());
