'use strict';
;(function(){
  angular
    .module('app.core')
    .controller('mainController', function($scope, $location, $http, _){
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
  ;
}());
