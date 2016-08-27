'use strict';
(function(){
angular
  .module('app.factories')
  .factory('resourceFactory', ['$resource',
    function($resource) {
      console.log('Load barrios x zona');
      //url = 'wp-content/themes/wp-angular/app/factories/resource/barrios_cba.json';
      return $resource('wp-content/themes/wp-angular/app/factories/resource/:id', {}, {
        query
        : {
          method: 'GET',
          params: {id: '@id'},
          isArray: false,
        }
      });
    }
  ]);
}());
