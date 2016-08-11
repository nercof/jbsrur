'use strict';
;(function(){
  angular
  .module('app.factories')
  .factory('tokkoFactory', dataFactory)
  .constant('TOKKO_FORMAT', '?format=json')
  .constant('TOKKO_KEY', '8fe7f17376761bada8524d0a75c8937f8a4517b7')
  .constant('TOKKO_WEB_CONTACT', 'webcontact/?key=')
  .constant('TOKKO_COUNTRIES', 'countries/')
  .constant('TOKKO_STATES', 'state/?format=json');
  ;

  function dataFactory(wordpressService,
    BASE_TOKKO,
    TOKKO_KEY,
    TOKKO_FORMAT,
    TOKKO_WEB_CONTACT,
    TOKKO_COUNTRIES,
    TOKKO_STATES){

    var data = {
      'listStates':  listStates,
      'getState': getState
    }

    function listStates() {
      return getPosts("").then(function(data){
        return data;
      });
    }
    function getState(id) {
      return getStates(id).then(function(data){
        return data;
      });
    }
    function getStates(id) {
      return wordpressService.getRequest(BASE_TOKKO, TOKKO_STATES, id);
    }

    return data;
 }
}());
