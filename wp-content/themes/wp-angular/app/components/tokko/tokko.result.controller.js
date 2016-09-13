(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('tokkoResultController', tokkoResultController);

    /**
    * tokkoResultController: Gestión sobre el listado de propiedades en tokko.
    *  - @view: tokko-search-result
    */
    function tokkoResultController($scope, tokkoFactory, tokkoService, NgMap,
        resourceFactory, $stateParams, $state, $localStorage) {
            var vm = this;
            vm.data = {}
            vm.cache = {}
            //vm.propiedades = {}; para que funcione el spinner
            $scope.current = $state.current;
            vm.state = true;
            vm.error = false;

            // Activamos
            activate(vm);

            /**
            * activate(): Buscador de propiedades, se instancia desde:
            *  - predictive search: tokkoController.searchFilter()
            *    Solo se muestra el listado de propiedades filtradas por el filtro
            *    predictivo ingresado por el usuario.
            *
            *  - advanced search:tokkoController.searchTokko()
            *    Primero busca las propiedades de la cache y sino encuentra, se
            *    utiliza tokkoFactory para leer la API de TOKKO.
            */
            function activate(vm) {
                // Recive paramas views tokko-input.
                vm.data = $stateParams.data;
                vm.cache = $stateParams.cache;

                console.log($state);
                
                // Si el estado actual es propiedad.detalle no realizar la búsqueda
                // Venimos del filtrado Predictivo.
                if ($state.current.name == 'propiedad.detalle'){
                    console.log("Predictive search");
                    vm.propiedades = $stateParams.cache;
                } else {
                    console.log("Advanced search with: ");
                    // Consultamos si tenemos valores en la cache
                    if (!_.isEmpty($localStorage.prop_cache)) {
                        // Tenemos que consultar el valor de $stateParams.data
                        // TO-DO: use prop_result to storage the cache search
                        console.log(vm.data);
                        // Caso Base de busqueda
                        if (!_.isEmpty(vm.data)                    &&
                        // Tipo de Operacion: 0,2: Todos/Ambos
                        ( vm.data.operation_types.length  == 0 || vm.data.operation_types.length  == 2 ) &&
                        // Tipo de Propiedad: 0: Todos
                        ( vm.data.property_types.length   == 0 || vm.data.property_types[0] == "0")  &&
                        // Dormitorios: 0: Todos
                        ( vm.data.suite_amount.length     == 0 || vm.data.suite_amount[0] == "0" ) &&
                        // Zona/Barrio: 0: Todos
                        vm.data.current_localization_id == 0 ) {
                            vm.propiedades = $localStorage.prop_cache;
                        } else if (!_.isEmpty(vm.data)){
                            /**
                            * Objetivo: Filtrado en cascada.
                            *
                            * Se toma como punto de partida $localStorage.prop_cache
                            * para filtrar, pero por cada criterio de busqueda ingresado
                            * se filtrara desde vm.propiedades.
                            */
                            // Caso 1.1: Filtrar por tipo de Operacion ()
                            if (vm.data.operation_types.length == 1) {
                                var type;
                                if (_.values(vm.data.operation_types) == 1) {
                                    type =  "Venta";
                                } else {
                                    type = "Alquiler";
                                }

                                // Filtramos por tipo de Operacion
                                vm.propiedades = _.filter($localStorage.prop_cache, function(prop) {
                                    return _.some(prop.operations, function(oper) {
                                        return oper.operation_type == type;
                                    });
                                });
                            } else if (vm.data.operation_types.length == 2) {
                                // Caso 1.1: Filtrar por tipo de Operacion (Todos)
                                vm.propiedades = $localStorage.prop_cache;
                            }
                            // Uncomment only for Test
                            // console.log(vm.propiedades[0]);

                            // Caso 2: Filtrar por tipo de propiedad
                            if (_.contains(_.values(vm.data.property_types), "0")){
                                // Si el tipo_propiedad es {0: Todos} NO FILTRAR.
                            } else {
                                // Se filtra por los tipos seleccionados
                                vm.propiedades = _.filter(
                                    vm.propiedades, function(prop){
                                        return _.some(_.values(vm.data.property_types), function(ptype) {
                                            return prop.type.id == ptype;
                                        });
                                    }
                                );
                            }
                            // Caso 3: Filtrar por dormitorios: suite_amount
                            if (_.contains(_.values(vm.data.suite_amount), "0")){
                                // Si el suite_amount es {0: Todos} NO FILTRAR.
                            } else {
                                vm.propiedades = _.filter(
                                    vm.propiedades, function(prop){
                                        return _.some(_.values(vm.data.suite_amount), function(pdorm) {
                                            return prop.suite_amount == pdorm;
                                        });
                                    }
                                );
                            }
                            // Caso 4: Filtrar por zonas-barrios
                            // Caso 3: Filtrar por dormitorios: suite_amount
                            if (_.contains(_.values(vm.data.current_localization_id), "0")){
                                // Si el current_localization_id es {0: Todos} NO FILTRAR.
                            } else {
                                vm.propiedades = _.filter(
                                    vm.propiedades, function(prop){
                                        return _.some(_.values(vm.data.current_localization_id), function(plocation) {
                                            return prop.location.id == plocation;
                                        });
                                    }
                                );
                            }
                        }
                    }// else Advanced search with
                }
                /**
                * Flujo de contingencia
                * Objetivo: Sino tenemos nada en la cache vamos a buscar
                */
                if (_.isEmpty(vm.propiedades)) {
                    console.log('Sin valores en cache, buscar en TOKKO');
                    // Call factory to search Tokko properties.
                    tokkoFactory.getProperties(vm.data).then(function(response) {
                        if(response.objects.length > 0) {
                            vm.propiedades = response.objects;
                        } else {
                            console.log(response.objects);
                            vm.error = "No se encontraron propiedades"
                        }
                    });
                }else {
                    //vm.error = "No se encontraron propiedades"
                }

                // prop_search: Todas las propiedades excluidas por search
                $localStorage.prop_search = vm.propiedades;
                console.log($localStorage)
            }

            // Re-direct to fullDetails
            vm.fullDetails = function(prop) {
                //$state.go('detalle', {data: prop , id:prop.id});
            }
        } // Fin controller
    })();
