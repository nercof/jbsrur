(function() {
    'use strict';

    angular
        .module('app.core')
        .filter('cf_tokko', filter);

    function filter() {
        return filterFilter

        function filterFilter(all_prop, i_query) {
            // Declaracion de variables
            var keys_word, prop_filtered = [];
            var full_text = "";
            var all_prop_copy = all_prop;

            if (i_query) {


            // Valores a filtrar separados por espacio
            var keys_word = i_query.split(' ');
            _.each(keys_word, function(word){
                word.toLowerCase();
            })

            // Filtrado
            _.each(all_prop, function(prop, key) {

                full_text = prop.fake_address   + ' ' +
                            prop.operations[0].operation_type + ' ' + // "Alquiler"
                            prop.location.full_location + ' ' + // "Argentina | Cordoba | Capital | Cordoba | Alta Cordoba"
                            prop.type.name; // Local

                _.each(keys_word, function(words) {
                    // Consultamos
                    if (full_text.indexOf(words)) {
                        prop_filtered.push(prop);
                    }
                    else{
                        // Borramos para ir achicando la busqueda
                        //delete all_prop[key];
                    }
                })
            });

            return prop_filtered;
            }
        }
    }
})();
