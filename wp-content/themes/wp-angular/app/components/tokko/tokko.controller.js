(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('tokkoController', tokkoController);


    function tokkoController($scope, tokkoFactory, tokkoService, NgMap, resourceFactory) {
        /**
         * @see: angular.extend
         *
         */
        console.log('Load tokko.controller.js');
        var vm = this;
        vm.titleForm = "Encuentre su propiedad:";
        vm.titleFrame = "";
        vm.tokko_state = {};
        vm.tokko_country = {};
        vm.tokko_prices = [];
        vm.tokko_property_type = {};
        vm.tokko_development = {};
        vm.tokko_property_custom_tags = {};
        vm.tokko_operaciones = [];
        vm.tokko_currency = [];
        vm.tokko_dormitorios = [];
        vm.tokko_location = {};
        vm.propiedades = {};
        vm.codigoPropiedad = '';
        vm.barriosXzona = {};

        vm.tokko_data = []

        NgMap.getMap().then(function(map) {
            //console.log('map', map);
            vm.map = map;
        });

        vm.propiedad = {
            "address": "",
            "age": 0,
            "bathroom_amount": 0,
            "branch": null,
            "created_at": "",
            "custom1": "",
            "custom_tags": [],
            "deleted_at": "",
            "description": "",
            "development": null,
            "development_excel_extra_data": "[]",
            "disposition": null,
            "expenses": 0,
            "extra_attributes": [],
            "fake_address": "",
            "files": [],
            "floors_amount": 0,
            "geo_lat": "",
            "geo_long": "",
            "id": "",
            "is_starred_on_web": false,
            "legally_checked": "Unknown",
            "location": {},
            "operations": [],
            "orientation": null,
            "parking_lot_amount": 0,
            "photos": [],
            "producer": null,
            "property_condition": "",
            "public_url": "",
            "publication_title": "",
            "real_address": "",
            "reference_code": "",
            "resource_uri": "",
            "roofed_surface": "0.00",
            "room_amount": 0,
            "semiroofed_surface": "0.00",
            "situation": "Empty",
            "suite_amount": 0,
            "surface": "0.00",
            "surface_measurement": "M2",
            "tags": [],
            "toilet_amount": 0,
            "total_surface": "0.00",
            "transaction_requirements": "",
            "type": {},
            "unroofed_surface": "0.00",
            "videos": [],
            "web_price": false,
            "zonification": ""
        };

        activate(vm);

        function activate(vm) {

            // https://gist.github.com/aaronksaunders/bb8416da6a829ea2fb77
            vm.tokko_data = resourceFactory.query({id:'tokko.data.json'});
            vm.barriosXzona = resourceFactory.query({id:'barrios_cba.json'});

            vm.tokko_prices = [30000, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 1000000, 2000000, 3000000, 4000000, 5000000];
            vm.tokko_currency = ["ARS", "USD"];
            vm.tokko_dormitorios = ['1', '2', '3', '4', '5', '+5'];

            tokkoFactory.getState().then(function(response) {
                vm.tokko_state = response.objects;
            });

            //tokkoFactory.getCountry().then(function(response) {
            //    vm.tokko_country = response.objects;
            //});

            tokkoFactory.getPropertyType().then(function(response) {
                vm.tokko_property_type = response.objects;
            });

            tokkoFactory.getDevelopmentList().then(function(response) {
                vm.tokko_development = response.objects;
            });

            tokkoFactory.getPropertyCustomTags().then(function(response) {
                vm.tokko_property_custom_tags = response.objects;
            });

            vm.tokko_location = {}
        }

        vm.searchLocation = function() {
            tokkoFactory.getLocation(this.ciudad.id).then(function(response) {
                vm.tokko_location = response.divisions;
            });
        }

        vm.showDetail = function(e) {

            var shops = [{
                id: vm.propiedad.id,
                name: vm.propiedad.real_address,
                position: [vm.propiedad.geo_lat, vm.propiedad.geo_long]
            }];
            console.log(shops);
            vm.map.showInfoWindow('foo-iw', shops);
        };

        vm.hideDetail = function() {
            vm.map.hideInfoWindow('foo-iw');
        };

        /**
         * Tipo de propiedad
         * Dormitorios
         * Zonas: todos los barrios de la zona
         * Barrios: solo en los barrios de esa zona
         * Código: por código de propiedad.
         *
         */
        vm.searchTokko = function() {
            console.log('Buscando propiedades con los filtros _private: ...');
            // Codigo TOKKO: xej: 37588; 152749, 235422
            // http://getbootstrap.com/components/#thumbnails
            console.log('vm.codigoPropiedad: ' + vm.codigoPropiedad);
            if (vm.codigoPropiedad != '') {
                tokkoFactory.getProperty(vm.codigoPropiedad).then(function(response) {
                    vm.propiedad = response;
                    vm.propiedades = vm.propiedad;
                });
            }
            else {
                // Recursive way @.@:
                // vm.propiedades = vm.searchTokko(vm.tokko_location.id);
                tokkoFactory.getProperties(vm.tokko_dormitorios).then(function(response) {
                    console.log(response);
                    vm.propiedades = response;
                    console.log(vm.propiedades);
                    //vm.propiedades = vm.propiedad;
                    /*angular.forEach(params, function(value, key){
                        requestUrl = requestUrl + '&' + key + '=' + value;
                    });*/
                });
            }
            //
        }
    }
    /*
    // http://tokkobroker.com/api/playground#!/locations/location-detail_get_0
        tokkoController.prototype.searchTokko = function () {};
    */
})();
