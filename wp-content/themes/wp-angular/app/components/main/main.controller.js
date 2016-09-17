'use strict';
;(function(){
  angular
    .module('app.core')
    .controller('mainController', function($scope, $location, $http, _, $state ){
      $scope.test = function (){
        console.log('lala');
        var obj = {
          a: '1',
          b: [1,2,3]
        }
        $state.go('test', { data: obj });
      }
    });
}());
