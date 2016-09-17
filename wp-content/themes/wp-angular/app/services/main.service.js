/**
 * Logger Factory
 * @namespace Factories
 */
'use strict';
;(function(){
    angular.module('app.services', [])
    .constant('BASE_URL', '/wp-json/wp-api-menus/v2/')
    .service('menuService', mainService);

    $inject = ['$scope', '$location', '$http', '_'];

   /**
   * @namespace Logger
   * @desc Application wide logger
   * @memberOf Factories
   */

    function mainService(){


    /* TO DO: Ver $log */
    /* TO DO: Ver $log */
    console.log('mainService');

    var data = {
      'getHeader': getHeader
    }
}})();