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
            console.log("Custom filter: << cf_psearch >>");
            // Variables a utilizar.
            var filtered = [];      // Todas las propiedades.
            var query_search = [];  // Array de busqueda.
            var words = [];         // Array de palabras separadas por espacio.
            var filterUniverso = [];// Array de palabras claves con status true.

            // Asignamos
            filtered = all_prop;
            words = removeEspecialChar(value_search).toLowerCase();
            value_search = words.split(/(\s+)/).filter(
                function(e) { return e.trim().length > 0; }
            );

            // Recorremos las palabras ingresadas.
            _.each(words, function(word){
                // Setear a true la palabra conocida si corresponde.
                buscarEnUniverso(word, vm.universo);
            });
            console.log("buscarEnUniverso():");
            console.log(vm.universo);

            // Obtener el universo con palbras == true
            filterUniverso = getPalabrasBuscadas();

            // Aplicar filtros anteriores por cada palabra clave.
            _.each(filterUniverso, function(obj){
                if (obj.field == "property_types") {
                    filtered = _.filter(filtered, function(prop){
                        // @FIXME: Pre-procesar en tokkoController prop.operations
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
        */
        function buscarEnUniverso(pWord, pUniverso){
            _.each(pUniverso, function(pPalabra){
                // Si la palabra es igual setear en true.       - Status true
                if (pPalabra.word == pWord) {
                    pPalabra.status = true;
                } else if (pPalabra.includes(pWord)) {
                    pPalabra.status = "pending";
                } else if (pPalabra.word.length > pWord.length) {
                    // Sino es igual consultamos si pertenece o no  - Status pending
                    pPalabra.status = "pending";
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
