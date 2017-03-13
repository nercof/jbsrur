(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('tokkoController', tokkoController);

    function tokkoController($scope, tokkoFactory, tokkoService, NgMap,
        resourceFactory, $state, $localStorage, $filter) {

            console.log('Load tokko.controller.js');
            var vm = this;
            vm.titleForm = "Encuentre su propiedad:";

            //variables para el localStorage
            $scope.$storage = $localStorage;
            vm.prop_cache = $localStorage.prop_cache; // todas las propiedades
            vm.prop_search = $localStorage.prop_search; //ultima búsqueda

            //inicio variables Buscador Avanzado
            vm.barriosXzona = {}; // JSON con los barrios y zonas
            vm.barrios = []; // JSON con barrios
            vm.camposForm = {}; //JSON con la configuracion de los campos de tokko para el form

            // modelos de los campos del form
            vm.property_types = [];
            vm.operation_types = [];
            vm.suite_amount = [];
            vm.current_localization_id = [];
            vm.localization_barrio_id = [];
            //fin variables Buscador Avanzado

            //inicio variables Buscador Predictivo
            vm.predictiveResult = []; //resultado del buscador, se llena en el filter save_model
            vm.propsPredictive= [];// propiedades con los campos seleccionados para el buscador predictivo       

            activate(vm);

            function activate(vm) {

                // traer todas las propiedades
                tokkoFactory.getPropertyByCity().then(function(response) {
                    vm.prop_cache = response.objects;
                    console.log("@PROP.CACHE BY CITY");
                    console.log(vm.prop_cache);

                    // parsear tipos de operaciones
                    parseOperationTypes(vm.prop_cache);

                    //guardar en localStorage
                    $scope.$storage = $localStorage.$default({
                        prop_cache: vm.prop_cache,
                    });

                    // hacer una copia de todas las propiedades con los campos para la busqueda predictiva
                    _.each(vm.prop_cache, function (prop) {
                        var campos = _.pick(prop, 'id', 'address',
                        'description', 'fake_address', 'publication_title',
                        'type', 'operations_types', 'location');
                        campos.type = campos.type.name;
                        campos.barrio = campos.location.name;
                        vm.propsPredictive.push(campos);
                    });

                    //  get barrios de Córdoba y zonas
                    vm.barriosXzona = resourceFactory.query({id: 'barrios_cba.json'},
                        function(data){
                            vm.barrios = data.to.barrios; //todos los barrios sin zonas
                            // Parsear barrio y zona
                            vm.prop_cache = parseLocation();
                            console.log('parsed', vm.prop_cache)
                    });

                });

                // get config para armar los campos del Advanced Search
                vm.camposForm = resourceFactory.query({id: 'tokko.data.json'});

            }// Fin activate

            /**
            * searchLocation() permite obtener las propiedades
            * asociadas al id pasado por referencia.
            *
            * Para Tokko ese valor es current_localization_id.
            */
            vm.searchLocation = function() {
                tokkoFactory.getLocation(this.ciudad.id).then(function(response) {
                    vm.tokko_location = response.divisions;
                });
            }

            /**
            * onSelect() evento que se llama al seleccionar
            * una propiedad en el buscador predictivo
            */
            vm.onSelect = function(item) {
                $state.go('propiedades.detalle', { id: item.id });
            }

            vm.openTab = function(id) {
              angular.element('#searchForm .tab-pane').removeClass('active');
              angular.element('#searchForm ' + id).addClass('active');
            };

            /**
            * searchFilter() metodo que se llama al hacer click en el botón Buscar
            * del buscador predictivo
            */
            vm.searchFilter = function (){
                vm.prop_search = vm.predictiveResult;
                saveCache();
                goToResultPage();
            }

            /**
            * searchTokko() metodo que se llama al hacer click en el botón Buscar
            * del avancedSearch
            */

            vm.searchTokko = function() {           
                // Variable para contener los id de barrio a excluir
                var barriosOzonas = [];

                // Si no tenemos valores en vm.localization_barrio_id es
                // porque el usuario solo selecciona Zona sin excluir Barrio
                if (_.isEmpty(_.keys(vm.localization_barrio_id)) && vm.zona) {
                    _.each(vm.zona.barrios, function (barrio){
                        barriosOzonas.push(barrio.id);
                    });
                }
                else {
                    barriosOzonas = _.keys(vm.localization_barrio_id);
                }

                // Parameters by user
                var filtros = {
                    "operation_types": _.keys(vm.operation_types),
                    "property_types": _.keys(vm.property_types),
                    "suite_amount": _.keys(vm.suite_amount),
                    "current_localization_id": barriosOzonas,
                }
                
                // Borramos resultado previo.
                vm.prop_search = filtrarPropiedades(vm.prop_cache, filtros);
                console.log('goto',vm.prop_search);
                
                saveCache();
                goToResultPage(); 
            }

            /**
            * seleccionarBarrio() selecciona automáticamente el barrio
            * cuando la zona tiene un solo barrio
            * @zona: object. objeto zona.
            */
            vm.seleccionarBarrio = function (zona){
                // Permite centralizar la selección de {n} barrios por zona.
                vm.zona = zona;

                // Inicializamos la lista de barrios a seleccionar.
                vm.localization_barrio_id = [];
                if(zona.unBarrio) {
                    angular.element('.conteiner-barrios .' + zona.barrios[0].id + ' input').trigger('click').attr('checked',true);
                }
            }

            /**
            * Formatear zona y barrios
            *
            * @param {}
            */
            function parseLocation() {
                var objBarrio = {};
                var propSinBarrio = [];

                _.each(vm.prop_cache, function (propiedad) {
                    objBarrio = _.find(vm.barrios, function (barrio) {
                        return barrio.name == propiedad.location.name;
                    });

                    if (_.isEmpty(objBarrio)) {
                        propSinBarrio.push({id: propiedad.id, barrio: propiedad.barrio});
                        propiedad.zona = false;
                        propiedad.barrio = false;
                    }
                    else if (objBarrio.zona == propiedad.location.name) {
                        propiedad.zona = false;
                    }
                    else {
                        propiedad.zona = objBarrio.zona;
                        propiedad.barrio = objBarrio.name;
                    }
                });
                console.log('prop sin barrio', propSinBarrio);
                return vm.prop_cache;
            }

            /**
            * Formatear operation types ejemplo
            * "operationsParsed":["Rent", "Sales"]
            */
            function parseOperationTypes(allprops) {
                // Por cada propiedad
                _.each(allprops, function(prop) {
                    prop.operationsParsed = []; //array de operaciones
                    prop.operations_types = ""; //string de operciones

                    _.each(prop.operations, function (operation) {
                        prop.operationsParsed.push(operation.operation_type);
                        prop.operations_types += operation.operation_type + ' ';
                    });
                });
            }

            function saveCache() {
                //guardar en localStorage
                $scope.$storage = $localStorage.$default({
                    prop_cache: vm.prop_cache,
                    prop_search: vm.prop_search
                });
                $scope.$storage.$apply();
            }

            function goToResultPage(){
                $state.go('propiedades', {
                    allProps: vm.prop_cache, 
                    lastSearch: vm.prop_search, 
                    isSearch: true
                });
            } 

            function filtrarPropiedades(allProps, filters) {
                var filterProps = [];

                if (!_.isEmpty(allProps) && !_.isEmpty(filters)) {

                    // filtrar por tipo de Operacion
                    filterProps = filterOperationTypes(allProps, filters.operation_types);
                    // filtrar por tipo de propiedad
                    filterProps = filterPropertyTypes(filterProps, filters.property_types);
                    // filtrar por dormitorios: suite_amount
                    filterProps = filterSuiteAmount(filterProps, filters.suite_amount);
                    // filtrar por zonas-barrios
                    filterProps = filterCurrentLocationId(filterProps, filters.current_localization_id);

                    console.log(filterProps, 'filtrar prop');
                    return filterProps;
                }
            } // fin filtrarPropiedades()

            /**
             * Filtrar propiedades por id de Location.
             *
             * Si pCurrentLocalizationId [0] indica <Todos> por lo cual no filtramos.
             *
             * @param {Object} pListaPropiedades: Propiedades a filtrar
             * @param {Object} pCurrentLocalizationId: Barrios seleccionados x user.
             */
            function filterCurrentLocationId(allProps, id) {
                // Zona/Barrio: 0: Todos
                if (_.isEmpty(id) ||
                    _.contains(_.values(id), "0")) {
                    // Si el current_localization_id es {0: Todos} NO FILTRAR.
                    return allProps;
                }
                else {
                    var filtrado = [];
                    filtrado = _.filter(allProps, function(prop) {
                        return _.some(_.values(id), function(location) {
                            return prop.location.id == location;
                        });
                    });
                    return filtrado;
                }
            }

            /**
             * Filtrar propiedades por cantidad de dormitorios.
             *
             * Si pSuiteAmount [0] indica <Todos> por lo cual no filtramos.
             *
             * @param {Object} pListaPropiedades: Propiedades a filtrar
             * @param {Object} pSuiteAmount: Dormitorios seleccionados x user.
             */
            function filterSuiteAmount(allProps, id) {

                // Si el suite_amount es {0: Todos} NO FILTRAR.
                if (_.isEmpty(id) ||
                    _.contains(_.values(id), "0")) {
                    return allProps;
                }
                else {
                    var filtrado = [];
                    filtrado = _.filter(allProps, function(prop) {
                        return _.some(_.values(id), function(pdorm) {
                            return prop.suite_amount == pdorm;
                        });
                    });
                    return filtrado;
                }
            }

            /**
             * Filtrar propiedades por tipo de propiedad.
             * {Todos | Terreno | Departamento | Casa | Oficina  | Local | Campo}
             *
             * Si pPropertyTypes [0] indica <Todas> por lo cual no filtramos.
             *
             * @param {Object} pListaPropiedades: Propiedades a filtrar
             * @param {Object} pPropertyTypes: Tipos de propiedad seleccionadas x user.
             */
            function filterPropertyTypes(allProps, id) {
                // Si el tipo_propiedad es {0: Todos} NO FILTRAR.
                if (_.isEmpty(id) ||
                    _.contains(_.values(id), "0")) {
                    return allProps;
                }
                else {
                    var filtrado = [];
                    // Se filtra por los tipos seleccionados
                    filtrado = _.filter(allProps, function(prop) {
                        return _.some(_.values(id), function(ptype) {
                            return prop.type.id == ptype;
                        });
                    });

                    return filtrado;
                }

            }

            /**
             * Filtrar propiedades por tipo de operacion {Venta|Alquiler}.
             *
             * Si pOperationTypes [0] indica <Todas> por lo cual no filtramos.
             *
             * @param {Object} pListaPropiedades: Propiedades a filtrar
             * @param {Object} pOperationTypes: Tipos de operacion seleccionadas x user.
             */
            function filterOperationTypes(allProps, id) {

                // Caso 1.1: Filtrar por tipo de Operacion ()
                if (_.isEmpty(id) || id.length == 2) {
                    // Tipo de Operacion: 0,2: Todos/Ambos
                    // Caso 1.1: Filtrar por tipo de Operacion (Todos)
                    return allProps;
                }
                else if (id.length == 1) {
                    var type;
                    var filtrado = [];

                    // Parseamos el tipo de operacion
                    if (_.values(id) == 1) {
                        type = "Venta";
                    }
                    else {
                        type = "Alquiler";
                    }

                    // Filtramos por tipo de Operacion
                    filtrado = _.filter(allProps, function(prop) {
                        return _.some(prop.operations, function(oper) {
                            return oper.operation_type == type;
                        });
                    });

                    return filtrado;
                }
            }
        }; // Cierre tokkoController
    }());
