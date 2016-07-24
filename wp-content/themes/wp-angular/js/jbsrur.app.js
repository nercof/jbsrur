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
                         templateUrl: localized.partials + "main.html"
                    }
                }
            })
            .state('about-us', {
                url: '/about-us',
                views:{
                  "header":{
                       templateUrl: localized.partials + "quienes-somos.html"
                  }
                }
            });
          }
    ]);
