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

            //this.getData = function(onSuccess,onError){
            //          $http.get('books.json').then(
            //                                onSuccess,onError);
            //      }
/*
            var init = function() {
                console.log('Load mainController');
                _.keys($scope);
            }
            init();

            // Variable de la aplicacion
            var api = {};
            $scope.posts = []; //setted as blank
            $scope.media = []; //setted as blank

            api.posts = 'http://jbsrur:8080/wp-json/wp/v2/posts'
                $http.get(api.posts).success(function(response){
                    $scope.posts = response;
                    console.log($scope.posts);
                    var aux = $scope.posts;
                    _.each(aux, function(a, index, aux) {
                        console.log('aux: ' + a);
                    });

                    var niches = _.pluck(Tuts, 'niche');
                    console.log(niches);
                });


        }
    )}
    ());
