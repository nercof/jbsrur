'use strict';;
(function() {
  angular
    .module('app.services')
    .service('wordpressService', dataService);

  function dataService($http, $log) {
    /* TO DO: Ver $log */

    var data = {
      'getRequest': getRequest
    }

    function getRequest(url, tag, id) {
      var requestUrl = url + tag + '/' + id;
      return $http({
        'url': requestUrl,
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        return response.data;
      }).catch(dataServiceError);
    }

    function dataServiceError(errorResponse) {
      $log.error('XHR Failed for ShowService');
      $log.error(errorResponse);
      return errorResponse;
    }

    return data;
  }
}());
