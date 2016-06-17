angular.module('wp', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: localized.partials + 'main.html',
        controller: 'Main'
    })
})
.controller('Main', function($scope, $http, $routeParams) {
    $http.get('wp-json/wp/v2/posts').success(function(res){
        $scope.posts = res;
    });
});