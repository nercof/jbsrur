(function() {
    'use strict';

    angular
        .module('app.core')
        .filter('cf_tokko', filter);

    function filter() {
        return filterFilter

        function filterFilter(prop) {
            // params: vm.prop_cache
            console.log('Custom filter');
            console.log('init prop: ');
            console.log(prop);
            console.log('fin prop: ');

            return prop;
        }
    }
})();
