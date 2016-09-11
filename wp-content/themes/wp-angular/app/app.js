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
                'ngResource', // Load this module in order to use $resource.
                'ngStorage',  // localStorage and sessionStorage done right for AngularJS
            ])
    // Para poder visualizar el $state en las vistas.
    .run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }])

        // Empleamos $localstorage para buscar las propiedades en caché
        // TODO: add f(x) to retrive values and put into service.
            .config(['$localStorageProvider',
                function($localStorageProvider) {
                    var aux = $localStorageProvider.get('prop_cache');
                    console.log('Prop cache: ');
                    console.log(aux);
                }
            ]);

    console.log('Loading app modules...: '
            + '\n- ui.router'
            + '\n- underscore'
            + '\n- ngMap'
            + '\n- ngResource'
            + '\n- app.core'
            + '\n- app.routes'
            + '\n- app.services'
            + '\n- app.factories'
            + '\n- ngStorage'
            );
}());
