(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('tokkoDetailsController', tokkoDetailsController);

    tokkoDetailsController.$inject = ['$state', '$stateParams', 'tokkoFactory', '$scope', '$rootScope'];

    /* @ngInject */
    function tokkoDetailsController($state, $stateParams, tokkoFactory, $scope, $rootScope) {
        var vm = this;
        vm.propiedad = {}
        vm.state = {}
        var local_scope = $scope;
        var local_state = $state;
        console.log('HIJO');

    create();

    function create() {
        //$scope.state = $state;
/*        local_scope.$parent.is_hide = true;
        console.log(local_scope);
        console.log(local_state);
        vm.state = local_state;
        console.log('vm.local_state');
        console.log(vm.state);
*/
        // Bandera para ocultar el resultado de propiedades
        //$scope.$parent.flag_propiedades = false;
        //console.log($scope.$parent.flag_propiedades);

        if($stateParams.data){
            vm.propiedad = $stateParams.data

        }else{
            tokkoFactory.getProperty($stateParams.id).then(function(data){
                vm.propiedad = data;
            });
        }
    }
}
})();
/*
tokkoResult.propiedad = {
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
*/
