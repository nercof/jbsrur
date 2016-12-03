(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('quienesSomosController', quienesSomosController);

    /**
    * quienesSomosController:
    */
    function quienesSomosController($scope, typeFactory, mediaFactory) {
        var vm = this;

        vm.title_view = '';
        vm.qSomos = {};
        vm.miembros = [];

        // Activamos
        activate(vm);

        /**
        * activate():
        *
        * << @Comment >>
        */
        function activate(vm) {
            getQuienesSomos().then(function (data){
                vm.qSomos = data;

                typeFactory.getPostsByContentType("autor").then(function(data) {
                    var autores_all = data;

                    // Formateamos los autores
                    var slug = vm.qSomos["wpcf-miembros"].split(",");

                    // Recorremos qSomos
                    _.each(slug, function (miembro) {
                        _.find(autores_all, function(autor){
                            // Verificamos el autor
                            if (autor.slug == miembro.trim()) {
                                // Incorporamos el autor
                                vm.miembros.push(autor);
                            }
                        });
                    });
                    // Tenemos que hacer el link de media
                    setImages();
                    angular.element('#qSomos_descripcion').append(vm.qSomos.content.rendered);
                });
            });
        } // fin activate()

        /**
        * Permite mapear el id de imagen con la url del BE.
        */
        function setImages() {
            var medias = [];

            // Recorremos las sucursales y obtenemos los id.media
            _.each(vm.miembros, function (autor) {
                // Buscamos las imagenes en WP
                mediaFactory.getMedia(autor.featured_media).then(function(data){
                    autor.image = data.source_url;
                });
            });

            // Buscamos las imagenes en WP
            mediaFactory.getMedia(vm.qSomos.featured_media).then(function(data){
                vm.qSomos.image = data.source_url;
            });
        }
        /**
        * Obtener los <emprendimientos> desde la API de Tokko
        * @param {} page - <description>
        */
        function getQuienesSomos() {
            return typeFactory.getQuienesSomos(154).then(
                function(data){
                    return data;
                }
            );
        }
    } // Fin controller
})();
