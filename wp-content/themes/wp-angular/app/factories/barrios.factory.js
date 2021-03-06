'use strict';;
(function() {
    angular
        .module('app.factories')
        .factory('barriosFactory', dataFactory);

    function dataFactory(resourceFactory) {

        var data = {
            'getBarriosCatalogados': getBarriosCatalogados
        }

        /**
         * Leer .json de barrios 
         * 
         */
        function getBarriosCatalogados() {
            return resourceFactory.query({
                    id: 'barrios_cba.json'
                },
                function(data) {
                    return data; //todos los barrios sin zonas
                });
        }

        return data;
    }
}());
