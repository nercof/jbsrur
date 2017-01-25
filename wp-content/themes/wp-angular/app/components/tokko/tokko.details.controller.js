(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('tokkoDetailsController', tokkoDetailsController);

    tokkoDetailsController.$inject = ['$state', '$stateParams', 'tokkoFactory', '$scope', '$rootScope', 'typeFactory', 'Lightbox'];

    /**
    * tokkoDetailsController: Gestión sobre el detalle de la propiedad en tokko.
    *  - @view: tokko-search-details
    */
    function tokkoDetailsController($state, $stateParams, tokkoFactory, $scope, $rootScope, typeFactory, Lightbox) {
        var vm = this;
        vm.propiedad = {};
        vm.contact_form = {};
        vm.galleryLightboxModal = [];

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
            if (!_.isEmpty($stateParams.data)) {
                vm.propiedad = $stateParams.data;
                parseAndBuildGallery();
            }
            else {
                // Buscamos la propiedad en TOKKO
                tokkoFactory.getProperty($stateParams.id).then(function(data) {
                    vm.propiedad = data;
                    parseAndBuildGallery();
                });
            }
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

            }// Fin create()

            function parseAndBuildGallery() {
                _.each(vm.propiedad.photos, function(photo) {
                    // Incorporamos la imagen a la gallery
                    if (!_.isEmpty(photo)) {
                        vm.galleryLightboxModal.push(photo.image);
                    }
                });
            }

            $scope.openLightboxModal = function (index) {
                Lightbox.openModal(vm.galleryLightboxModal, index);
            };
        }
    })();
