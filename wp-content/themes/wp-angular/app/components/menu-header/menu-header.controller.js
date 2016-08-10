'use strict';
;(function(){
  angular
    .module('app.core')
    .controller('menuHeaderController', function($scope, menuFactory){
          $scope.items = [];
          menuFactory.getHeader().then(function(response){
            $scope.items = response.items;
          });
        $scope.items = menuFactory.getHeader.items;
      });
}());
