(function() {
    'use strict';
    /**
     * cf_tokko: Custom filter.
     *  - @view: tokko-search-input
     *
     * Objetivo: removeAccents and filter properties.
     */
    angular
        .module('app.core')
        .filter('cf_prop', cf_psearch);

    function cf_psearch() {
        return filterProps;

        /**
         * vm.prop_search = properties filtered
         *
         * @param: all_prop: All properties in localStorage.prop_cache{}
         * @param: vm: tokkoController
         *
         * @FIXME:
         *  - tenemos que completar el input de filtros dependiendo de
         *    vm.properties, porque por ejemplo tenemos a nivel ui
         *    +5 dormitorios pero en la <page> actual no esta ese objeto.
         *
         *    Se me ocurre ejecutar createCommonObjectFilter() en cada paginacion
         */
        function filterProps(all_prop, vm) {
            // Variables a utilizar.
            var filtered = []; // Todas las propiedades.
            var typeActive = [];
            var domiActive = [];
            var attEspActive = [];
            var zonasActive = [];
            var preFiltered = [];

            // Permite filtrar los que esten con estado false.
            typeActive = parseTrue(vm.property_types_selected);
            domiActive = parseTrue(vm.suite_amount_selected);
            attEspActive = parseTrue(vm.attEspeciales_selected);
            zonasActive = parseTrue(vm.zonas_selected);

            // Sino hay nada para filtrar
            if (_.isEmpty(typeActive) && _.isEmpty(domiActive) &&
                _.isEmpty(attEspActive) && _.isEmpty(zonasActive)) {
                filtered = all_prop;
            }
            else {
                if (!_.isEmpty(zonasActive)) {
                    // Tendremos que empezar a filtrar por lo seleccionado
                    // Tipo de Propiedad
                    filtered = _.filter(all_prop, function(propiedad) {
                        return _.some(zonasActive, function(zona) {
                            return (propiedad.zona == zona || //xZona
                                propiedad.barrio == zona); //xNuevaCórdoba
                        });
                    });
                }
                // Nada para filtrar con Zonas
                if (_.isEmpty(filtered)) {
                    filtered = all_prop;
                }

                // Tendremos que empezar a filtrar por lo seleccionado
                if (!_.isEmpty(typeActive)) {
                    // Tipo de Propiedad
                    filtered = _.filter(filtered, function(propiedad) {
                        return _.some(typeActive, function(ptype) {
                            return propiedad.type.id == ptype;
                        });
                    });
                }
                // Nada para filtrar con Tipo de Propiedad
                if (_.isEmpty(filtered)) {
                    filtered = all_prop;
                }

                if (!_.isEmpty(domiActive)) {
                    // Dormitorios
                    filtered = _.filter(filtered, function(propiedad) {
                        return _.some(domiActive, function(pdorm) {
                            return propiedad.suite_amount == pdorm;
                        });
                    });
                }
                
                // Nada para filtrar por cantidad de dormitorios
                if (_.isEmpty(filtered)) {
                    filtered = all_prop;
                }
                
                if (!_.isEmpty(attEspActive)) {
                    // Atributos Especiales.
                    filtered = _.filter(filtered, function(propiedad) {
                        return _.some(attEspActive, function(attEsp) {
                            return _.where(propiedad.tags, {
                                'id': parseInt(attEsp)
                            }).length > 0;
                        });
                    });
                
                }
            }
            
            return filtered;
        }

        /**
         * F(x) que permite eliminar los filtros unchecked para que no quede el
         * arreglo de la forma [2: false, 3: true] y siempre tengamos los true
         *
         */
        function parseTrue(checkboxCollection) {
            return _.keys(_.pick(checkboxCollection,
                function(v, k) {
                    return v === true;
                }));
        }
    }
})();
