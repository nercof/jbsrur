'use strict';
;(function(){
    var underscore = angular.module('underscore', []);
    underscore.factory('_', ['$window', function($window) {
        return $window._; // assumes underscore has already been loaded on the page
    }])

    angular.module('jbsrurApp',
            [   'ui.router',
                'underscore',
                'ui.bootstrap',
                'app.routes',
                'app.core',
                'app.services',
                'app.factories',
                'ngMap',
                // Load this module in order to use $resource.
                'ngResource',
            ])
    // Para poder visualizar el $state en las vistas.
    .run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }]);

    console.log('Loading app modules...: '
            + '\n- ui.router'
            + '\n- underscore'
            + '\n- ngMap'
            + '\n- ngResource'
            + '\n- app.core'
            + '\n- app.routes'
            + '\n- app.services'
            + '\n- app.factories'
            );
}());
