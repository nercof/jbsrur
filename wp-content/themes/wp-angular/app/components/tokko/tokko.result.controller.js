(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('tokkoResultController', tokkoResultController);

    function tokkoResultController( $scope, tokkoFactory, tokkoService, NgMap,
                                    resourceFactory, $stateParams, $state) {
    var tokkoResult = this;
    tokkoResult.data = {}
    tokkoResult.cache = {}

    tokkoResult.propiedades = {};

    // Activamos
    activate(tokkoResult);

    function activate(tokkoResult) {
        // Recive paramas views tokko-input.
        tokkoResult.data = $stateParams.data;
        tokkoResult.cache = $stateParams.cache;
        //console.log('tokkoResult.cache');
        //console.log(tokkoResult.cache);
        // Call factory to search Tokko properties.
        tokkoFactory.getProperties(tokkoResult.data).then(function(response) {
            tokkoResult.propiedades = response.objects;
        });
    }
    // Re-direct to fullDetails
    tokkoResult.fullDetails = function(prop){
        console.log(prop);

        $state.go('tokko-details', {data: prop});
    }
}
})();
