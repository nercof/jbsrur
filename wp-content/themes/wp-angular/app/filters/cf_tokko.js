(function() {
    'use strict';
    /**
    * cf_tokko: Custom filter.
    *  - @view: tokko-search-input
    */
    angular
    .module('app.core')
    .filter('cf_tokko', function() {
        console.log("Custom filter: << i_query >>");
        /**
        * @param: all_prop: All properties in localStorage.prop_cache{}
        * @param: query_search: input data from user views
        */
        return function( all_prop, query_search) {
            var filtered = [];

            console.log("Custom filter: << all_prop >>");
            console.log(all_prop);

            console.log("Custom filter: << query_search >>");
            console.log(query_search);

            return filtered;
        }
    });
})();
