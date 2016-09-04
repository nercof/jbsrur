(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('tokkoController', tokkoController);

    function tokkoController($scope, tokkoFactory, tokkoService, NgMap, resourceFactory, $stateParams, $state) {
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

        NgMap.getMap().then(function(map) {
            //console.log('map', map);
            vm.map = map;
        });

        activate(vm);
        function activate(vm) {
            // https://gist.github.com/aaronksaunders/bb8416da6a829ea2fb77
            vm.tokko_data = resourceFactory.query({id:'tokko.data.json'});
            console.log(vm.tokko_data);
            vm.barriosXzona = resourceFactory.query({id:'barrios_cba.json'});

            console.log(vm.barriosXzona);

            console.log('keys barriosXzona');
            console.log(_.keys(vm.barriosXzona));

            // e = elemento
            // i = index
            _.each(vm.tokko_data, function(e, i){
                console.log(_.keys(e));
            });

        }

        vm.searchLocation = function() {
            tokkoFactory.getLocation(this.ciudad.id).then(function(response) {
                vm.tokko_location = response.divisions;
            });
        }

        // Get barrio by ID
        vm.getBarrioById = function (id){
            console.log(id);

            vm.localization_barrio_id = vm.tokko_data.getElementById('id');

            console.log(vm.localization_barrio_id);
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
                var data = {
                    "operation_types":[],
                    "property_types":[],
                    "suite_amount":[],
                    "vm.current_localization_id":[]
                }
                console.log('- 1 - vm.property_types');
                console.log(vm.property_types);

                console.log(vm.tokko_data.tipos_propiedad)
                console.log('- 2 - vm.operation_types');
                console.log(vm.operation_types);
                console.log('- 3 - vm.suite_amount');
                console.log(vm.suite_amount);
                console.log('- 4 - vm.current_localization_id');
                console.log(vm.current_localization_id);
                console.log('- 5 - vm.localization_barrio_id');
                console.log(vm.localization_barrio_id);



                // Formar data

                tokkoFactory.getProperties('').then(function(response) {
                    vm.propiedades = response;
                    $state.go('tokko-result', {data: 'Hola'});
                });
            }
        }
    };// Cierre tokkoController
}());
