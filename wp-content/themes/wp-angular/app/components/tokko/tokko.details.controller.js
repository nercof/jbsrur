(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('tokkoDetailsController', tokkoDetailsController);

    tokkoDetailsController.$inject = ['$state', '$stateParams', 'tokkoFactory', '$scope', '$rootScope'];

    /**
     * tokkoDetailsController: Gestión sobre el detalle de la propiedad en tokko.
     *  - @view: tokko-search-details
     */
    function tokkoDetailsController($state, $stateParams, tokkoFactory, $scope, $rootScope) {
        var vm = this;
        vm.propiedad = {}

        create();
        
        /**
         * create() Detalle de la propiedad pasada por parametro o consultando 
         * a la API de TOKKO con su id directamente. 
         * 
         * Se instancia desde:
         *  - predictive search: 
         *    Muestra el detalle de la propiedad seleccionada en el filtro de 
         *    propiedades obtenidas con el filtro predictivo.
         *
         *  - catalogo propiedades:
         *    Muestra el detalle de la propiedad seleccionada en el catalogo de 
         *    propiedades.
         *
         */
        function create() {
            if ($stateParams.data) {
                vm.propiedad = $stateParams.data
            }
            else {
                // Buscamos la propiedad en TOKKO
                tokkoFactory.getProperty($stateParams.id).then(function(data) {
                    vm.propiedad = data;
                });
            }
        }
    }
})();
