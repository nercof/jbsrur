'use strict';
;(function(){
  angular
  .module('app.core')
  .controller('navSectionController', function($scope, menuFactory, _, resourceFactory, STATE){
    getMenuItems(STATE);

    function getMenuItems(pState) {
      console.log("<< navSectionController >>");
      menuFactory.getHeader(14).then(function(response){
        $scope.items = response.items;
        $scope.icons = getIcons();
        setIcons();
        setStateName(pState);
      });
    }

    /**
    * Debe recorrer $scope.item y cambiar el nombre de los estados, para poder
    * emplear dot notation con el detalle de Emprendimientos.
    *
    * @param {} pState - Nombre de estados definidos en app.conf
    */
    function setStateName(pState){
      if ($scope.items) {
        _.each($scope.items, function(item){
          if(_.isEqual(item.state, "nuestros-emprendimientos")){
            item.state = pState.NE;
          }
          else if (_.isEqual(item.state, "otros-emprendimientos")){
            item.state = pState.OE;
          }
        });
      }
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
