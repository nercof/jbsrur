'use strict';
;(function(){
  angular.module('app.factories', [])
  .constant('BASE_WP_MENU_URL', '/wp-json/wp-api-menus/v2/')
  .constant('BASE_WP_URL', '/wp-json/wp/v2/');
}());
