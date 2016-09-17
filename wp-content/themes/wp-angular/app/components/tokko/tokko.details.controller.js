(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('tokkoDetailsController', tokkoDetailsController);

    tokkoDetailsController.$inject = ['$state', '$stateParams', 'tokkoFactory', '$scope', '$rootScope', 'postFactory' ];

    /**
     * tokkoDetailsController: Gestión sobre el detalle de la propiedad en tokko.
     *  - @view: tokko-search-details
     */
    function tokkoDetailsController($state, $stateParams, tokkoFactory, $scope, $rootScope, postFactory) {
        var vm = this;
        vm.propiedad = {}
        vm.contact_form = {}

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
            // Generamos el modelo Propiedad
            if ($stateParams.data) {
                vm.propiedad = $stateParams.data
            }
            else {
                // Buscamos la propiedad en TOKKO
                tokkoFactory.getProperty($stateParams.id).then(function(data) {
                    vm.propiedad = data;
                });
            }
            // Generamos el modelo ContactForm
            postFactory.getPostByCategoryName("contacto").then(
                function(data) {
                    // slug: "formulario-de-contacto"
                    vm.contact_form = _.find(data, {slug:"formulario-de-contacto"});

                    // Usando la magia de jQuery para obtener el objeto con id
                    // que generamos e incorporarle el trozo html del formulario
                    // generado desde Wordpress.
                    angular.element('#jbsrur_contact_form').append(vm.contact_form.content.rendered);
                });
        }
    }
})();
