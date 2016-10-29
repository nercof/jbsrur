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
        resourceFactory, $stateParams, $state, $localStorage, STATE) {
            var vm = this;
            vm.data = {}
            vm.cache_propiedades_propiedades = {}
            //vm.propiedades = {}; para que funcione el spinner
            vm.spinner = true;
            $scope.current = $state.current;
            vm.state = true;
            vm.error = false;
            vm.tabsContacto = [
                { "titulo": "Telefono" , "href":"tel:+543514608800", "text":"(0351) 4608800", "type":"tel", "icon":"typcn typcn-phone-outline" },
                { "titulo": "Correo" , "href":"mailto:centro@jbsrur.com.ar", "text":"centro@jbsrur.com.ar", "type":"email", "icon":"typcn typcn-mail" },
                { "titulo": "Ver Más" , "href":"#", "type":"link", "icon":"typcn typcn-plus", "isLink": true }
            ];

            //
            // Empleadas para la paginacion de propiedades.
            vm.totalItems = false;
            vm.currentPage = 1;
            vm.itemsPerPage = 16;
            vm.properties = {};

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
                vm.cache_propiedades = $stateParams.cache;

                // Si el estado actual es propiedad.detalle no realizar la búsqueda
                if (_.isEqual($state.current.name,STATE.PD) ||
                _.isEqual($state.current.name,STATE.VE) ||
                _.isEqual($state.current.name,STATE.AL)){
                    vm.propiedades = $localStorage.prop_search;
                }
                /**
                * Busqueda avanzada.
                *
                */
                else {
                    console.log("Searching properties: << tokkoResultController() >>");
                    // Consultamos si tenemos valores en la cache
                    if (!_.isEmpty(vm.cache_propiedades)) {
                        // Caso 0: Base de busqueda
                        if (!_.isEmpty(vm.data)                    &&
                        // Tipo de Operacion: 0,2: Todos/Ambos
                        ( vm.data.operation_types.length  == 0 || vm.data.operation_types.length  == 2 ) &&
                        // Tipo de Propiedad: 0: Todos
                        ( vm.data.property_types.length   == 0 || vm.data.property_types[0] == "0")  &&
                        // Dormitorios: 0: Todos
                        ( vm.data.suite_amount.length     == 0 || vm.data.suite_amount[0] == "0" ) &&
                        // Zona/Barrio: 0: Todos
                        vm.data.current_localization_id == 0 ) {
                            vm.propiedades = vm.cache_propiedades;
                            vm.spinner = false;
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
                                vm.propiedades = _.filter(vm.cache_propiedades, function(prop) {
                                    return _.some(prop.operations, function(oper) {
                                        return oper.operation_type == type;
                                    });
                                });
                            } else if (vm.data.operation_types.length == 2) {
                                // Caso 1.1: Filtrar por tipo de Operacion (Todos)
                                vm.propiedades = vm.cache_propiedades;
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
                // Consultamos si es necesario almacenar el resultado de la
                // busqueda en el storage.
                if (_.isEmpty($localStorage.prop_search)) {
                    $scope.$storage = $localStorage.$default({
                        prop_search: vm.propiedades,
                    });
                }

                /**
                * Flujo de contingencia
                * Objetivo: Sino tenemos nada en la cache vamos a buscar
                */
                if (_.isEmpty(vm.propiedades)) {
                    // Call factory to search Tokko properties.
                    tokkoFactory.getProperties(vm.data).then(function(response) {
                        if(response.objects.length > 0) {
                            vm.propiedades = response.objects;
                            vm.spinner = false;
                        } else {
                            vm.error = "No se encontraron propiedades"
                        }
                    });
                }
                else{
                    // Variables auxiliares para el paginador.
                    vm.totalItems = vm.propiedades.length;
                    vm.spinner = false;

                    // Iniciamos las propiedades filtradas para la paginacion inicial.
                    vm.properties = vm.propiedades.slice(0 * vm.itemsPerPage, 1 * vm.itemsPerPage);
                }
            }

            /**
            * Setea lista propiedades x pagina
            * El listado de propiedades depende del parametro page pasado.
            *
            * @param {int} page - Pagina actual
            */
            vm.setPagingData = function (page) {
                vm.properties =  vm.propiedades.slice((page - 1) * vm.itemsPerPage, page * vm.itemsPerPage);
            }

            /**
            * Funcion guia para cambiar la pagina seleccionada.
            *
            */
            vm.pageChanged = function(){
                vm.setPagingData(vm.currentPage);
            }
        } // Fin controller
    })();
