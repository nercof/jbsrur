(function() {
    'use strict';
    angular
        .module('app.services')
        .service('tokkoService', tokkoService)
        .constant('TOKKO_FORMAT', '?format=json')
        .constant('TOKKO_KEY', '8fe7f17376761bada8524d0a75c8937f8a4517b7')
        .constant('TOKKO_WEB_CONTACT', 'http://tokkobroker.com/api/v1/webcontact/?key=');

    /* @ngInject */
    function tokkoService($http, $log, TOKKO_KEY) {
        
        var data = {
            'getRequest': getRequest
        };

        function getRequest(url, tag, key) {
            var requestUrl = url + tag ;

            return $http({
                'url': requestUrl,
                'method': 'GET',
                'data': '',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': key,
                    'Accept': 'application/json'
                },
                'cache': true
            }).then(function(response){
                return response.data;
            }).catch(dataServiceError);
        }

        function dataServiceError(errorResponse) {
            $log.error('XHR Failed for ShowService - Tokko Service');
            $log.error(errorResponse);
            return errorResponse;
        }
        return data;
    }
})();
