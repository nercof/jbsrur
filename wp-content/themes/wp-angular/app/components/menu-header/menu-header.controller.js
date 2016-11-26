'use strict';
;(function(){
  angular
  .module('app.core')
  .controller('menuHeaderController', function($scope, menuFactory, _, STATE){
    getMenuItems(STATE);

    //#search

    function getMenuItems(pState) {
      menuFactory.getHeader(2).then(function(response){
        $scope.items = response.items;
        setSearchIcon();
        setStateName(pState, $scope.items)
      });
    }

    /**
    * Debe recorrer $scope.item y cambiar el nombre de los estados, para poder
    * emplear dot notation con el detalle de Emprendimientos.
    *
    * @param {} pState - Nombre de estados definidos en app.conf
    */
    function setStateName(pState, pMenu){
      if (pMenu.items) {
        _.each(pMenu.items, function(item){
          if (item.children) {
            _.each(item.children, function(child){
              if(_.isEqual(child.state, "nuestros-emprendimientos")){
                child.state = pState.ne;
              }
              else if (_.isEqual(child.state, "otros-emprendimientos")){
                child.state = pState.oe;
              }
            });
          }

        });

      }
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
