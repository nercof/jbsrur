/**
* @Objetivo:
*
*
* @param {} routProvider
* @return {Element} app
*/
'use strict';
var app = angular.module('jbsrurApp', ['ui.router']);
app
  .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
            .state('home', {
                url: '/',
                views:{
                    "main":{
                         templateUrl: localized.partials + "main.html",
                         controller: 'mainController'
                    }
                },
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

    .controller('mainController', function($scope, $location){
        $scope.isActive = function(route) {
           return route === $location.url();
        }
        $scope.post = [{ name: 'Alice' }, { name: 'Bob' }];
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
