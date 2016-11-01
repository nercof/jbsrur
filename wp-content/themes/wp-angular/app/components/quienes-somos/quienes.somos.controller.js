(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('quienesSomosController', quienesSomosController);

    /**
     * quienesSomosController: 
     */
    function quienesSomosController($scope) {
        console.log('<< Loading catalogController >>');
        var vm = this;

        vm.title_view = '';
        vm.qSomos = {}

        // Activamos
        activate(vm);

        /**
         * activate():
         *
         * << @Comment >>
         */
        function activate(vm) {
            
        } // fin activate()
    } // Fin controller
})();
