(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('sucSectionController', sucSectionController);

    sucSectionController.$inject = ['typeFactory'];

    /* @ngInject */
    function sucSectionController(typeFactory) {
        var vm = this;

        activate();

        function activate() {
            console.log("<< sucSectionController >>");

            typeFactory.getSucursales().then(
                function(data){
                    vm.sucursales = data;
                    console.log("sucSectionController");
                    console.log(vm.sucursales);
                }
            );
        }
    }
})();
