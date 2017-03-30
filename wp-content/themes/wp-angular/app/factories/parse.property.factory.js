'use strict';;
(function() {
    angular
        .module('app.factories')
        .factory('parsePropertyFactory', parseProperty);

    function parseProperty(tokkoService, resourceFactory) {

        var data = {
            'parseAttPropsAdvancedSearch': parseAttPropsAdvancedSearch,
            'parseAttPropsPredictiveSearch': parseAttPropsPredictiveSearch,
            'parseAllProperties': parseAllProperties,
            'parseOperationTypes': parseOperationTypes,
            'parseLocation': parseLocation,
            'filtrarPorOperacion': filtrarPorOperacion 
        }

        /**
         * Permite centralizar el parseo de propiedades. <<Rutina Guia>>
         *  - parseOperationType()
         *  - parseLocation()
         *  - parseAdvancedSearchField()
         *  - parsePredectiveField()
         * 
         * @allProp: object.json completo de propiedades desde API Tokko.
         * @prop_cache: array. todas las propiedades Advanced Search.
         * @prop_predi: array. todas las propiedades Predictive Search.
         * @barrios: object.json completo de barrios de cordoba.
         */
        function parseAllProperties(allProps, prop_cache, prop_predi, barrios, prop_ventas, prop_alquil) {
            

            // Hacer una copia de todas las propiedades con los campos para la busqueda predictiva
            _.each(allProps, function (propiedad) {
                // Parsear objeto propiedad - Advanced search
                propiedad = parseAttPropsAdvancedSearch(propiedad);
                parseOperationTypes(propiedad, prop_ventas, prop_alquil);
                parseLocation(propiedad, barrios); // Parsear barrio y zona

                prop_cache.push(propiedad);

                // Parsear objeto propiedad - Predictive search
                // Hacer una copia de todas las propiedades con los campos para la busqueda predictiva
                prop_predi.push(parseAttPropsPredictiveSearch(propiedad));

            });
        }

        /**
         * Permite obtener solamente los atributos necesarios del param
         * 
         * @propiedad: object. objeto propiedad
         */
        function parseAttPropsPredictiveSearch(propiedad) {
            // Buscador global
            var propsPredictive =  _.pick(propiedad, 'id', 'address',
                        'description', 'fake_address', 'publication_title',
                        'type', 'operations_types', 'location'); 
            propsPredictive.type = propsPredictive.type.name;
            propsPredictive.barrio = propsPredictive.location.name;
            return  propsPredictive;          
        }

        /**
         * Formatear zona y barrios
         *
         * @param {}
         */
        function parseLocation(propiedad, barrios) {
            var objBarrio = {};
            var propSinBarrio = [];

            objBarrio = _.find(barrios, function (barrio) {
                return barrio.name.toLowerCase() == propiedad.location.name.toLowerCase();
            });

            // Caso: Barrio mal cargado desde API-Tokko
            if (_.isEmpty(objBarrio)) {
                propiedad.zona = false;
                propiedad.barrio = propiedad.location.name; // Le ponemos el barrio de la propiedad.
                propSinBarrio.push({id: propiedad.id, barrio: propiedad.barrio});
            }
            // Caso: Zona: Nva. Córdoba = Barrio :> Nva. Córdoba
            else if (objBarrio.zona.toLowerCase() == propiedad.location.name.toLowerCase()) {
                propiedad.zona = false;
                propiedad.barrio = objBarrio.name;
            }
            else {
                propiedad.zona = objBarrio.zona;
                propiedad.barrio = objBarrio.name;
            }

        }

        /**
         * Permite obtener solamente los atributos necesarios del param
         * 
         * @propiedad: object. objeto propiedad
         */
        function parseAttPropsAdvancedSearch(propiedad) {
            // Buscador global
            return  _.pick(propiedad, 'id', 'address',
                'description', 'fake_address', 'publication_title',
                'type', 'operations_types', 'location', 'tags', 
                'suite_amount', 'type', 'operations', 'photos');            
        }

        /**
         * Formatear operation types ejemplo
         * "operationsParsed":["Rent", "Sales"]
         */
        function parseOperationTypes(propiedad, prop_ventas, prop_alquil) {
            propiedad.operationsParsed = []; //array de operaciones
            propiedad.operations_types = ""; //string de operciones

            // Una propiedad puede tener {n} operaciones 
            _.each(propiedad.operations, function (operation) {
                propiedad.operationsParsed.push(operation.operation_type);
                
                // Consultamos que tabla completar.
                if (operation.operation_type == "Venta") {
                    prop_ventas.push(propiedad);
                } else {
                    prop_alquil.push(propiedad);
                }

                propiedad.operations_types += operation.operation_type + ' ';
            });           
        }

        function filtrarPorOperacion(allProps, type) {
            // body...
            return _.filter(allProps , function(prop) {
                return _.some(prop.operations, function(oper) {
                    return oper.operation_type == type;
                    });
            });
        }
        
        return data;
    }
}());
