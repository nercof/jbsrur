(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('tokkoDetailsController', tokkoDetailsController);

    tokkoDetailsController.$inject = ['$state', '$stateParams', '$breadcrumb', 'STATE', 'TYPE', 'tokkoFactory', '$scope', '$rootScope', 'typeFactory', 'Lightbox'];

    /**
     * tokkoDetailsController: Gestión sobre el detalle de la propiedad en tokko.
     *  - @view: tokko-search-details
     */
    function tokkoDetailsController($state, STATE, TYPE, $stateParams, $breadcrumb, tokkoFactory, $scope, $rootScope, typeFactory, Lightbox) {
        var vm = this;
        vm.propiedad = {};
        vm.contact_form = {};
        vm.galleryLightboxModal = [];
        vm.parentState = '';
        $scope.data = $scope.$resolve.$stateParams.data;
        $scope.id   = $scope.$resolve.$stateParams.id;

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
            vm.openForm = false;
            // Generamos el modelo Propiedad
            if (!_.isEmpty($scope.data)) {
                vm.propiedad = $scope.data;
                parseAndBuildGallery();
            }
            else {
                // Buscamos la propiedad en TOKKO
                tokkoFactory.getProperty($scope.id).then(function(data) {
                    vm.propiedad = data;
                    parseAndBuildGallery();
                    
            console.log(vm.propiedad);
                });

            }
            // Generamos el modelo ContactForm
            typeFactory.getPostByCategoryName("contacto").then(
                function(data) {
                    // slug: "formulario-de-contacto"
                    vm.contact_form = _.find(data, {
                        slug: "contacto"
                    });
                    // Usando la magia de jQuery para obtener el objeto con id
                    // que generamos e incorporarle el trozo html del formulario
                    // generado desde Wordpress.
                    angular.element('#jbsrur_contact_form').append(vm.contact_form.content.rendered);
                    angular.element('#jbsrur_contact_form form').attr("action", "/contacto/#wpcf7-f533-p563-o1");
                    angular.element('#jbsrur_contact_form form').attr("name", "contactForm");
                    angular.element('#jbsrur_contact_form input[type="email"]').attr("ng-model", "contactForm.email");
                });

        } // Fin create()

        function parseAndBuildGallery() {
            vm.propiedad.tags = (vm.propiedad.tags.length === 0) ? false : vm.propiedad.tags;
            _.each(vm.propiedad.photos, function(photo) {
                // Incorporamos la imagen a la gallery
                if (!_.isEmpty(photo)) {
                    vm.galleryLightboxModal.push(photo.image);
                }
            });
        }

        $scope.openLightboxModal = function(index) {
            Lightbox.openModal(vm.galleryLightboxModal, index);
        };

        $scope.openForm = function() {
            vm.openForm = !vm.openForm;
        };
    }
})();
