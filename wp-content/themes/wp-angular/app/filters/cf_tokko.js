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
    .filter('cf_tokko', function() {
        console.log("Custom filter: << i_query >>");

        /**
        * vm.prop_search = properties filtered
        *
        * @param: all_prop: All properties in localStorage.prop_cache{}
        * @param: query_search: input data from user views
        */
        return function( all_prop, query_search, vm) {
            // Var for test
            var filtered = [];
            // var words separate by space
            var value_search = [];
            var words = [];

            words = removeEspecialChar(query_search).toLowerCase();
            value_search = words.split(/(\s+)/).filter(
                function(e) { return e.trim().length > 0; }
            );

            var obj = {
                "operation_types": [],//_.keys(vm.operation_types),
                "property_types": [],//_.keys(vm.property_types),
                "suite_amount": [],//_.keys(vm.suite_amount),
                "current_localization_id": [],//_.keys(vm.localization_barrio_id)
            }

            // activate object operation_types if correspond
            isOperationTypes(value_search, vm);

            // activate object property_types with if correspond
            isProperty_types(value_search, vm);

            // activate object current_localization_id if correspond
            isNeighborhood(value_search, vm);

            console.log(vm);

            return filtered;
        }

        /**
        * tokkoController.tokko_data.tp:Resource
        * @param: value_search:
        * @param: operation_types
        */
        function isProperty_types(value_search, pController){
            //console.log("Custom filter: << isProperty_types() >>");
            // Si el usuario ingresa param in the quieck search.
            if (!_.isEmpty(value_search)){
                _.each(value_search, function(value){
                    // Por cada tipo de operacion
                    _.each(pController.tokko_data.tp, function(ptype){
                        if( _.isEqual((ptype.name).toLowerCase(), value) &&
                            !_.contains(_.values(pController.property_types), ptype)){
                            // @FIXME: Add dictionary with abreviation.
                            pController.property_types.push(ptype);
                        }
                    });
                });
            }
        }

        /**
        * tokkoController.barriosXzona:Resource
        * @param: value_search:
        * @param: operation_types
        */
        function isNeighborhood(value_search, pController){
            console.log("Custom filter: << isNeighborhood() >>");
            console.log(pController.barriosXzonaArray);
            // Si el usuario ingresa param in the quieck search.
            if (!_.isEmpty(value_search)){
                console.log(value_search);

                _.each(value_search, function(value){
                    _.intersection();
                });
            }
        }

        /**
        * tokkoController.tokko_data.op:Resource
        * @param: value_search:
        * @param: operation_types
        */
        function isOperationTypes(value_search, pController){

            // Si el usuario ingresa param in the quieck search.
            if (!_.isEmpty(value_search)){
            //    console.log("<< Proceso búsqueda type operations >>");
                _.each(value_search, function(value){
                    // Por cada tipo de operacion
                    _.each(pController.tokko_data.op, function(type){
                        if( _.isEqual((type.name).toLowerCase(), value) &&
                        !_.contains(_.values(pController.operation_types), type)){
                            pController.operation_types.push(type);
                        }
                    });
                });
            }
        }

        /**
        * @param: query_search: input to replace
        */
        function removeEspecialChar(query_search){
            return query_search.replace(/á/g, 'a')
            .replace(/â/g, 'a')
            .replace(/é/g, 'e')
            .replace(/è/g, 'e')
            .replace(/ê/g, 'e')
            .replace(/í/g, 'i')
            .replace(/ï/g, 'i')
            .replace(/ì/g, 'i')
            .replace(/ó/g, 'o')
            .replace(/ô/g, 'o')
            .replace(/ú/g, 'u')
            .replace(/ü/g, 'u')
            .replace(/ç/g, 'c')
            .replace(/ß/g, 's')
            .replace(/á/g, 'a')
            .replace(/é/g, 'e')
            .replace(/í/g, 'i')
            .replace(/ó/g, 'o')
            .replace(/ú/g, 'u')
            .replace(/Ö/g, 'o')
            .replace(/ö/g, 'o')
            ;
        }
    });
})();
