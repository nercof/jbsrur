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
            vm.barrios = [];

            /*
            * Permite cargar el mapa
            */
            NgMap.getMap().then(function(map) { vm.map = map;});

            activate(vm);
            //getBarriosXZonaArray(vm);

            function activate(vm) {
                // Load repository local objects
                vm.tokko_data = resourceFactory.query({id: 'tokko.data.json'});

                vm.barriosXzona = resourceFactory.query({id: 'barrios_cba.json'},
                function(data){
                    vm.barrios = data.to.barrios;
                });

                if ($localStorage.prop_cache && $localStorage.prop_cache.length > 0) {
                    vm.prop_cache = $localStorage.prop_cache;
                    vm.prop_search = vm.prop_cache;
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
                    });
                }
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
            * searchFilter() permite redireccionar el flujo al estado
            * propiedad con la lista de propiedades filtradas por la
            * funcion $watch.
            *
            * @data: null. Porque no hubo interaccion Advanced Search.
            */
            vm.searchFilter = function (){
                console.log("Quick search filter: << tokkoController() >>");
                // Re-direct to state propiedad

                // Parameters by user
                console.log(vm);

                var obj = {
                    "operation_types": _.pluck(vm.operation_types, 'id'),
                    "property_types": _.pluck(vm.property_types, 'id'),
                    "suite_amount": _.pluck(vm.suite_amount, 'id'),
                    "current_localization_id": _.pluck(vm.current_localization_id, 'id')
                }
                console.log("Quick search filter: << obj >>");
                console.log(obj);

                $state.go('propiedad', {
                    data: obj, cache: vm.prop_cache
                });
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

                    console.log("Custom filter: << tokkoController() >>");
                    // Parameters by user
                    var obj = {
                        "operation_types": _.keys(vm.operation_types),
                        "property_types": _.keys(vm.property_types),
                        "suite_amount": _.keys(vm.suite_amount),
                        "current_localization_id": _.keys(vm.localization_barrio_id)
                    }

                    $state.go('propiedad', {
                        data: obj, cache: vm.prop_cache
                    });
                }
            }
            /**
            * seleccionarBarrio() selecciona automáticamente el barrio
            * cuando la zona tiene un solo barrio
            * @zona: object. objeto zona.
            */
            vm.seleccionarBarrio = function (zona){
                vm.localization_barrio_id = [];
                if(zona.unBarrio) {
                    angular.element('.conteiner-barrios .' + zona.barrios[0].id + ' input').trigger('click').attr('checked',true);
                }
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
        }; // Cierre tokkoController
    }());
