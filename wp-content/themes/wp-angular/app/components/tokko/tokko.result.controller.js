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

            console.log('vm.propiedades in tokkoResultController');
            console.log(vm.propiedades);

            // Consultamos si tenemos valores en la cache
            if ($localStorage.prop_cache.length > 0) {
                // TO-DO: use prop_result to storage the cache search
                console.log('vm.propiedades desde el $localStorage');
                vm.propiedades = $localStorage.prop_cache;
            }
            console.log(!vm.propiedades);
            // Sino tenemos nada en la cache vamos a buscar
            if (!vm.propiedades){
                // Call factory to search Tokko properties.
                tokkoFactory.getProperties(vm.data).then(function(response) {
                    if(response.objects.length > 0) {
                        vm.propiedades = response.objects;
                    }else {
                        vm.error = "No se encontraron propiedades"
                    }
                });
            }
        }
        // Re-direct to fullDetails
        vm.fullDetails = function(prop) {
            //$state.go('detalle', {data: prop , id:prop.id});
        }
    }
})();
