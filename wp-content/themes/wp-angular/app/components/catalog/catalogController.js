(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('catalogController', catalogController);

    /**
     * catalogController: Gestión sobre el listado de propiedades en tokko.
     *  - @view: tokko-search-result
     */
    function catalogController($scope, tokkoFactory, tokkoService, NgMap,
        resourceFactory, $stateParams, $state, $localStorage, STATE, TYPE,
        $breadcrumb) {
        console.log('<< Loading catalogController >>');
        var vm = this;

        vm.title_view = '';
        vm.barriosXzona = {};
        vm.allProperties = {};
        vm.allPropertiesWFilter = {};

        // Read and Write
        $scope.$storage = $localStorage;

        // Filtros auxiliares parte UI
        vm.sortType = 'zona';
        vm.property_types = [];
        vm.suite_amount = [];
        vm.zonas = [];
        vm.attEspeciales = [];
        vm.propSinAttEspeciales = [];

        // Filtros auxiliares pare BE selection UI
        vm.property_types_selected = [];
        vm.suite_amount_selected = [];
        vm.zonas_selected = [];
        vm.attEspeciales_selected = [];

        // Empleadas para la paginacion de propiedades.
        vm.totalItems = false;
        vm.currentPage = 1;
        vm.itemsPerPage = 16;
        vm.properties = [];

        // Controla el estado de la consulta.
        vm.error = false;
        vm.spinner = true;

        vm.tabsContacto = [{
            "titulo": "Telefono",
            "href": "tel:+543514608800",
            "text": "(0351) 4608800",
            "type": "tel",
            "icon": "typcn typcn-phone-outline"
        }, {
            "titulo": "Correo",
            "href": "mailto:centro@jbsrur.com.ar",
            "text": "centro@jbsrur.com.ar",
            "type": "email",
            "icon": "typcn typcn-mail"
        }, {
            "titulo": "Ver Más",
            "href": "#",
            "type": "link",
            "icon": "typcn typcn-plus",
            "isLink": true
        }];

        // Activamos
        activate(vm, STATE, TYPE);

        /**
         * activate():
         *
         * << @Comment >>
         */
        function activate(vm, STATE, TYPE) {
            // Título de la vista
            vm.title_view = $stateParams.title_view;

            // Filtramos por tipo de Operacion
            vm.allProperties = _.filter($localStorage.prop_cache, function(prop) {
                return _.some(prop.operations, function(oper) {
                    return oper.operation_type == $stateParams.type;
                });
            });

            if ($stateParams.type == TYPE.AL) {
                vm.currentParentState = STATE.AL;
            } else {
                vm.currentParentState = STATE.VE;
            }
            // Setear vm.currentParentState in all properties
            setParentState();

            // Verificamos si corresponde colocar el spinner
            if (_.isEmpty(vm.allProperties)) {
                vm.error = true;
            }

            // Parsear ruta resultado: Zona + Barrio en vez de full_location
            parseLocation();

            // Create common objet for internal filter
            // { property_types | suite_amount | localization_barrio_id }
            createCommonObjectFilter();

            // Variables auxiliares para el paginador.
            vm.totalItems = vm.allProperties.length;
            vm.spinner = false;

            // Iniciamos las propiedades filtradas para la paginacion inicial.
            vm.properties = vm.allProperties.slice(0 * vm.itemsPerPage, 1 * vm.itemsPerPage);

            // Almacenamos el resultado de la búsqueda.
            $scope.$storage.prop_search = vm.properties;

        } // fin activate()

        /**
         * Overwrite parentState for all properties
         */
         function setParentState(){
             // Recorro las propiedades del catalogo
            _.each(vm.allProperties, function(propiedad) {
                propiedad.parentState = vm.currentParentState;
            });
         }

        /**
         * Permite generar los objetos auxiliares para filtrar el resultado
         * desde el catalogo resultado por los campos:
         *
         * { property_types | suite_amount | localization_barrio_id }
         *
         * @param {}
         */
        function createCommonObjectFilter() {

            // Recorro las propiedades del catalogo
            _.each(vm.allProperties, function(propiedad) {
                // Tipos de Propiedad
                if (!_.where(vm.property_types, {
                        'id': propiedad.type.id
                    }).length) {
                    vm.property_types.push({
                        id: propiedad.type.id,
                        name: tokkoFactory.getNamePropertyTypes(propiedad.type.id)
                    });
                }

                // Dormitorios
                if (!_.where(vm.suite_amount, {
                        'id': propiedad.suite_amount
                    }).length) {
                    vm.suite_amount.push({
                        id: propiedad.suite_amount,
                        name: tokkoFactory.getNameDormitorios(propiedad.suite_amount)
                    });
                }

                // Zonas
                if (!_.contains(vm.zonas, propiedad.zona)) {
                    vm.zonas.push(propiedad.zona);
                }

                // Atributos Especiales { Baño | patio | cochera | ...}
                // Revisar: { bathroom_amount:n | expenses | orientation | roofed_surface }
                // tags = { Patio | Balcón | Lavadero | Parrilla }
                if(_.isEmpty(propiedad.tags)){
                    vm.propSinAttEspeciales.push(propiedad);
                }
                else {
                    // Recorremos los atributos especiales para no incorporar repetidos
                    _.each(propiedad.tags, function(attEspecial){
                        if(!_.where(vm.attEspeciales, {'id': attEspecial.id}).length){
                            vm.attEspeciales.push(attEspecial);
                        }
                    });
                }
            });
        }

        /**
         * F(x) que permite eliminar los filtros unchecked para que no quede el
         * arreglo de la forma [2: false, 3: true] y siempre tengamos los true
         *
         */
        vm.unchecked = function(){
            console.log("unchecked()");
        }

        /**
         * Setea lista propiedades x pagina
         * El listado de propiedades depende del parametro page pasado.
         *
         * @param {int} page - Pagina actual
         */
        vm.getFilterData = function(page) {
            var obj = {
                "property_types_selected": _.pluck(vm.property_types_selected, 'id'),
                "suite_amount_selected": _.pluck(vm.suite_amount_selected, 'id')
                    //"current_localization_id": _.pluck(vm.current_localization_id, 'id')
            }

            console.log(_.keys(vm.property_types_selected));
            return _.filter(vm.properties, function(propiedad) {
                return _.some(_.keys(vm.property_types_selected), function(ptype) {
                        return propiedad.type.id == ptype;
                    });
                });

        }

        /**
         * Setea la direccion a mostrar en el catalogo
         *
         * @param {}
         */
        function parseLocation() {
            _.each(vm.allProperties, function(propiedad) {
                propiedad.direccion = propiedad.full_location;
            });
        }

        /**
         * Setea lista propiedades x pagina
         * El listado de propiedades depende del parametro page pasado.
         *
         * @param {int} page - Pagina actual
         */
        vm.setPagingData = function(page) {
            vm.properties = vm.allProperties.slice((page - 1) * vm.itemsPerPage, page * vm.itemsPerPage);
        }

        /**
         * Funcion guia para cambiar la pagina seleccionada.
         *
         */
        vm.pageChanged = function() {
            vm.setPagingData(vm.currentPage);
        }
    } // Fin controller
})();
