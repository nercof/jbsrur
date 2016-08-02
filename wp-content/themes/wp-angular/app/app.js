'use strict';
;(function(){
  var underscore = angular.module('underscore', []);
  underscore.factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
  }])

  angular.module('jbsrurApp', ['ui.router','underscore', 'app.routes', 'app.core', 'app.services']);
  console.log('Load app');
}());
