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
        //console.log("Custom filter: << i_query >>");

        /**
        * vm.prop_search = properties filtered
        *
        * @param: all_prop: All properties in localStorage.prop_cache{}
        * @param: query_search: input data from user views
        */
        return function( all_prop, query_search, vm) {
            // Var for test
            var filtered = [];
            filtered = all_prop;

            // var words separate by space
            var value_search = [];
            var words = [];

            words = removeEspecialChar(query_search).toLowerCase();
            var isSpace = (words[words.length - 1] === ' ')?true:false;

            value_search = words.split(/(\s+)/).filter(
                function(e) { return e.trim().length > 0; }
            );

            // activate object operation_types if correspond
            isOperationTypes(value_search, vm, all_prop, filtered);

            // activate object property_types with if correspond
            isProperty_types(value_search, vm);

            // activate object current_localization_id if correspond
            if (isSpace && value_search.length > 1) {
                isNeighborhood(value_search, vm);
                var cadena = "";

                filtered = _.filter(
                    all_prop,
                    function (prop) {
                        console.log(prop);
                        console.log(vm.property_types);
                        console.log(_.contains(_.pluck(vm.property_types,  'id'), prop.type.id.toString()));

                        cadena = cadena +   prop.address +
                                            prop.description +
                                            prop.fake_address +
                                            prop.publication_title.
                        return (
                            // @FIXME:
                            _.contains(_.pluck(vm.current_localization_id, 'id'), prop.location.id.toString()) ||
                            _.contains(_.pluck(vm.operation_types, 'name'), prop.operations.operation_types) ||
                            _.contains(_.pluck(vm.property_types,  'id'), prop.type.id.toString()) ||
                            _.intersection(cadena, value_search).length === value_search.length
                        );
                    }
                );
                console.log("{<< filtered >>}")
                console.log(filtered);
            }



            return filtered;
        }

        /**
        * tokkoController.tokko_data.tp:Resource
        * @param: value_search:
        * @param: operation_types
        */
        function isProperty_types(value_search, pController, plist, pfilter){
            //console.log("Custom filter: << isProperty_types() >>");
            // Si el usuario ingresa param in the quieck search.
            console.log(plist);
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
            //console.log("Custom filter: << isNeighborhood() >>");
            var bname = [];
            // Si el usuario ingresa param in the quieck search.
            if (!_.isEmpty(value_search)){
                _.some(pController.barrios, function (barrio) {
                    bname = (barrio.name).toLowerCase();
                    bname = bname.split(" ");
                    if ( // operator === does not do type coercion,
                         // and thus does not convert the values when comparing.
                        _.intersection(bname, value_search).length === value_search.length &&
                        !_.contains(pController.current_localization_id, barrio)){
                        pController.current_localization_id.push(barrio);
                        console.log("{{{ ohm }}}");

                        // Cortamos el loop
                        return false;
                    }
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
