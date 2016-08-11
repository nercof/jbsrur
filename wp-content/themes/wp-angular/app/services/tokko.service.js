(function() {
'use strict';
angular
    .module('app.services')
    .service('tokkoService', tokkoService)
    .constant('TOKKO_FORMAT', '?format=json')
    .constant('TOKKO_KEY', '8fe7f17376761bada8524d0a75c8937f8a4517b7')
    .constant('TOKKO_WEB_CONTACT', 'http://tokkobroker.com/api/v1/webcontact/?key=');

    //tokkoService.$inject = ['$http', '$log'];

    /* @ngInject */
    function tokkoService($http, $log, TOKKO_KEY) {
        console.log('tokkoService');

        var data = {};
        data.tokko_key = TOKKO_KEY;
        console.log(TOKKO_KEY);
        return data;
    }
})();
