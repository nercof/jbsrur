(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('tokkoResultController', tokkoResultController);

    function tokkoResultController( $scope, tokkoFactory, tokkoService, NgMap,
                                    resourceFactory, $stateParams, $state) {
    var tokkoResult = this;
    tokkoResult.data = {}
    tokkoResult.propiedades = {};

    // Activamos
    activate(tokkoResult);

    function activate(tokkoResult) {
        // Recive paramas views tokko-input.
        tokkoResult.data = $stateParams.data;

        // Call factory to search Tokko properties.
        tokkoFactory.getProperties(tokkoResult.data).then(function(response) {
            tokkoResult.propiedades = response.objects;
            console.log('tokkoFactory.getProperties');
            console.log(tokkoResult.propiedades);
        });
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
