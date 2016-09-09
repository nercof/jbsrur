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

            // Valores a filtrar separados por espacio
            var keys_word = i_query.split(' ');
            _.each(keys_word, function(word){
                word.toLowerCase();
            })

            console.log('Custom filter (i_query, keys): ');
            console.log(i_query, keys_word);

            // Filtrado
            _.each(all_prop, function(prop) {
                // prop.description +
                console.log(prop);
                full_text = prop.fake_address   + ' ' +
                            prop.operations[0].operation_type + ' ' + // "Alquiler"
                            prop.location.full_location + ' ' + // "Argentina | Cordoba | Capital | Cordoba | Alta Cordoba"
                            prop.type.name; // Local

                console.log(full_text);

                _.each(keys_word, function(words) {
                    console.log('La palabra: ' + words );
                    console.log('esta en full_text: ' + full_text);
                    // Consultamos
                    if (full_text.indexOf(words)) {
                        prop_filtered.push(prop);
                    }
                })
            });

            return prop_filtered;
        }
    }
})();
