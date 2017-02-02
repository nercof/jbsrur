(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('novedadesDetalleController', novedadesDetalleController);

    novedadesDetalleController.$inject = ['$scope', 'mediaFactory', '$state', '$stateParams'];

    /* @ngInject */
    function novedadesDetalleController($scope, mediaFactory, $state, $stateParams) {
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
                // @TODO: No es necesario.
            }

            // Seteamos el titulo de la vista.
            // title_view();
        }
    }
})();
