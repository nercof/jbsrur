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
                url: 'http://jbsrur:8080/',
                templateUrl: './partials/partial-home.html',
                        });
          }
        .state('about', {

        });
    ]);
