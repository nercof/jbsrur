/**
* @Objetivo:
*
*
* @param {} routProvider
* @return {Element} app
*/
'use strict';
angular.module('jbsrurApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
            .state('home', {
                url: '/',
                views:{
                    "header":{
                         templateUrl: localized.partials + "main.html",
                         controller: 'mainController'
                    }
                },
            })
            .state('about-us', {
                url: '/about-us',
                views:{
                  "about-us":{
                       templateUrl: localized.partials + "quienes-somos.html"
                  }
                }
            });
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

    ;
