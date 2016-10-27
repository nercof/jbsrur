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
    .filter('cf_psearch', cf_psearch);

    function cf_psearch() {
        console.log("Custom filter: << cf_psearch >>");
        return filterProps;

        /**
        * vm.prop_search = properties filtered
        *
        * @param: all_prop: All properties in localStorage.prop_cache{}
        * @param: value_search: input data from user views
        * @param: vm: tokkoController (utilizar vm.universo)
        */
        function filterProps(all_prop, value_search, vm) {
            // Variables a utilizar.
            var filtered = [];      // Todas las propiedades.
            var query_search = [];  // Array de busqueda.
            var words = [];         // Array de palabras separadas por espacio.
            var filterUniverso = [];// Array de palabras claves con status true.

            // Asignamos
            filtered = all_prop;
            words = removeEspecialChar(value_search).toLowerCase();
            query_search = words.split(/(\s+)/).filter(
                function(e) { return e.trim().length > 0; }
            );

            // Recorremos las palabras ingresadas.
            _.each(query_search, function(word){
                // Setear a true la palabra conocida si corresponde.
                buscarEnUniverso(word, vm.universo, query_search.length);
            });

            console.log("buscarEnUniverso():");
            console.log(vm.universo);

            // Obtener el universo con palbras == true
            filterUniverso = getPalabrasBuscadas();


            // Aplicar filtros anteriores por cada palabra clave.
            _.each(filterUniverso, function(obj){
                if (obj.field == "property_types") {
                    filtered = _.filter(filtered, function(prop){
                        return _.contains(prop.operationsParsed, obj.word);
                    });
                }
            });

            return filtered;
        }

        /**
        * Setear en true la palabra del universo si es igual a word.
        * Setear en pending si falta parte de la palabra.
        *
        * @param: word: string de busqueda.
        * @param: universe: universo de palabras claves.
        * @param: querySearchLenght: length de la cadena de busqueda
        */
        function buscarEnUniverso(word, universe, querySearchLenght){
            _.each(universe, function(keyword){
                keyword.word = keyword.word.toLowerCase();
                if (keyword.word == word) {
                    // Si la palabra buscada es igual la keyword setear en true
                    keyword.status = "true";
                } else if ( keyword.word.toLowerCase().search(word) >= 0 &&
                            _.contains(keyword.word.split(/(\s+)/), word) 
                            ) {
                                    console.log('HOLAAA');
                                    console.log(keyword.word, word)
                                    console.log(keyword.pAnterior);
                                    // Si la palabra buscada se encuentra dentro de la keyword
                                    keyword.status = "pending";
                                    keyword.pAnterior = word;
                                    console.log('pending');
                                } else {
                                    console.log(keyword.word, word);
                                    console.log(keyword.word.search(word));
                                }
            }
        );
    }

    /**
    * return palabras del universo con status true.
    *
    */
    function getPalabrasBuscadas(params){
        var pBuscadas = [];
        // Reorro el universo formado.
        _.each(params, function(param){
            if (param.status == true) {
                pBuscadas.push(param);
            }
        });

        return pBuscadas;
    }

    /**
    * @param: query_search: input to replace
    */
    function removeEspecialChar(value_search){
        return value_search.replace(/á/g, 'a')
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
}
})();
