'use strict';
;(function(){
  angular.module('app.factories', ['ngResource'])
  .constant('BASE_WP_MENU_URL', '/wp-json/wp-api-menus/v2/')
  .constant('BASE_WP_URL', '/wp-json/wp/v2/')
  .constant('BASE_TOKKO', 'http://tokkobroker.com/api/v1/')
  .constant('TOKKO_KEY', '8fe7f17376761bada8524d0a75c8937f8a4517b7');
}());
