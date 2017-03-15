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

        $scope.$storage = $localStorage;

        // Filtros auxiliares parte UI
        vm.property_types = [];
        vm.suite_amount = [];
        vm.zonas = [];
        vm.attEspeciales = [];

        // models
        vm.property_types_selected = [];
        vm.suite_amount_selected = [];
        vm.zonas_selected = [];
        vm.attEspeciales_selected = [];
        vm.propSinAttEspeciales = [];

        vm.error = false;

        // Empleadas para la paginacion de propiedades.
        vm.totalItems = false;
        vm.currentPage = 1;
        vm.itemsPerPage = 16;

        // Activamos el controlador
        activate(vm);

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
        function activate(vm) {

            // Parámetros de entrada
            vm.allProps = $stateParams.allProps;
            vm.lastSearch = $stateParams.lastSearch;
            vm.isSearch = $stateParams.isSearch;

            if ( !_.isEmpty(vm.lastSearch) ) {
                //objeto lleno
                vm.propiedades = vm.lastSearch;
                setParentState();
                createCommonObjectFilter();

                // Variables auxiliares para el paginador.
                vm.totalItems = vm.propiedades.length;

                // Iniciamos las propiedades filtradas para la paginacion inicial.
                vm.properties = vm.propiedades.slice(0 * vm.itemsPerPage, 1 * vm.itemsPerPage);
                console.log('objeto lleno', vm.propiedades);
            }
            else if (vm.isSearch){
                //objeto vacio y viene del buscador
                vm.error = "No se encontraron propiedades";
                console.log('no se encontraron');
            } else if (!vm.isSearch){
                //objeto vacio y no viene del buscador: buscar en cache
                vm.propiedades = $scope.$storage.prop_search;
                console.log('objeto vacio y no viene del buscador', vm.propiedades)
                if ( _.isEmpty(vm.propiedades ) ) {
                    //objeto vacio y cache vacía: traer todas las propiedades
                    buscarPropiedadesTokkoAPIWithData().then(function(response){
                        console.log('objeto vacio y cache vacía',response);
                        vm.propiedades = response;
                        /*setParentState();
                        createCommonObjectFilter();

                        // Variables auxiliares para el paginador.
                        vm.totalItems = vm.propiedades.length;

                        // Iniciamos las propiedades filtradas para la paginacion inicial.
                        vm.properties = vm.propiedades.slice(0 * vm.itemsPerPage, 1 * vm.itemsPerPage);*/
                        //guardar en localStorage
                        /*$scope.$storage = $localStorage.$default({
                            prop_search: vm.prop_search
                        });
                        $scope.$storage.$apply();*/
                    });
                }
            }
        }

        vm.pageChanged = function() {
            vm.setPagingData(vm.currentPage);
            $location.hash('paginador');
            $anchorScroll();
        }

        /**
        * Permite generar los objetos auxiliares para filtrar el resultado
        * desde el catalogo resultado por los campos:
        *
        * { property_types | suite_amount | localization_barrio_id }
        *
        * @param {}
        */
        function createCommonObjectFilter() {
            // Atributos Especiales { Baño | patio | cochera | ...}
            // tags = { Patio | Balcón | Lavadero | Terraza  }
            resourceFactory.query_array({id: 'att-especiales-filtro.json'},
            function(data){
                vm.attEspeciales = _.filter(data, function(attEspecial){
                    return attEspecial.show == true;
                });
            });

            // Recorro las propiedades del catalogo
            _.each(vm.propiedades, function(propiedad) {
                // Tipos de Propiedad
                if (!_.where(vm.property_types, {
                    'id': propiedad.type.id
                }).length) {
                    vm.property_types.push({
                        id: propiedad.type.id,
                        name: tokkoFactory.getNamePropertyTypes(propiedad.type.id)
                    });
                }

                // Dormitorios
                if (!_.where(vm.suite_amount, {
                    'id': propiedad.suite_amount
                }).length) {
                    var nombre = tokkoFactory.getNameDormitorios(propiedad.suite_amount);
                    if(propiedad.suite_amount > 0 && !_.isEqual(nombre, "Todos")){
                        vm.suite_amount.push({
                            id: propiedad.suite_amount,
                            name: nombre
                        });

                    }
                }

                // Zonas
                if (!_.contains(vm.zonas, propiedad.zona)) {
                    vm.zonas.push(propiedad.zona);
                }

                // Atributos Especiales { Baño | patio | cochera | ...}
                // Para identificar las propiedades sin attEspeciales
                if(_.isEmpty(propiedad.tags)){
                    vm.propSinAttEspeciales.push(propiedad);
                }
            });
            // Ordenamos
            vm.suite_amount = _.sortBy(vm.suite_amount, 'id');
        }

        /**
         * Overwrite parentState for all properties
         */
         function setParentState(){
            // Recorro las propiedades del catalogo
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
            return tokkoFactory.getPropertyByCity().then(function(response) {
                console.log(response.objects, 'allProp');
                return response.objects;
            });
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
