(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('administracionController', administracionController);

    /**
    * quienesSomosController:
    */
    function administracionController($scope, typeFactory, mediaFactory) {
        var vm = this;

        vm.title_view = '';
        vm.admProp = {};

        // Activamos
        activate(vm);

        /**
        * activate():
        *
        * << @Comment >>
        */
        function activate(vm) {
            getAdministracion().then(function (data){
                vm.admProp = data;
                console.log(data);

                // Buscamos las imagenes en WP
                mediaFactory.getMedia(vm.admProp.featured_media).then(function(data){
                    vm.admProp.image = data.source_url;
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
        }
        /**
        *
        * @param {} page - <description>
        */
        function getAdministracion() {
            return typeFactory.getAdmProp(180).then(
                function(data){
                    return data;
                }
            );
        }
    } // Fin controller
})();
