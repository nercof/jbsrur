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
            var filtered = [];
            var value_search = removeEspecialChar(query_search).toLowerCase();

            var obj = {
                "operation_types": [],//_.keys(vm.operation_types),
                "property_types": [],//_.keys(vm.property_types),
                "suite_amount": [],//_.keys(vm.suite_amount),
                "current_localization_id": [],//_.keys(vm.localization_barrio_id)
            }

            console.log("Custom filter: << all_prop >>");
            console.log(all_prop);

            console.log("Custom filter: << query_search >>");
            console.log(query_search);

            console.log("Custom filter: << value_search >>");
            console.log(value_search);

            console.log("Custom filter: << vm >>");
            console.log(vm);

            isOperationTypes(value_search, vm);
            isProperty_types(value_search, vm.property_types);
            isNeighborhood(value_search, vm.current_localization_id);

            return filtered;
        }

        /**
        * tokkoController.tokko_data.tp:Resource
        * @param: value_search:
        * @param: operation_types
        */
        function isProperty_types(value_search, property_types){
            console.log("Custom filter: << isProperty_types() >>");
        }

        /**
        * tokkoController.barriosXzona:Resource
        * @param: value_search:
        * @param: operation_types
        */
        function isNeighborhood(value_search, current_localization_id){
            console.log("Custom filter: << isNeighborhood() >>");
        }

        /**
        * tokkoController.tokko_data.op:Resource
        * @param: value_search:
        * @param: operation_types
        */
        function isOperationTypes(value_search, tokkoController){
            console.log("Custom filter: << isOperationTypes() >>");
            console.log(tokkoController);

            if (!_.isEmpty(value_search)) {
                if (value_search == "alquiler") {
                    operation_types.push(1);
                } else if (value_search == "venta") {
                    operation_types.push(2);
                }
            }
        }

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
