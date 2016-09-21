(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('mainFooterController', mainFooterController);

    mainFooterController.$inject = ['$state', '$stateParams', 'tokkoFactory', '$scope', '$rootScope'];

    /**
    * mainFooterController: <comment>
    *  - @view: main-footer
    */
    function mainFooterController($state, $stateParams, tokkoFactory, $scope, $rootScope) {
        var vm = this;
        vm.title = false;
        vm.email = false;
        vm.subtitle = false;
        vm.links = [];

        create();

        /**
        * create()
        *
        */
        function create() {
            vm.title = "JBSRUR";
            vm.subtitle = "La inmobiliaria de Córdoba";
            vm.email = "info@jbsrur.com.ar";
            vm.links = ["Ventas", "Alquiler",
            "Administracion", "Quienes somos", "Nuestros emprendimientos",
            "Novedades"];
        }
    }
})();
