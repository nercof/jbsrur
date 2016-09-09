(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('tokkoResultController', tokkoResultController);

    function tokkoResultController($scope, tokkoFactory, tokkoService, NgMap,
        resourceFactory, $stateParams, $state, $localStorage) {
        var vm = this;
        vm.data = {}
        vm.cache = {}
        vm.propiedades = {};
        $scope.current = $state.current
        vm.state = true

        // Activamos
        activate(vm);

        function activate(vm) {
            // Recive paramas views tokko-input.
            vm.data = $stateParams.data;
            vm.cache = $stateParams.cache;
            vm.data = $stateParams.data;

            //if ($localStorage.prop_cache) {
                // TO-DO: use prop_result to storage the cache search
            //    vm.propiedades = $localStorage.prop_cache;
            //    console.log('vm.data in tokkoResultController');
            //    console.log(vm.data);
            //}

            // Sino tenemos nada en la cache vamos a buscar
            //if (!vm.propiedades){
                // Call factory to search Tokko properties.
                tokkoFactory.getProperties(vm.data).then(function(response) {
                    vm.propiedades = response.objects;
                });
            //}
        }
        // Re-direct to fullDetails
        vm.fullDetails = function(prop) {
            //$state.go('detalle', {data: prop , id:prop.id});
        }
    }
})();
