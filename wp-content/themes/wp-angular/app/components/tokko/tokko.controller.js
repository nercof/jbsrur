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
            vm.prop_search = {}

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
                            // prop_result: Todas las propiedades excluidas por search

                            $scope.$storage = $localStorage.$default({
                                prop_cache: vm.prop_cache,
                                prop_search: {}
                            });
                        })
                    }
                }// Fin activate
                $scope.$watch('search_query', function(val)
                {
                    vm.prop_search = $filter('filter')(vm.prop_cache, val);

                });

                vm.searchLocation = function() {
                    tokkoFactory.getLocation(this.ciudad.id).then(function(response) {
                        vm.tokko_location = response.divisions;
                    });
                }

                // Get barrio by ID
                vm.getBarrioById = function(id) {}

                vm.searchFilter = function (){
                    // Re-direct to state propiedad
                    $state.go('propiedad', {
                        data: null,
                        cache: vm.prop_search
                    });

                }

                /**
                * description
                *
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
