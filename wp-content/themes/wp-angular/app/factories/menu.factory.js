'use strict';
;(function(){
  angular
  .module('app.factories')
  .factory('menuFactory', dataFactory)
  .constant('MENU_ID', '2')
  .constant('MENU_TAG', 'menus');

  function dataFactory(wordpressService, MENU_ID, MENU_TAG, BASE_WP_MENU_URL){

    var data = {
      'getHeader':  getHeader
    }

    function getHeader() {
      return getMenu().then(function(data){
        addStates(data);
        formatUrls(data);
        return data;
      });
    }

    function getMenu() {
      return wordpressService.getRequest(BASE_WP_MENU_URL, MENU_TAG, MENU_ID);
    }

    function addStates(menu) {
      if (menu.items) {
        menu.items.forEach(function(item){
          if(!item.children){
            item.state = item.url.substr(1);
          }else {
            item.children.forEach(function(child){
              child.state = child.url.substr(1);
            });
          }
        });
      }
    }

    function formatUrls(menu) {
      if (menu.items) {
        menu.items.forEach(function(item){
          if(item.children){
            item.url = "#";
          }
        })
      }
    }
    return data;
  }
}());
