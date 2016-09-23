(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('novedadesDestacadasController', novedadesDestacadasController);

    novedadesDestacadasController.$inject = ['postFactory', '$scope'];

    /**
     * novedadesController: Gestión de últimos post con category:Novedades.
     *  - @view: content
     */
    function novedadesDestacadasController(postFactory, $scope) {
        var vm = this;
        vm.novedades = {};
        vm.slides = [];
        vm.iconos_format = {};

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
         */
        function create() {
            // Buscamos las novedades.
            postFactory.getPostByCategoryName("novedades").then(function(data) {
                vm.novedades = data;

                // Cada tipo de post debe tener asociado un icono en la views.
                vm.iconos_format = {
                    "standard":"typcn typcn-camera-outline",
                    "video":"typcn typcn-video-outline",
                    "post": "typcn typcn-calendar-outline",
                };

                // Recorremos las novedades para poder dividir en grupos de 4.
                _.each(vm.novedades, function(novedad, i){
                    var actived = (i == 0 ? true : false );
                    novedad.active = actived;
                    if(i % 4 == 0) {
                        // creamos slides de 4 novedades
                        vm.slides.push( vm.novedades.slice(i, i + 4) );
                    }
                })
                console.log(vm.slides, vm.iconos_format);
            });
        }
    }
})();
