(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('tokkoController', tokkoController);

    function tokkoController($scope, tokkoFactory, tokkoService, NgMap, resourceFactory, $state) {
        /**
        * @see: angular.extend
        *
        */
        console.log('Load tokko.controller.js');
        var vm = this;
        vm.titleForm = "Encuentre su propiedad:";
        vm.tokko_state = {};
        vm.tokko_country = {};
        vm.tokko_prices = [];
        vm.tokko_property_type = {};
        vm.tokko_development = {};
        vm.tokko_property_custom_tags = {};
        vm.tokko_operaciones = [];
        vm.tokko_currency = [];
        vm.tokko_dormitorios = {};
        vm.tokko_location = {};
        vm.propiedades = {};
        // Re-modeling
        vm.codigoPropiedad = '';
        vm.barriosXzona = {};
        vm.tokko_data = {};
        vm.property_types = [];
        vm.operation_types = [];
        vm.suite_amount = [];
        vm.current_localization_id = [];
        vm.localization_barrio_id = [];
        vm.prop_cache = {}

        NgMap.getMap().then(function(map) {
            //console.log('map', map);
            vm.map = map;
        });

        activate(vm);
        function activate(vm) {
            // https://gist.github.com/aaronksaunders/bb8416da6a829ea2fb77
            vm.tokko_data = resourceFactory.query({id:'tokko.data.json'});
            vm.barriosXzona = resourceFactory.query({id:'barrios_cba.json'});

            // 30864 - "full_location": "Argentina | Cordoba | Cordoba Capital ",
            tokkoFactory.getPropertyByCity().then(function(response) {
                    vm.prop_cache = response.objects;
            });
        }

        vm.searchLocation = function() {
            tokkoFactory.getLocation(this.ciudad.id).then(function(response) {
                vm.tokko_location = response.divisions;
            });
        }

        // Get barrio by ID
        vm.getBarrioById = function (id){
            //vm.localization_barrio_id = vm.tokko_data.getElementById('id');

        }

        vm.searchTokko = function() {
            // Codigo TOKKO: xej: 37588; 152749, 235422
            if (vm.codigoPropiedad != '') {
                tokkoFactory.getProperty(vm.codigoPropiedad).then(function(response) {
                    vm.propiedad = response;
                    vm.propiedades = vm.propiedad;
                });
            }
            else {

                var obj = {
                    "operation_types": _.keys(vm.operation_types),
                    "property_types": _.keys(vm.property_types),
                    "suite_amount":_.keys(vm.suite_amount),
                    "current_localization_id":_.keys(vm.localization_barrio_id)
                }
                console.log(vm.prop_cache);
                // Formar data
                $state.go('tokko-result', {data: obj, cache: vm.prop});
            }
        }
    };// Cierre tokkoController
}());
