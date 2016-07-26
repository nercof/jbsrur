var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}])

/**
* @Objetivo:
*
*
* @param {} routProvider
* @return {Element} app
*/
'use strict';
var app = angular.module('jbsrurApp', ['ui.router','underscore']);
// allow DI for use in controllers, unit tests
//app.constant('_', window._)
// use in views, ng-repeat="x in _.range(3)"
//app.run(function ($rootScope) {
//   $rootScope._ = window._;
//});
app
  .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
console.log('Load module');
            $stateProvider
            .state('home', {
                url: '/',
                views:{
                    "main":{
                         templateUrl: localized.partials + "main.html",
                         controller: 'mainController'
                    }
                },
                //console.log('Load module');
            })
            .state('quienes-somos', {
                url: '/quienes-somos',
                views:{
                  "main":{
                       templateUrl: localized.partials + "quienes-somos.html"
                  }
                }
            })
            .state('ventas', {
                url: '/ventas',
                views:{
                  "main":{
                       templateUrl: localized.partials + "catalogo.html"
                  }
                }
            })
            .state('alquileres', {
                url: '/alquileres',
                views:{
                  "main":{
                       templateUrl: localized.partials + "catalogo.html"
                  }
                }
            })
            .state('nuestros-emprendimientos', {
                url: '/nuestros-emprendimientos',
                views:{
                  "main":{
                       templateUrl: localized.partials + "emprendimientos.html"
                  }
                }
            })
            .state('otros-emprendimientos', {
                url: '/otros-emprendimientos',
                views:{
                  "main":{
                       templateUrl: localized.partials + "emprendimientos.html"
                  }
                }
            })
            .state('novedades', {
                url: '/novedades',
                views:{
                  "main":{
                       templateUrl: localized.partials + "novedades.html"
                  }
                }
            })
            .state('contacto', {
                url: '/contacto',
                views:{
                  "main":{
                       templateUrl: localized.partials + "contacto.html"
                  }
                }
            })
            ;
          }
    ])
    /**
     *
     *	On runtime define the page titles for injecting into the page <title> tag
     *
     */
    .controller('mainController', function($scope, $location, $http, _){
        init = function() {
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

                  var Tuts = [{name : 'NetTuts', niche : 'Web Development'}, {name : 'WPTuts', niche : 'WordPress'}, {name : 'PSDTuts', niche : 'PhotoShop'}, {name : 'AeTuts', niche : 'After Effects'}];
                  var niches = _.pluck(Tuts, 'niche');
                  console.log(niches);
        });

        api.media = 'http://jbsrur:8080/wp-json/wp/v2/media'
        $http.get(api.media).success(function(response){
		          $scope.media = response;
                  console.log($scope.media);
        });


        console.log(_.isEmpty({}));
        //console.log(_.flatten([[0, 1], [2, 3], [4, 5]]));

        var artists = ['Pharrel Williams', 'Led Zeppelin', 'Rolling Stones'];

        _.each(artists, function(artist, index, artists) {
          console.log('artist: ' + artist);
        });

        var tests = $scope.posts;
        console.log(tests); //Tenemos vacio el valor.
        _.each(tests, function(test, index, tests) {
          console.log('test: ' + test);
        });
    })

    .controller('menuHeaderController', function($scope, $http){
        console.log('menu');
        $http.get('/wp-json/wp-api-menus/v2/menus/2')
        .success(function(response){
          $scope.items = response.items;
          $scope.addStates();
          $scope.formatUrls();
        })
        $scope.addStates = function() {
          $scope.items.forEach(function(item){
            if(!item.children){
               item.state = item.url.substr(1);
            }else {
              item.children.forEach(function(child){
                child.state = child.url.substr(1);
              });
            }
          });
        }
        $scope.formatUrls = function() {
          $scope.items.forEach(function(item){
            if(item.children){
               item.url = "#";
            }
          })
        }
    })
    ;
