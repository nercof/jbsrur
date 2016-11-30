(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('quienesSomosController', quienesSomosController);

    /**
    * quienesSomosController:
    */
    function quienesSomosController($scope, typeFactory) {
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
            getQuienesSomos().then(function (data){
                vm.qSomos = data;
                console.log(vm.qSomos);
            });
        } // fin activate()

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
