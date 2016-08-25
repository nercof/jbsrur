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

        var data = {
              'getRequest': getRequest
            };

            function getRequest(url, tag, key) {
          var requestUrl = url + tag ;
          console.log('tokkoService + requestUrl: ' + requestUrl);
          console.log('tokkoService->getRequest->TOKKO_KEY: ' + key);

          return $http({
        'url': requestUrl,
        'method': 'GET',
        'data': '',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': key,
            'Accept': 'application/json',
        },
        'cache': true
      }).then(function(response){
        console.log("Auth.signin.success!");
        console.log("Response: ");
        console.log(response.data);
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