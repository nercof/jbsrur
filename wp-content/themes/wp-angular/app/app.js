'use strict';
;(function(){
    var underscore = angular.module('underscore', []);
    underscore.factory('_', ['$window', function($window) {
        return $window._; // assumes underscore has already been loaded on the page
    }])

    angular.module('jbsrurApp',
            [   'ui.router',
                'underscore',
                'app.routes',
                'app.core',
                'app.services',
                'app.factories',
                'ngMap',
                // Load this module in order to use $resource.
                'ngResource',
            ]);

    console.log('Loading modules...: '
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
