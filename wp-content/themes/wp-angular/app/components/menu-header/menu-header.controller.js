'use strict';
;(function(){
  angular
  .module('app.core')
  .controller('menuHeaderController', function($scope, $window, $location, $state, menuFactory, _, $anchorScroll, STATE){
    getMenuItems(STATE);
    //#search

    function getMenuItems(pState) {
      menuFactory.getFormatMenu(2).then(function(response){
        $scope.items = response.items;
        formatMenu();
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

    function formatMenu() {
      _.each($scope.items, function(e, i){
        if(e.url === "#contacto") {
          e.contact = true;
        }
        if(e.url === '#search'){
          e.icon = 'fa-search';
          e.title = '';
          e.url = '#searchForm';
          e.search = true;

        }
      });
    }
    $scope.openSearch = function() {
      $location.hash('searchForm');
      $anchorScroll();
      angular.element('#searchForm .tab-pane').removeClass('active');
      angular.element('#searchForm .search-tab').removeClass('active');
      angular.element('#searchForm .advanced-search').addClass('active');
      angular.element('#searchForm #advanced-search').addClass('active');
    };
  });
}());
