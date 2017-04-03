(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('tokkoResultController', tokkoResultController);

    /**
     * tokkoResultController: Gestión sobre el listado de propiedades en tokko.
     *  - @view: tokko-search-result
     */
    function tokkoResultController($scope, tokkoFactory, tokkoService, NgMap,
        resourceFactory, $stateParams, $state, $localStorage, STATE, TYPE) {

        var catalogo = this;

        $scope.$storage = $localStorage;

        // Filtros auxiliares parte UI
        catalogo.tiposProp = []; // Tipo de propiedad
        catalogo.suite_amount = [];
        catalogo.zonas = [];
        catalogo.attEspeciales = [];
        catalogo.attEspecialesHabilitados = [];

        // Models
        catalogo.spTypes = []; // Tipo de propiedad seleccionada
        catalogo.sDormit = []; // Cantidad de dormitorios
        catalogo.sZonas  = []; // Zonas
        catalogo.sAttEsp = []; // Atributos especiales
        catalogo.propSinAttEspeciales = [];

        catalogo.error = false;

        // Empleadas para la paginacion de propiedades.
        catalogo.totalItems = false;
        catalogo.currentPage = 1;
        catalogo.itemsPerPage = 16;

        // Activamos el controlador
        activate(catalogo, TYPE);

        /**
         * activate(): buscador de propiedades
         *  - predictive search: tokkoController.searchFilter()
         *    solo se muestra el listado de propiedades filtradas por el filtro
         *    predictivo ingresado por el usuario.
         *
         *  - advanced search:tokkoController.searchTokko()
         *    Muestra las propieades filtradas por el form
         *
         *  - refresh: muestra las ultimas propiedades filtradas, si el objeto está vacío
         *    muestra todas.
         */
        function activate(vm, opType) {
            // Parámetros de entrada
            catalogo.allProps = $stateParams.allProps;
            catalogo.lastSearch = $stateParams.lastSearch;
            catalogo.isSearch = $stateParams.isSearch;
            catalogo.type = $stateParams.type;

            //  get barrios de Córdoba y zonas
            if (_.isEmpty(catalogo.barriosXzona)){
                console.log('Cargando barriosXzona...');
                catalogo.barriosXzona = resourceFactory.query({id: 'barrios_cba.json'},
                        function(data){
                            catalogo.barrios = data.to.barrios; //todos los barrios sin zonas
                        });
            }else{
                catalogo.barrios = catalogo.barriosXzona.to.barrios;
            }

            if (!_.isEmpty(catalogo.lastSearch) && !_.isEmpty(catalogo.allProps) && !catalogo.type ) {
                // Objeto lleno y es /propiedades
                catalogo.propiedades = catalogo.lastSearch;
                setStateObjectFilterPaginationList();
            }
            else if (catalogo.isSearch) {
                // Objeto vacio y viene del buscador
                catalogo.error = "No se encontraron propiedades";
                console.log("No se encontraron propiedades");
            }
            else if (!catalogo.isSearch) {
                //objeto vacio (no viene del buscador) o alquiler ventas: buscar en cache
                catalogo.propiedades = (catalogo.type) ? [] : $scope.$storage.prop_search;

                if (_.isEmpty(catalogo.propiedades)) {
                    //objeto vacio y cache vacía: traer todas las propiedades
                    buscarPropiedadesTokkoAPIWithData().then(function(response) {
                        catalogo.propiedades = response;
                        parseLocation();
                        // Guardando en cache.
                        $localStorage.prop_search = catalogo.prop_search;

                        setStateObjectFilterPaginationList();
                        console.log(catalogo);
                    });
                }
                else {
                    // User press <F5> button.
                    if(catalogo.type) {
                        catalogo.propiedades = _.filter($scope.$storage.prop_cache , function(prop) {
                            return _.some(prop.operations, function(oper) {
                                return oper.operation_type == catalogo.type;
                            });
                        });
                    }
                    setStateObjectFilterPaginationList();
                }
            }
        }

        function parseLocation() {
            var objBarrio = {};
            var propSinBarrio = [];

            _.each(catalogo.propiedades, function (propiedad) {
                objBarrio = _.find(catalogo.barrios, function (barrio) {
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
            });
            //console.log('prop sin zona', propSinBarrio);
        }

        /**
         * Permite encapsular las funciones auxiliares necesarias
         * para el tratamiento de la ui.
         *  1. Set parent <state>.
         *  2. Crear objetos comunes para el filter interno.
         *  3. Crear objetos comunes para el paginador.
         */
        function setStateObjectFilterPaginationList() {
            setParentState();
            createCommonObjectFilter();

            // Variables auxiliares para el paginador.
            catalogo.totalItems = catalogo.propiedades.length;

            // Iniciamos las propiedades filtradas para la paginacion inicial.
            catalogo.properties = catalogo.propiedades.slice(0 * catalogo.itemsPerPage, 1 * catalogo.itemsPerPage);
        }

        catalogo.pageChanged = function() {
            catalogo.setPagingData(catalogo.currentPage);
            $location.hash('paginador');
            $anchorScroll();
        }

        /**
         * Permite generar los objetos auxiliares para filtrar el resultado
         * desde el catalogo resultado por los campos:
         *
         * { tiposProp | suite_amount | localization_barrio_id }
         *
         * @param {}
         */
        function createCommonObjectFilter() {
            // Inicializamos zonas a mostrar
            catalogo.zonas = [];

            // Recorro las propiedades del catalogo
            _.each(catalogo.propiedades, function(propiedad) {
                // Tipos de Propiedad
                /*if (!_.where(catalogo.tiposProp, {
                        'id': propiedad.type.id
                    }).length) {
                    catalogo.tiposProp.push({
                        id: propiedad.type.id,
                        name: tokkoFactory.getNamePropertyTypes(propiedad.type.id)
                    });
                }*/
                if (!_.contains(catalogo.tiposProp, propiedad.type.name)) {
                    catalogo.tiposProp.push(propiedad.type.name);
                }
                // Dormitorios
                if (!_.where(catalogo.suite_amount, {
                        'id': propiedad.suite_amount
                    }).length) {
                    var nombre = tokkoFactory.getNameDormitorios(propiedad.suite_amount);
                    if (propiedad.suite_amount > 0 && !_.isEqual(nombre, "Todos")) {
                        catalogo.suite_amount.push({
                            id: propiedad.suite_amount,
                            name: nombre
                        });

                    }
                }

                // Zonas: Si es Nueva Córdoba, poner el barrio. 
                if (!_.contains(catalogo.zonas, propiedad.zona) && propiedad.zona) {
                    catalogo.zonas.push(propiedad.zona);
                }
                else if (!_.contains(catalogo.zonas, propiedad.barrio) && 
                            propiedad.zona == false) {
                    catalogo.zonas.push(propiedad.barrio);
                }
                else{
                    //Propiedades sin zonas.
                    //console.log(propiedad);
                }

                // Atributos Especiales { Baño | patio | cochera | ...}
                // Para identificar las propiedades sin attEspeciales
                if (_.isEmpty(propiedad.tags)) {
                    catalogo.propSinAttEspeciales.push(propiedad);
                }
                else {
                    // Verificamos que los atributos en true esten en las prop.
                    catalogo.attEspeciales.push(propiedad.tags);
                }
            }); // Fin each
            
            
            createAttEspecialesObjectFilter();

            // Ordenamos
            catalogo.suite_amount = _.sortBy(catalogo.suite_amount, 'id');
            catalogo.zonas = _.sortBy(catalogo.zonas, 'name'); 
            console.log(catalogo.zonas);
            console.log(catalogo.tiposProp);
        }
        
        /**
         * 
         * 
         *
         */
        function createAttEspecialesObjectFilter() {
            console.log('creando filter att especiales');
            // Atributos Especiales { Baño | patio | cochera | ...}
            // tags = { Patio | Balcón | Lavadero | Terraza  }
            resourceFactory.query_array({
                    id: 'att-especiales-filtro.json'
                },
                function(data) {
                    catalogo.attEspecialesHabilitados = _.filter(data, function(attEspecial) {
                        return attEspecial.show == true;
                    });
                }).$promise.then(function(response) {

                // Sive para [[a, b], [c], [d]] -> [a,b,c,d]
                var allAtt = [].concat.apply([], catalogo.attEspeciales)

                // Verificar si el att pertenece a alguna propiedad
                catalogo.attEspeciales = _.filter(catalogo.attEspecialesHabilitados, function(attHabilitado) {
                    return _.some(allAtt, function(attProp) {
                        return attProp.id == attHabilitado.id;
                    });
                });
            }); // Fin .$promise.then(function(response) 
        }
        
        /**
         * Overwrite parentState for all properties
         */
        function setParentState() {
            // Recorro las propiedades del catalogo
            _.each(catalogo.propiedades, function(propiedad) {
                propiedad.parentState = 'propiedades';
            });
        }


        /**
         * Consultamos la API de Tokko para obtener todas propiedades
         *
         */
        function buscarPropiedadesTokkoAPIWithData() {
            // Call factory to search Tokko properties.
            return tokkoFactory.getPropertiesByCountry().$promise.then(function(response) {
                if(catalogo.type) {
                    return _.filter(response.objects, function(prop) {
                        return _.some(prop.operations, function(oper) {
                            return oper.operation_type == catalogo.type;
                        });
                    });
                } else {
                    return response.objects;
                }
                
            });
        }

        /**
         * Setea lista propiedades x pagina
         * El listado de propiedades depende del parametro page pasado.
         *
         * @param {int} page - Pagina actual
         */
        catalogo.setPagingData = function(page) {
            catalogo.properties = catalogo.propiedades.slice((page - 1) * catalogo.itemsPerPage, page * catalogo.itemsPerPage);
        }

    } // Fin controller
})();
