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
        vm.propiedadesPredictive = [];

        // Read and Write
        $scope.$storage = $localStorage;

        // Variables auxiliares
        vm.spinner = true;
        vm.state = true;
        vm.error = false;

        vm.tabsContacto = [{
            "titulo": "Telefono",
            "href": "tel:+543514608800",
            "text": "(0351) 4608800",
            "type": "tel",
            "icon": "typcn typcn-phone-outline"
        }, {
            "titulo": "Correo",
            "href": "mailto:centro@jbsrur.com.ar",
            "text": "centro@jbsrur.com.ar",
            "type": "email",
            "icon": "typcn typcn-mail"
        }, {
            "titulo": "Ver Más",
            "href": "#",
            "type": "link",
            "icon": "typcn typcn-plus",
            "isLink": true
        }];

        //
        // Empleadas para la paginacion de propiedades.
        vm.totalItems = false;
        vm.currentPage = 1;
        vm.itemsPerPage = 16;

        // Activamos el controlador
        activate(vm);

        // Eliminar el resultado de la busqueda.
        // @FIXME: ¿dónde?
        //destroyStorage();

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
            // Parámetros de entrada
            vm.data = $stateParams.data;
            vm.cache_propiedades = $stateParams.cache;
            vm.propiedadesPredictive = $stateParams.predictive;

            // Si el estado actual es propiedad.detalle no realizar la búsqueda.
            if (_.isEqual($state.current.name, STATE.PD) ||
                _.isEqual($state.current.name, STATE.VE) ||
                _.isEqual($state.current.name, STATE.AL) ) {
                vm.propiedades = $scope.$storage.prop_search;
            }
            else if (_.isEqual($state.current.name, STATE.PO) &&
                    !_.isEmpty(vm.propiedadesPredictive)) {
                vm.propiedades = vm.propiedadesPredictive;
            }
            // Si el estado actual es propiedad y tengo datos <F5>
            else if (_.isEqual($state.current.name, STATE.PO) &&
                     !_.isEmpty($scope.$storage.prop_search)) {
                vm.propiedades = $scope.$storage.prop_search;
            }
            else {
                // Filtrar propiedades de acuerdo al <input> usuario.
                vm.propiedades = filtrarPropiedades(vm.cache_propiedades);

                // Flujo de contingencia
                // Objetivo: Sino tenemos nada en la cache vamos a buscar

                if (_.isEmpty(vm.propiedades)) {
                    buscarPropiedadesTokkoAPIWithData(vm.data);
                }
            }

            // Consultamos si es necesario almacenar el resultado de la
            // busqueda en el storage.
            isEmptyLocalStoragePropSearchSaveit();

            // @FIXME:
            //console.log($stateParams, $stateParams.cache, vm.propiedades);

            // Estado del filtrado.
            if (_.isEmpty(vm.propiedades)) {
                vm.error = "No se encontraron propiedades.";
            }
            else {
                // Variables auxiliares para el paginador.
                vm.totalItems = vm.propiedades.length;
                vm.spinner = false;

                // Iniciamos las propiedades filtradas para la paginacion inicial.
                vm.properties = vm.propiedades.slice(0 * vm.itemsPerPage, 1 * vm.itemsPerPage);
            }

            // Only for test
            //console.log(vm.properties);
        }

        /**
         *
         * @param {int} page - <description>
         */
        function destroyStorage() {
            // In controller
            $scope.$on('$destroy', function iVeBeenDismissed() {
                delete $scope.$storage.prop_search;
                delete $localStorage.prop_search;
            });
        }

        /**
         * Consultamos la API de Tokko para obtener propiedades con los filtros
         * que el usuario selecciona y son pasados en pData.
         *
         * @param {Object} pData - Parametros input AdvancedSearchTokko.
         */
        function buscarPropiedadesTokkoAPIWithData(pData) {

            // Call factory to search Tokko properties.
            tokkoFactory.getProperties(pData).then(function(response) {
                if (response.objects.length > 0) {
                    vm.propiedades = response.objects;
                }
            });
        }

        /**
         * description
         *
         */
        function isEmptyLocalStoragePropSearchSaveit() {
            /*
            $scope.$storage.prop_search =
                $scope.$storage = $localStorage.$default({
                    prop_search: vm.propiedades,
                });
            */
            //$localStorage.prop_search = (_.isEmpty($localStorage.prop_search)) ? vm.propiedades : $localStorage.prop_search;
            $scope.$storage.prop_search = vm.propiedades;
        }

        /**
         * Objetivo: Filtrado en cascada.
         *
         * Se toma como punto de partida $localStorage.prop_cache
         * para filtrar, pero por cada criterio de busqueda ingresado
         * se filtrara desde vm.propiedades.
         */
        function filtrarPropiedades(pListaPropiedades) {
            //console.log("Searching properties: << filtrarPropiedades() >>");
            var resultFiltrado = [];

            if (!_.isEmpty(pListaPropiedades) && !_.isEmpty(vm.data)) {

                // Caso 1.1: Filtrar por tipo de Operacion ()
                resultFiltrado = filterOperationTypes(pListaPropiedades, vm.data.operation_types);

                // Caso 2: Filtrar por tipo de propiedad
                resultFiltrado = filterPropertyTypes(resultFiltrado, vm.data.property_types);

                // Caso 3: Filtrar por dormitorios: suite_amount
                resultFiltrado = filterSuiteAmount(resultFiltrado, vm.data.suite_amount);

                // Caso 4: Filtrar por zonas-barrios
                resultFiltrado = filterCurrentLocationId(resultFiltrado, vm.data.current_localization_id);

                vm.spinner = false;

                return resultFiltrado;
            } // else Advanced search with
        } // fin filtrarPropiedades()


        /**
         * Filtrar propiedades por id de Location.
         *
         * Si pCurrentLocalizationId [0] indica <Todos> por lo cual no filtramos.
         *
         * @param {Object} pListaPropiedades: Propiedades a filtrar
         * @param {Object} pCurrentLocalizationId: Barrios seleccionados x user.
         */
        function filterCurrentLocationId(pListaPropiedades, pCurrentLocalizationId) {
            // Zona/Barrio: 0: Todos
            if (_.isEmpty(pCurrentLocalizationId) ||
                _.contains(_.values(pCurrentLocalizationId), "0")) {
                // Si el current_localization_id es {0: Todos} NO FILTRAR.
                return pListaPropiedades;
            }
            else {
                var filtrado = [];
                filtrado = _.filter(pListaPropiedades, function(prop) {
                    return _.some(_.values(pCurrentLocalizationId), function(plocation) {
                        return prop.location.id == plocation;
                    });
                });
                return filtrado;
            }
        }

        /**
         * Filtrar propiedades por cantidad de dormitorios.
         *
         * Si pSuiteAmount [0] indica <Todos> por lo cual no filtramos.
         *
         * @param {Object} pListaPropiedades: Propiedades a filtrar
         * @param {Object} pSuiteAmount: Dormitorios seleccionados x user.
         */
        function filterSuiteAmount(pListaPropiedades, pSuiteAmount) {

            // Si el suite_amount es {0: Todos} NO FILTRAR.
            if (_.isEmpty(pSuiteAmount) ||
                _.contains(_.values(pSuiteAmount), "0")) {
                return pListaPropiedades;
            }
            else {
                var filtrado = [];
                filtrado = _.filter(pListaPropiedades, function(prop) {
                    return _.some(_.values(pSuiteAmount), function(pdorm) {
                        return prop.suite_amount == pdorm;
                    });
                });
                return filtrado;
            }
        }

        /**
         * Filtrar propiedades por tipo de propiedad.
         * {Todos | Terreno | Departamento | Casa | Oficina  | Local | Campo}
         *
         * Si pPropertyTypes [0] indica <Todas> por lo cual no filtramos.
         *
         * @param {Object} pListaPropiedades: Propiedades a filtrar
         * @param {Object} pPropertyTypes: Tipos de propiedad seleccionadas x user.
         */
        function filterPropertyTypes(pListaPropiedades, pPropertyTypes) {
            // Si el tipo_propiedad es {0: Todos} NO FILTRAR.
            if (_.isEmpty(pPropertyTypes) ||
                _.contains(_.values(pPropertyTypes), "0")) {
                return pListaPropiedades;
            }
            else {
                var filtrado = [];
                // Se filtra por los tipos seleccionados
                filtrado = _.filter(pListaPropiedades, function(prop) {
                    return _.some(_.values(pPropertyTypes), function(ptype) {
                        return prop.type.id == ptype;
                    });
                });

                return filtrado;
            }

        }

        /**
         * Filtrar propiedades por tipo de operacion {Venta|Alquiler}.
         *
         * Si pOperationTypes [0] indica <Todas> por lo cual no filtramos.
         *
         * @param {Object} pListaPropiedades: Propiedades a filtrar
         * @param {Object} pOperationTypes: Tipos de operacion seleccionadas x user.
         */
        function filterOperationTypes(pListaPropiedades, pOperationTypes) {

            // Caso 1.1: Filtrar por tipo de Operacion ()
            if (_.isEmpty(pOperationTypes) || pOperationTypes.length == 2) {
                // Tipo de Operacion: 0,2: Todos/Ambos
                // Caso 1.1: Filtrar por tipo de Operacion (Todos)
                return pListaPropiedades;
            }
            else if (pOperationTypes.length == 1) {
                var type;
                var filtrado = [];

                // Parseamos el tipo de operacion
                if (_.values(pOperationTypes) == 1) {
                    type = "Venta";
                }
                else {
                    type = "Alquiler";
                }

                // Filtramos por tipo de Operacion
                filtrado = _.filter(pListaPropiedades, function(prop) {
                    return _.some(prop.operations, function(oper) {
                        return oper.operation_type == type;
                    });
                });

                return filtrado;
            }
        }

        /**
         * Setea lista propiedades x pagina
         * El listado de propiedades depende del parametro page pasado.
         *
         * @param {int} page - Pagina actual
         */
        vm.setPagingData = function(page) {
            vm.properties = vm.propiedades.slice((page - 1) * vm.itemsPerPage, page * vm.itemsPerPage);
        }

        /**
         * Funcion guia para cambiar la pagina seleccionada.
         *
         */
        vm.pageChanged = function() {
            vm.setPagingData(vm.currentPage);
        }
    } // Fin controller
})();
