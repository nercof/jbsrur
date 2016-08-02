'use strict';
;(function(){
  angular
    .module('app.core')
    .controller('menuHeaderController', function($scope, menuService){
          $scope.items = [];
          menuService.getHeader().then(function(response){
            console.log('menuHeaderController', response.items);
            $scope.items = response.items;
          });

          //$scope = menuService.get('2');
      });
}());
