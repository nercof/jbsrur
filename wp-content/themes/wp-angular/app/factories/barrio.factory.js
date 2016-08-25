'use strict';

angular.
.module('app.factories')
.factory('Barrio', ['$resource',
        function($resource) {
            return $resource('node_modules/barrios_cba.json', {}, {
                query: {
                    method: 'GET',
                    isArray: true
                }
            });
        }
]);
