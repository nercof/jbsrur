(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('tokkoResultController', tokkoResultController);

    function tokkoResultController( $scope, tokkoFactory, tokkoService, NgMap,
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
                var filtered_prop = {};

                console.log('vm.data in tokkoResultController');
                console.log($localStorage.prop_cache);

                if ($localStorage.prop_cache) {
                    // TO-DO: use prop_result to storage the cache search
                    // TODOS
                    if (vm.data                                      &&
                        vm.data.operation_types.length          == 2 && // Venta-Alquiler
                        vm.data.current_localization_id.length  == 0 && // Todos los barrios
                        vm.data.property_types[0]               == 0 && // Todos los tpo propiedad
                        vm.data.suite_amount[0]                 == 0)   // Todos los dormitorioss
                        {
                            vm.propiedades = $localStorage.prop_cache;
                        }
                    }
                    // Sino tenemos nada en la cache vamos a buscar
                    if (!vm.propiedades){
                        // Call factory to search Tokko properties.
                        tokkoFactory.getProperties(vm.data).then(function(response) {
                            vm.propiedades = response.objects;
                        });
                    }
                }
                // Re-direct to fullDetails
                vm.fullDetails = function(prop){
                    console.log('Re-direct to fullDetails');
                    //$state.go('detalle', {data: prop , id:prop.id});
                }
            }
        })();
