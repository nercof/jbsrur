(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('novedadesController', novedadesController);

    novedadesController.$inject = ['typeFactory', '$scope', 'mediaFactory'];

    /**
    * novedadesController: Gestión de últimos post con category:Novedades.
    *  - @view: content
    */
    function novedadesController(typeFactory, $scope, mediaFactory) {
        var vm = this;
        vm.novedades = {};
        vm.slides = [];
        vm.destacadas = [];
        vm.otras = [];

        // Empleadas para la paginacion de propiedades.
        vm.totalItems = false;
        vm.currentPage = 1;
        vm.itemsPerPage = 6;

        // Cada tipo de post debe tener asociado un icono en la views.
        vm.iconos_format = {
            "1":"typcn typcn-camera-outline",
            "2":"typcn typcn-video-outline",
            "3": "typcn typcn-calendar-outline",
            "4": "typcn typcn-lightbulb"
        };

        create();

        /**
        * create() Coleccion de Novedades del sitio.
        *
        * Se instancia desde:
        *  - menú Novedades:
        *    Muestra el detalle de los últimos post con category:novedades.
        *
        * Atributos a tener en cuenta:
        *  {object.novedad}.excerpt.rendered: descripciones de un post
        *  {object.novedad}.title.rendered:The title for the object
        *  {object.novedad}.author (?)
        *  {object.novedad}.format: {standard, video, post, ...}
        *  {object.novedad}.tags: {5:destacados, 6:otros} -> @see:http://v2.wp-api.org/reference/tags/
        *  {object.novedad}.featured_media: que se tiene que buscar en {object.novedad}.guid.rendered
        */
        function create() {

            // Buscamos las novedades.
            typeFactory.getPostsByContentType("novedad").then(function(data) {
                vm.novedades = data;
                vm.destacadas = getDestacadasyOtras(data);

                // Recorremos las novedades para poder dividir en grupos de 4.
                _.each(vm.destacadas, function(destacada, i){
                    // Buscamos la imagen relacionada
                    mediaFactory.getMedia(destacada.featured_media).then(function(data) {
                        destacada.foto = data;
                        if (!_.isEmpty(destacada.foto.guid)) {
                            destacada.full = destacada.foto.media_details.sizes.full.source_url;
                        }
                        if(i % 4 == 0) {
                            // creamos slides de 4 novedades
                            vm.slides.push( vm.destacadas.slice(i, i + 4) );
                        }
                    });
                });

                // Recorremos las novedades para buscar la imagen relacionada.
                _.each(vm.otras, function(otra, i){
                    // Buscamos la imagen relacionada
                    mediaFactory.getMedia(otra.featured_media).then(function(data) {
                        otra.foto = data;
                        if (!_.isEmpty(otra.foto.guid)) {
                            otra.full = otra.foto.media_details.sizes.full.source_url;
                        }
                    });
                });

                // Iniciamos las propiedades filtradas para la paginacion inicial.
                vm.otras_noticias = vm.otras.slice(0 * vm.itemsPerPage, 1 * vm.itemsPerPage);
                console.log(vm.otras_noticias);
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

        function getDestacadasyOtras(novedades) {
            var destacadas = [];

            _.each(novedades, function(novedad, i){
                if (novedad["wpcf-destacada"] === "1") {
                    destacadas.push(novedad);
                }else {
                    vm.otras.push(novedad);
                }
            });
            return (destacadas);
        }
    }
})();
