'use strict';
;(function(){
  angular
    .module('app.core')
    .controller('menuHeaderController', function($scope, menuFactory, _){
        getMenuItems();

        //#search

        function getMenuItems() {
          menuFactory.getHeader().then(function(response){
            $scope.items = response.items;
            setSearchIcon();
          });
        }

        function setSearchIcon() {
            _.each($scope.items, function(e, i){
              if(e.url === '#search'){
                e.icon = 'fa-search';
                e.title = '';
              }
            });
        }
      });
}());
