(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('developmentsDetailsController', developmentsDetailsController);

    developmentsDetailsController.$inject = ['$state', '$stateParams', 'tokkoFactory', '$scope', '$rootScope', 'typeFactory' ];

    /**
     * developmentsDetailsController: Gestión sobre el detalle del emprendimiento.
     *  - @view: tokko-search-details
     */
    function developmentsDetailsController($state, $stateParams, tokkoFactory, $scope, $rootScope, typeFactory) {
        console.log('<< Loading developmentsDetailsController >>');

        var vm = this;
        vm.development = {};
        vm.contact_form = {};
        vm.title_view = '';

        create();

        /**
         * create() Detalle de la propiedad pasada por parametro o consultando
         * a la API de TOKKO con su id directamente.
         *
         * Se instancia desde:
         *  - catalogo emprendimientos:
         *    Muestra el detalle de la propiedad seleccionada en el catalogo de
         *    emprendimientos.
         *
         */
        function create() {
            // Generamos el modelo Propiedad
            if (!_.isEmpty($stateParams.data)) {
                vm.development = $stateParams.data;
            }
            else {
                // @TODO: No es necesario.
                /*
                tokkoFactory.getDevelopmentsTokkoAPIById($stateParams.id).then(function(data) {
                    vm.development = data;
                });
                */
            }
            // Seteamos el titulo de la vista.
            // title_view();
            if (vm.development) {
                console.log(vm.development.image);
            }
            /*
            // Generamos el modelo ContactForm
            typeFactory.getPostByCategoryName("contacto").then(
                function(data) {
                    // slug: "formulario-de-contacto"
                    vm.contact_form = _.find(data, {slug:"contacto"});
                    // Usando la magia de jQuery para obtener el objeto con id
                    // que generamos e incorporarle el trozo html del formulario
                    // generado desde Wordpress.
                    angular.element('#jbsrur_contact_form').append(vm.contact_form.content.rendered);
                });
            */
        }

        /**
        * Determina el titulo de la vista.
        */
        function title_view(){
            console.log("title_view()");
            _.each(vm.development.categories, function(cat){
                if (category == cat) {
                    vm.title_view = 'Detalle del Emprendimiento';
                }
            });
        }
    }
})();
