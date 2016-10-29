(function() {
    'use strict';
    /**
    * to_trust: filter to trust html
    */
    angular.module('app.core')
    .filter('to_trust', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
})();
