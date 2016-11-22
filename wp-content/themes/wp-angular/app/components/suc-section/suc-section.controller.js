(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('sucSectionController', sucSectionController);

    sucSectionController.$inject = ['typeFactory', 'mediaFactory'];

    /* @ngInject */
    function sucSectionController(typeFactory, mediaFactory) {
        var vm = this;
        vm.img = [];

        activate();

        /*
        * Cargar sucursales e imagenes.
        */
        function activate() {
            console.log("<< sucSectionController >>");

            typeFactory.getSucursales().then(
                function(data){
                    vm.sucursales = _.sortBy(data, 'id');
                    // Cargar la url de la imagen
                    setImages();
                    console.log(" getSucursales() ");
                    console.log(vm.sucursales);

                }
            );
        }

        function setImages() {
            var medias = [];

            // Recorremos las sucursales y obtenemos los id.media
            _.each(vm.sucursales, function (sucursal) {

                // Buscamos las imagenes en la WP
                mediaFactory.getMedia(sucursal.featured_media).then(function(data){
                    sucursal.img = data.source_url;
                    console.log(sucursal.img);
                });
            });

        }
    }
})();
