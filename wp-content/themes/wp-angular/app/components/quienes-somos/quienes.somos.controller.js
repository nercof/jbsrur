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
                vm.valoresString = data['wpcf-valores'];
                vm.valoresString = vm.valoresString.replace(/([<])+([u])+([l])+([>])/g, '');
                vm.valoresString = vm.valoresString.replace(/([<])+([/])+([u])+([l])+([>])/g, '');
                vm.valores = _.filter(angular.element(vm.valoresString), function(item){
                    return item.nodeName === 'LI'
                });
                vm.valores = _.pluck(vm.valores, 'innerHTML');

                // Buscamos las imagenes en WP
                mediaFactory.getMedia(vm.qSomos.featured_media).then(function(data){
                    vm.qSomos.image = data.source_url;
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
        function getQuienesSomos() {
            return typeFactory.getQuienesSomos(154).then(
                function(data){
                    return data;
                }
            );
        }
    } // Fin controller
})();
