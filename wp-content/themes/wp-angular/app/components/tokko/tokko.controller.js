(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('tokkoController', tokkoController);

    function tokkoController($scope, tokkoFactory, tokkoService, NgMap,
        resourceFactory, $state, $localStorage, $filter) {
            /**
            * @see: angular.extend
            *
            */
            console.log('Load tokko.controller.js');
            var vm = this;
            vm.titleForm = "Encuentre su propiedad:";
            // Re-modeling
            vm.codigoPropiedad = '';
            vm.barriosXzona = {};
            vm.tokko_data = {};
            vm.property_types = [];
            vm.operation_types = [];
            vm.suite_amount = [];
            vm.current_localization_id = [];
            vm.localization_barrio_id = [];
            vm.prop_cache = {};
            vm.prop_search = {};
            vm.search_query = '';

            /*
            * Permite cargar el mapa
            */
            NgMap.getMap().then(function(map) {
                //console.log('map', map);
                vm.map = map;
            });

            activate(vm);


            function activate(vm) {
                // Load repository local objects
                vm.tokko_data = resourceFactory.query({
                    id: 'tokko.data.json'
                });
                vm.barriosXzona = resourceFactory.query({
                    id: 'barrios_cba.json'
                });

                if ($localStorage.prop_cache &&
                    $localStorage.prop_cache.length > 0) {
                        vm.prop_cache = $localStorage.prop_cache;
                    }
                    else {

                        // 30864 - "full_location": "Argentina | Cordoba | Cordoba Capital ",
                        tokkoFactory.getPropertyByCity().then(function(response) {
                            vm.prop_cache = response.objects;
                            // Vamos a mandar la caché de propiedades al $storage
                            // prop_cache: Todas las propiedades de Córdoba y alrededores

                            $scope.$storage = $localStorage.$default({
                                prop_cache: vm.prop_cache,
                                prop_search: {},
                            });
                        })
                    }
                }// Fin activate

                /**
                * $watch('search_query') permite generar el two-data-binding
                * sobre el input search_query.
                *
                * vm.prop_search: Listado de propiedades filtradas.

                $scope.$watch('vm.search_query', function(val){
                    console.log("Pasandooooo.....");
                    if (!_.isEmpty(vm.prop_cache)) {
                        vm.prop_search = $filter('filter')(vm.prop_cache, val);
                    }
                });
*/
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
                * searchFilter() permite redireccionar el flujo al estado
                * propiedad con la lista de propiedades filtradas por la
                * funcion $watch.
                *
                * @data: null. Porque no hubo interaccion Advanced Search.
                */
                vm.searchFilter = function (){
                    // Re-direct to state propiedad
                    $state.go('propiedad', {
                        data: null, cache: vm.prop_search
                    });
                }

                /**
                * ignoreAccents()
                *
                * @data: item. User input on quircker search index.
                */
                vm.ignoreAccents = function(actual, expected) {
                    console.log("ESTOY ACA");
                    if (angular.isObject(actual)) return false;
                    function removeAccents(value) {
                        return value.toString()
                                    .replace(/á/g, 'a')
                                    .replace(/é/g, 'e')
                                    .replace(/í/g, 'i')
                                    .replace(/ó/g, 'o')
                                    .replace(/ú/g, 'u')
                                    .replace(/ñ/g, 'n')
                                    .replace(/á/g, 'a')
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
                                    .replace(/ß/g, 's');
                    }
                    actual = removeAccents(angular.lowercase('' + actual));
                    expected = removeAccents(angular.lowercase('' + expected));

                    return actual.indexOf(expected) !== -1;
                }


                /**
                * searchTokko() permite redireccionar el flujo al estado
                * propiedad con la lista de filtros seleccionados en Advanced
                * Search input.
                *
                * @data: Filtros de exclusion.
                * @cache: Propiedades en el localStorage
                */
                vm.searchTokko = function() {
                    // Codigo TOKKO: xej: 37588; 152749, 235422
                    if (vm.codigoPropiedad != '') {
                        tokkoFactory.getProperty(vm.codigoPropiedad).then(function(response) {
                            vm.propiedad = response;
                            vm.propiedades = vm.propiedad;
                        });
                    }
                    else {
                        // Parameters by user
                        var obj = {
                            "operation_types": _.keys(vm.operation_types),
                            "property_types": _.keys(vm.property_types),
                            "suite_amount": _.keys(vm.suite_amount),
                            "current_localization_id": _.keys(vm.localization_barrio_id)
                        }

                        // Re-direct to state propiedad
                        $state.go('propiedad', {
                            data: obj,
                            cache: vm.prop_cache
                        });
                    }
                }
            }; // Cierre tokkoController
        }());
