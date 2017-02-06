(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('novedadesDetalleController', novedadesDetalleController);

    novedadesDetalleController.$inject = ['$scope', 'mediaFactory', 'typeFactory', '$state', '$stateParams'];

    /* @ngInject */
    function novedadesDetalleController($scope, mediaFactory, typeFactory, $state, $stateParams) {
        var vm = this;
        console.log('<< Loading novedadesDetalleController >>');

        var vm = this;
        vm.novedad = {};
        vm.contact_form = {};
        vm.title_view = '';

        activate();

        function activate() {

            // Generamos el modelo Propiedad
            if (!_.isEmpty($stateParams.data)) {
                vm.novedad = $stateParams.data;
            }
            else {
                // Buscamos
                typeFactory.getPostsByContentTypeId("novedad", $stateParams.id).then(function(data) {
                    vm.novedad = data;
                    mediaFactory.getMedia(vm.novedad.featured_media).then(function(data) {
                        vm.novedad.foto = data;
                        if (!_.isEmpty(vm.novedad.foto.guid)) {
                            vm.novedad.full = vm.novedad.foto.media_details.sizes.full.source_url;
                        }
                    });
                });
            }
        }
    }
})();
