(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('developmentsController', developmentsController);

    /**
     * catalogController: Gestión sobre el listado de propiedades en tokko.
     *  - @view: tokko-search-result
     */
    function developmentsController($scope, tokkoFactory, tokkoService, NgMap,
        resourceFactory, $stateParams, $state, $localStorage) {
        console.log('<< Loading developmentsController >>');
        var vm = this;

        vm.title_view = '';
        vm.allDevelopments = {};

        // $storage support
        $scope.$storage = $localStorage;

        // Empleadas para la paginacion de propiedades.
        vm.totalItems = false;
        vm.currentPage = 1;
        vm.itemsPerPage = 6;
        vm.developments = {};

        // Controla el estado de la consulta.
        vm.error = false;
        vm.spinner = true;

        // Activamos
        activate(vm);

        /**
         * activate():
         *
         * << @Comment >>
         */
        function activate(vm) {
            // Título de la vista
            vm.title_view = $stateParams.title_view;

            // Filtramos por tipo de Operacion
            getDevelopmentsTokkoAPI();

            if (_.isEmpty(vm.allDevelopments)) {
                vm.error = true;
            }
            else {
                // Almacenamos el resultado de la búsqueda.
                $scope.$storage.developments = vm.allDevelopments;

                // Variables auxiliares para el paginador.
                vm.totalItems = vm.allDevelopments.length;
                vm.spinner = false;

                // Iniciamos las propiedades filtradas para la paginacion inicial.
                vm.developments = vm.allDevelopments.slice(0 * vm.itemsPerPage, 1 * vm.itemsPerPage);
            }
        } // fin activate()
        
        /**
         * Obtener los <emprendimientos> desde la API de Tokko
         * @param {} page - <description>
         */
        function getDevelopmentsTokkoAPI() {
            // json example
            // http://www.jsoneditoronline.org/?id=19d496428cead0d42adf9485f779a008
            
            // Buscamos en la API
            tokkoFactory.getDevelopmentsTokkoAPI().then(function(response) {
                if (response.objects.length > 0) {
                    vm.allDevelopments = response.objects;
                }
            });
        }
        
        /**
         * Setea lista propiedades x pagina
         * El listado de propiedades depende del parametro page pasado.
         *
         * @param {int} page - Pagina actual
         */
        vm.setPagingData = function(page) {
            vm.developments = vm.allDevelopments.slice((page - 1) * vm.itemsPerPage, page * vm.itemsPerPage);
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
