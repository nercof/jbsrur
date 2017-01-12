(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('developmentsDetailsController', developmentsDetailsController);

    developmentsDetailsController.$inject = ['$state', '$stateParams', 'tokkoFactory', '$scope', '$rootScope', 'typeFactory', 'mediaFactory' ];

    /**
    * developmentsDetailsController: Gestión sobre el detalle del emprendimiento.
    *  - @view: tokko-search-details
    */
    function developmentsDetailsController($state, $stateParams, tokkoFactory, $scope, $rootScope, typeFactory, mediaFactory) {
        console.log('<< Loading developmentsDetailsController >>');

        var vm = this;
        vm.emprendimiento = {};
        vm.contact_form = {};
        vm.title_view = '';
        vm.gallery = [];
        vm.slides = [];

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
                vm.emprendimiento = $stateParams.data;
                // Parse lat-long desde el dato de la API
                parseLatitudLongitud();
                parseSucursal();
                parseAndBuildGallery();
            }
            else {
                typeFactory.getEmprendimientoById($stateParams.id).then(function(data){
                    vm.emprendimiento = data;
                    console.log(vm.emprendimiento);
                    // Buscamos las imagenes en WP
                    mediaFactory.getMedia(vm.emprendimiento.featured_media).then(function(data){
                        vm.emprendimiento.image = data.source_url;
                    });

                    // Buscamos la imagen de portada
                    vm.emprendimiento.portada = vm.emprendimiento["wpcf-portada"];
                    // Parse lat-long desde el dato de la API
                    parseLatitudLongitud();
                    parseSucursal();
                    parseAndBuildGallery();
                }
            );
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

        }
        /**
        *
        */
        function buildSlider() {

            // Recorremos las novedades para poder dividir en grupos de 4.
            _.each(vm.gallery, function(imagen, i){
                if(i % 3 == 0) {
                    // creamos slides de 4 novedades
                    vm.slides.push( vm.gallery.slice(i, i + 3) );
                    console.log(vm.slides);
                }
            });
        }
        /**
        * "Ejemplo [gallery ids="136,135,134"]"
        * vm.emprendimiento["wpcf-slider"]
        */
        function parseAndBuildGallery() {
            // id auxiliar
            var id = 0;
            var gallery_id = [];

            // Formateamos las imagenes dede el campo
            gallery_id = vm.emprendimiento["wpcf-slider"].split('\"');
            gallery_id = gallery_id[1].split(","); // Array [ ""136", "135", "134"]" ]

            if (!_.isEmpty(gallery_id)) {
                // Recorremos las novedades para poder dividir en grupos de 3.

                _.each(gallery_id, function(imagenID, i){
                    id = Number(imagenID);

                    // Buscamos la imagen relacionada
                    mediaFactory.getMedia(id).then(function(imagen) {

                        // Incorporamos la imagen a la gallery
                        if (!_.isEmpty(imagen.guid)) {
                            imagen.full = imagen.media_details.sizes.full.source_url;
                            vm.gallery.push(imagen);
                        }

                    });

                });

            }
        }
        /**
        *
        */
        function parseSucursal() {

            typeFactory.getSucursal(vm.emprendimiento['wpcf-sucursal']).then(
                function(data){
                    vm.emprendimiento.suc_nombre = data.title.rendered;
                    vm.emprendimiento.suc_telefo = data['wpcf-telefono'];
                }
            );
        }

        /*
        * Comment
        *
        */
        function parseLatitudLongitud() {
            // Formateamos latitud y longitud.
            var data = vm.emprendimiento["wpcf-latitud-y-longitud"].split(";");
            if (!_.isEmpty(data)) {
                vm.emprendimiento.geo_lat = data[0];
                vm.emprendimiento.geo_long = data[1];
            }
        }

        /**
        * Determina el titulo de la vista.
        */
        function title_view(){
            _.each(vm.emprendimiento.categories, function(cat){
                if (category == cat) {
                    vm.title_view = 'Detalle del Emprendimiento';
                }
            });
        }
    }
})();
