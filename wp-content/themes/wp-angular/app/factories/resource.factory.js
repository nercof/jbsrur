'use strict';
(function(){
angular
  .module('app.factories')
  .factory('resourceFactory', ['$resource',
    function($resource) {
      return $resource('wp-content/themes/wp-angular/app/factories/resource/:id', {}, {
        query
        : {
          method: 'GET',
          params: {id: '@id'},
          isArray: false
        },
        query_universo
        : {
          method: 'GET',
          params: {id: '@id'},
          isArray: true
        }
      });
    }
  ]);
}());
