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
        vm.emprendimiento = {};
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
                vm.emprendimiento = $stateParams.data;
                console.log(vm.emprendimiento);
                // Parse lat-long desde el dato de la API
                parseLatitudLongitud();
                parseSucursal();
                parseGallery();
            }
            else {} // Consultar si corresponde

            // Seteamos el titulo de la vista.
            // title_view();


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
        function parseGallery() {
            // Formateamos los autores
            // "sdNVBNFDJGHJHKHJKFGHSDFGASDGSFG↵[gallery ids="136,135,134"]"
            var gallery = [];
            gallery = vm.emprendimiento["wpcf-slider"].split("=");
            gallery = array[1].split(",");
            if (!_.isEmpty(array)) {}

            // Recorremos las novedades para poder dividir en grupos de 4.

            _.each(gallery, function(imagen, i){
                
                // Buscamos la imagen relacionada
                mediaFactory.getMedia(imagen).then(function(data) {

                    /*destacada.foto = data;
                    if (!_.isEmpty(destacada.foto.guid)) {
                        destacada.full = destacada.foto.media_details.sizes.full.source_url;
                    }
                    if(i % 4 == 0) {
                        // creamos slides de 4 novedades
                        vm.slides.push( vm.destacadas.slice(i, i + 4) );
                    }
                    */
                });
            });

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
