'use strict';
(function() {
    var underscore = angular.module('underscore', []);
    underscore.factory('_', ['$window', function($window) {
        return $window._; // assumes underscore has already been loaded on the page
    }])

    angular.module('jbsrurApp', ['ui.router',
        'underscore',
        'ui.bootstrap',
        'app.config',
        'app.routes',
        'app.core',
        'app.services',
        'app.factories',
        'ngStorage',
        'ngTextTruncate',
        'ncy-angular-breadcrumb'
    ])

    // Para poder visualizar el $state en las vistas.
    .run(['$rootScope', '$state', '$stateParams', '$localStorage',
        function($rootScope, $state, $stateParams, $localStorage) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$storage = $localStorage;
        }
    ])

    // Empleamos $localstorage para buscar las propiedades en caché
    // TODO: add f(x) to retrive values and put into service.
    .config(['$localStorageProvider',
        function($localStorageProvider) {
            var aux = $localStorageProvider.get('prop_cache');
        }
    ])

    // Overwrite <html> of Lightbox
    .config(function(LightboxProvider) {
        // set a custom template
        LightboxProvider.templateUrl = localized.views + 'lightbox-custom.html';
    });

}());
