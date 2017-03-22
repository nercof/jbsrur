(function() {
    'use strict';

    angular
        .module('app.core')
        .filter('save_model', save_model);

    function save_model() {
        return filterPropiedades;

        function filterPropiedades(model, vm) {
            vm.predictiveResult = model;

            return model;
        }
    }
})();
