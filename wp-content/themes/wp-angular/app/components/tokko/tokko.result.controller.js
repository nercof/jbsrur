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
        resourceFactory, $stateParams, $state, $localStorage, STATE, TYPE,
        parsePropertyFactory, barriosFactory, $location, paginationService) {

        var vm = this;

        $scope.$storage = $localStorage;

        // Filtros auxiliares parte UI
        vm.tiposProp = []; // Tipo de propiedad
        vm.suite_amount = [];
        vm.zonas = [];
        vm.attEspeciales = [];
        vm.attEspecialesHabilitados = [];

        // Models
        vm.spTypes = []; // Tipo de propiedad seleccionada
        vm.sDormit = []; // Cantidad de dormitorios
        vm.sZonas = []; // Zonas
        vm.sAttEsp = []; // Atributos especiales
        vm.propSinAttEspeciales = [];

        vm.error = false;

        // Empleadas para la paginacion de propiedades.
        vm.totalItems = false;
        vm.currentPage = 1;
        vm.itemsPerPage = 16;

        // Activamos el controlador
        activate(vm, TYPE);

        /**
         * activate(): buscador de propiedades
         *  - predictive search: tokkoController.searchFilter()
         *    solo se muestra el listado de propiedades filtradas por el filtro
         *    predictivo ingresado por el usuario.
         *
         *  - advanced search:tokkoController.searchTokko()
         *    Muestra las propieades filtradas por el form
         *
         *  - refresh: muestra las ultimas propiedades filtradas, si el objeto está vacío
         *    muestra todas.
         */
        function activate(vm, opType) {
            // Parámetros de entrada
            vm.allProps = $stateParams.allProps;
            vm.lastSearch = $stateParams.lastSearch;
            vm.isSearch = $stateParams.isSearch;
            vm.type = $stateParams.type;

            //  get barrios de Córdoba y zonas
            if (_.isEmpty(vm.barriosXzona)) {
                vm.barriosXzona = barriosFactory.getBarriosCatalogados().$promise.then(
                    function(response) {
                        // body...
                        vm.barriosXzona = response;
                        vm.barrios = vm.barriosXzona.to.barrios;

                        // Guardamos en la caché
                        $localStorage.barriosXzona = response;
                    });

            }
            else {
                vm.barrios = vm.barriosXzona.to.barrios;
            }

            if (!_.isEmpty(vm.lastSearch) && !_.isEmpty(vm.allProps) && !vm.type) {
                // Objeto lleno y es /propiedades
                vm.propiedades = vm.lastSearch;
                setStateObjectFilterPaginationList();
            }
            else if (vm.isSearch) {
                // Objeto vacio y viene del buscador
                vm.error = "No se encontraron propiedades";
            }
            else if (!vm.isSearch) {
                //objeto vacio (no viene del buscador) o alquiler ventas: buscar en cache
                vm.propiedades = (vm.type) ? [] : $scope.$storage.prop_search;

                if (_.isEmpty(vm.propiedades)) {
                    //objeto vacio y cache vacía: traer todas las propiedades
                    buscarPropiedadesTokkoAPIWithData().$promise.then(function(response) {
                        //vm.propiedades = response.objects;

                        // Consultamos si venimos del vm.
                        if (vm.type) {
                            parsePropertyFactory.parseAllProperties(
                                response.objects, // .json completo de propiedades
                                vm.propiedades,
                                null, // No necesitamos el predictivo.
                                vm.barrios);
                        }
                        // Guardando en cache.
                        $localStorage.prop_search = vm.prop_search;

                        setStateObjectFilterPaginationList();
                    });
                }
                else {
                    // User press <F5> button.
                    if (vm.type) {
                        vm.propiedades = parsePropertyFactory.filtrarPorOperacion(
                            $scope.$storage.prop_cache, vm.type);
                    }
                    setStateObjectFilterPaginationList();
                }
            }
        }

        /**
         * Permite encapsular las funciones auxiliares necesarias
         * para el tratamiento de la ui.
         *  1. Set parent <state>.
         *  2. Crear objetos comunes para el filter interno.
         *  3. Crear objetos comunes para el paginador.
         */
        function setStateObjectFilterPaginationList() {
            setParentState();
            createCommonObjectFilter();

            // Variables auxiliares para el paginador.
            vm.totalItems = vm.propiedades.length;

            // Iniciamos las propiedades filtradas para la paginacion inicial.
            vm.properties = vm.propiedades.slice(0 * vm.itemsPerPage, 1 * vm.itemsPerPage);
        }

        vm.pageChanged = function() {
            vm.setPagingData(vm.currentPage);
            $location.hash('paginador');
            $anchorScroll();
        }

        /**
         * Permite generar los objetos auxiliares para filtrar el resultado
         * desde el vm resultado por los campos:
         *
         * { tiposProp | suite_amount | localization_barrio_id }
         *
         * @param {}
         */
        function createCommonObjectFilter() {
            // Inicializamos zonas a mostrar
            vm.zonas = [];

            // Recorro las propiedades del vm
            _.each(vm.propiedades, function(propiedad) {

                // Tipos de Propiedad
                /*if (!_.where(vm.tiposProp, {
                        'id': propiedad.type.id
                    }).length) {
                    vm.tiposProp.push({
                        id: propiedad.type.id,
                        name: tokkoFactory.getNamePropertyTypes(propiedad.type.id)
                    });
                }*/
                if (!_.contains(vm.tiposProp, propiedad.type.name)) {
                    vm.tiposProp.push(propiedad.type.name);
                }
                // Dormitorios
                if (!_.where(vm.suite_amount, {
                        'id': propiedad.suite_amount
                    }).length) {
                    var nombre = tokkoFactory.getNameDormitorios(propiedad.suite_amount);
                    if (propiedad.suite_amount > 0 && !_.isEqual(nombre, "Todos")) {
                        vm.suite_amount.push({
                            id: propiedad.suite_amount,
                            name: nombre
                        });

                    }
                }

                // Zonas: Si es Nueva Córdoba, poner el barrio. 
                if (!_.contains(vm.zonas, propiedad.zona) && propiedad.zona) {
                    vm.zonas.push(propiedad.zona);
                }
                else if (!_.contains(vm.zonas, propiedad.barrio) &&
                    propiedad.zona == false) {
                    vm.zonas.push(propiedad.barrio);
                }
                else {
                    //Propiedades sin zonas.
                    //console.log(propiedad);
                }

                // Atributos Especiales { Baño | patio | cochera | ...}
                // Para identificar las propiedades sin attEspeciales
                if (_.isEmpty(propiedad.tags)) {
                    vm.propSinAttEspeciales.push(propiedad);
                }
                else {
                    // Verificamos que los atributos en true esten en las prop.
                    vm.attEspeciales.push(propiedad.tags);
                }
            }); // Fin each


            createAttEspecialesObjectFilter();

            // Ordenamos
            vm.suite_amount = _.sortBy(vm.suite_amount, 'id');
            vm.zonas = _.sortBy(vm.zonas, 'name');
        }

        /**
         * 
         * 
         *
         */
        function createAttEspecialesObjectFilter() {
            // Atributos Especiales { Baño | patio | cochera | ...}
            // tags = { Patio | Balcón | Lavadero | Terraza  }
            resourceFactory.query_array({
                    id: 'att-especiales-filtro.json'
                },
                function(data) {
                    vm.attEspecialesHabilitados = _.filter(data, function(attEspecial) {
                        return attEspecial.show == true;
                    });
                }).$promise.then(function(response) {

                // Sive para [[a, b], [c], [d]] -> [a,b,c,d]
                var allAtt = [].concat.apply([], vm.attEspeciales)

                // Verificar si el att pertenece a alguna propiedad
                vm.attEspeciales = _.filter(vm.attEspecialesHabilitados, function(attHabilitado) {
                    return _.some(allAtt, function(attProp) {
                        return attProp.id == attHabilitado.id;
                    });
                });
            }); // Fin .$promise.then(function(response) 
        }

        /**
         * Overwrite parentState for all properties
         */
        function setParentState() {
            // Recorro las propiedades del vm
            _.each(vm.propiedades, function(propiedad) {
                propiedad.parentState = 'propiedades';
            });
        }


        /**
         * Consultamos la API de Tokko para obtener todas propiedades
         *
         */
        function buscarPropiedadesTokkoAPIWithData() {
            // Call factory to search Tokko properties.
            if (vm.type) {
                return tokkoFactory.getPropertiesByOperationType(vm.type);
            }
            else {
                return tokkoFactory.getPropertiesByCountry();
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
    } // Fin controller
})();
