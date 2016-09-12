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

                if ($state.current.name == 'propiedad.detalle') {}
                else {
                    
                    // Venimos del filtrado Predictivo.
                    if (!$stateParams.data && $stateParams.cache) {
                        vm.propiedades = $stateParams.cache;
                    }
                    else {

                        // Consultamos si tenemos valores en la cache
                        if ($localStorage.prop_cache.length > 0) {
                            // Tenemos que consultar el valor de $stateParams.data
                            // TO-DO: use prop_result to storage the cache search
                            if (vm.data                              &&
                                ( vm.data.operation_types.length  == 0 || vm.data.operation_types.length  == 2 ) &&
                                ( vm.data.property_types.length   == 0 || vm.data.property_types[0] == "0")  &&
                                ( vm.data.suite_amount.length     == 0 || vm.data.suite_amount[0] == "0" ) &&
                                vm.data.current_localization_id == 0 ) {
                                    //console.log('Test 1: all properties');
                                    vm.propiedades = $localStorage.prop_cache;
                                }
                                // Filtramos por Tipo de propiedad
                                else if (vm.data && vm.data.operation_types.length == 1) {
                                    //console.log("Test 2: all prop by operation_types");
                                    //vm.propiedades = _.where($localStorage.prop_cache,
                                    //    {operations: vm.data.operation_types[0]});
                                }
                            }
                        }
                        // Sino tenemos nada en la cache vamos a buscar
                        if (vm.propiedades || vm.propiedades.length == 0){
                            // Call factory to search Tokko properties.
                            tokkoFactory.getProperties(vm.data).then(function(response) {
                                if(response.objects.length > 0) {
                                    vm.propiedades = response.objects;
                                }else {
                                    vm.error = "No se encontraron propiedades"
                                }
                            });
                        }else {
                            //vm.error = "No se encontraron propiedades"
                        }
                    }
                }
                // Re-direct to fullDetails
                vm.fullDetails = function(prop) {
                    //$state.go('detalle', {data: prop , id:prop.id});
                }
            }
        })();
