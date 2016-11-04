'use strict';
;(function(){
  angular
    .module('app.core')
    .controller('navSectionController', function($scope, menuFactory, _, resourceFactory){
        getMenuItems();

        function getMenuItems() {
          menuFactory.getHeader(14).then(function(response){
            $scope.items = response.items;
            $scope.icons = getIcons();
            setIcons();
            console.log($scope.items);
          });
        }

        function setIcons() {
            _.each($scope.items, function (item) {
              _.each($scope.icons, function (icon) {
                if(icon.id === item.url.replace('/','')) {
                  item.icon = icon.icon;
                }
              });
            });
        }

        function getIcons() {
            return [
              {
                "id": "ventas",
                "icon": "af-home"
              },
              {
                "id": "alquileres",
                "icon": "af-house"
              },
              {
                "id": "nuestros-emprendimientos",
                "icon": "af-crane"
              },
              {
                "id": "otros-emprendimientos",
                "icon": "af-building-1"
              },
              {
                "id": "administracion",
                "icon": "af-document"
              }
            ];
        }
      });
}());
