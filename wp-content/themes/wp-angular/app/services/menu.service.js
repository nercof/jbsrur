'use strict';
;(function(){
  angular
    .module('app.services')
    .constant('BASE_URL', '/wp-json/wp-api-menus/v2/')
    .service('menuService', dataService);

  function dataService($http, BASE_URL, $log){
    /* TO DO: Ver $log */
    /* TO DO: Ver $log */
    console.log('dataService');

    var data = {
      'getHeader': getHeader
    }

    function getRequest(url, id) {
      var requestUrl = BASE_URL + url + '/' + id;
      /*angular.forEach(params, function(value, key){
          requestUrl = requestUrl + '&' + key + '=' + value;
      });*/
      return $http({
        'url': requestUrl,
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'
        },
        'cache': true
      }).then(function(response){
        return response.data;
      }).catch(dataServiceError);
    }

    function get(id) {
        return getRequest('menus', id);
    }

    function getHeader() {
      var id = '2';
      return get(id).then(function(data){
        addStates(data);
        formatUrls(data);
        console.log('getHeader', data)
        return data;
      });
    }

   function addStates(menu) {
      menu.items.forEach(function(item){
        if(!item.children){
           item.state = item.url.substr(1);
        }else {
          item.children.forEach(function(child){
            child.state = child.url.substr(1);
          });
        }
      });
    }

    function formatUrls(menu) {
      menu.items.forEach(function(item){
        if(item.children){
           item.url = "#";
        }
      })
    }

    function dataServiceError(errorResponse) {
        $log.error('XHR Failed for ShowService');
        $log.error(errorResponse);
        return errorResponse;
    }

    return data;
  }
}());
