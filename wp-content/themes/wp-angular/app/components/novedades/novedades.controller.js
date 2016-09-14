(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('novedadesController', novedadesController);

    novedadesController.$inject = ['postFactory', '$scope'];

    /**
     * novedadesController: Gestión de últimos post con category:Novedades.
     *  - @view: content
     */
    function novedadesController(postFactory, $scopee) {
        var vm = this;
        vm.novedades = {}

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
            vm.novedades = postFactory.getPostByCategoryName("novedades").then(function(data) {
                vm.novedades = data;
            
            // Podriamos tener dos listas
            // vm.novedades_tag_destacados
            // vm.novedades_tag_otros
            
            console.log(vm.novedades);
            });
        }
    }
})();
