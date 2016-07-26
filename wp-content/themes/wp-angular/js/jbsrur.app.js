/**
* @Objetivo:
*
*
* @param {} routProvider
* @return {Element} app
*/
'use strict';
angular.module('jbsrurApp', ['ui.router'])
// allow DI for use in controllers, unit tests
  .constant('_', window._)
  // use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {
     $rootScope._ = window._;
  })
  .config(['$stateProvider', '$urlRouterProvider'],
      function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            console.log('lalae');
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
    )}
/**
 * @ngdoc overview
 * @name jbsrurApp
 * @description
 *
 *
 * Main module of the application.
 */
.controller('mainController', function($scope, $location, $http){
        console.log('mainController file loaded.');
        $scope.isActive = function(route) {
           return route === $location.url();
        }
        // Variable de la aplicacion
        var api = {};
        $scope.posts = []; //setted as blank
        $scope.media = []; //setted as blank

        api.posts = 'http://jbsrur:8080/wp-json/wp/v2/posts'
        $http.get(api.posts).success(function(response){
		          $scope.posts = response;
                  console.log($scope.posts);
        });

        api.media = 'http://jbsrur:8080/wp-json/wp/v2/media'
        $http.get(api.media).success(function(response){
		          $scope.media = response;
                  console.log($scope.media);
        });
}]);
