'use strict';
;(function(){
  angular
    .module('app.core')
    .controller('menuHeaderController', function($scope, menuFactory, _, STATE){
        getMenuItems(STATE);

        //#search

        function getMenuItems(STATE) {
          menuFactory.getHeader(STATE).then(function(response){
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
