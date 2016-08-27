'use strict';
;(function(){
  angular
  .module('app.factories')
  .factory('tokkoFactory', dataFactory)
  .constant('TOKKO_FORMAT', '?format=json')
  .constant('TOKKO_LANG', '?lang=')
  .constant('TOKKO_KEYC', '&key=')
  .constant('TOKKO_KEY', '8fe7f17376761bada8524d0a75c8937f8a4517b7')
  .constant('TOKKO_WEB_CONTACT', 'webcontact/?key=')
  .constant('TOKKO_COUNTRIES', 'countries/?format=json')
  .constant('TOKKO_STATES', 'state/?format=json')
  .constant('TOKKO_LOCATION', 'location/{id}/?format=json')
  .constant('TOKKO_PROPERTY_TYPE', 'property_type/?lang=es_ar&format=json&key=8fe7f17376761bada8524d0a75c8937f8a4517b7')
  .constant('TOKKO_DEVELOPMENT_LIST', 'development/summary/?format=json&limit=999&key=8fe7f17376761bada8524d0a75c8937f8a4517b7&lang=es_ar')
  .constant('DEVELOPMENTS', 'development/?lang=es_ar&format=json&key=8fe7f17376761bada8524d0a75c8937f8a4517b7')
  .constant('TOKKO_PROPERTY_CUSTOM_TAG', 'property_custom_tag/')
  .constant('TOKKO_DEVELOPMENT_TYPE', '/api/v1/development_type/?lang=es_ar&format=json&key=8fe7f17376761bada8524d0a75c8937f8a4517b7')
  .constant('TOKKO_PROPERTY', "property/{id}/?lang=es_ar&?format=json&key=8fe7f17376761bada8524d0a75c8937f8a4517b7");
  ;

  // @see:http://tokkobroker.com/api/playground

  function dataFactory(tokkoService,
    BASE_TOKKO,
    TOKKO_KEY,
    TOKKO_LANG,
    TOKKO_KEYC,
    TOKKO_FORMAT,
    TOKKO_WEB_CONTACT,
    TOKKO_COUNTRIES,
    TOKKO_STATES,
    TOKKO_PROPERTY_TYPE,
    TOKKO_DEVELOPMENT_LIST,
    TOKKO_PROPERTY_CUSTOM_TAG,
    TOKKO_DEVELOPMENT_TYPE,
    TOKKO_LOCATION,
    TOKKO_PROPERTY,
    $window
    ){
    console.log('Load tokko.factory.js');
    var lang = "";
    var data = {
      'listStates':  listStates,
      'getState': getState,
      'getCountry': getCountry,
      'getPropertyType': getPropertyType,
      'getDevelopmentList': getDevelopmentList,
      'getPropertyCustomTags': getPropertyCustomTags,
      'getLocation': getLocation,
      'getProperty': getProperty,
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
      return tokkoService.getRequest(BASE_TOKKO, TOKKO_STATES, TOKKO_KEY);
    }

     function getCountry(id) {
      return getSCountryies(id).then(function(data){
        return data;
      });
    }

    function getSCountryies(id) {
      return tokkoService.getRequest(BASE_TOKKO, TOKKO_COUNTRIES, TOKKO_KEY);
    }

    /*
    * 'property_type/?limit=999&lang=es_ar&format=json&key=8fe7f17376761bada8524d0a75c8937f8a4517b7'
    *
    *
    */
    function getPropertyType(id) {
      return getPropertyTypes(id).then(function(data){
        return data;
      });
    }

    function getPropertyTypes(id) {
      getCurrentLang();
      var url = 'property_type/' +
                TOKKO_LANG + lang   +
                TOKKO_FORMAT        +
                TOKKO_KEYC + TOKKO_KEY;
      //console.log('getPropertyTypes url: ' + url);
      //console.log('getPropertyTypes constant: ' + TOKKO_PROPERTY_TYPE);
      return tokkoService.getRequest(BASE_TOKKO, TOKKO_PROPERTY_TYPE, TOKKO_KEY);
    }

    function getDevelopmentList(id) {
      return getDevelopmentListAll(id).then(function(data){
        return data;
      });
    }

    function getDevelopmentListAll(id) {
      return tokkoService.getRequest(BASE_TOKKO, TOKKO_DEVELOPMENT_LIST, TOKKO_KEY);
    }

    function getPropertyCustomTags(id) {
      return getPropertyCustomTagsAll(id).then(function(data){
        return data;
      });
    }

    function getPropertyCustomTagsAll(id) {
      getCurrentLang();
      var url = TOKKO_PROPERTY_CUSTOM_TAG +
                TOKKO_LANG + lang   +
                TOKKO_FORMAT        +
                TOKKO_KEYC + TOKKO_KEY;

      //console.log('getPropertyCustomTagsAll url: ' + url);
      return tokkoService.getRequest(BASE_TOKKO, url, TOKKO_KEY);
    }

    /*
    * Obtengo el lenguaje del navegador.
    *
    */
    function getCurrentLang(){
      lang = $window.navigator.language || $window.navigator.userLanguage;
      if (lang === 'en-US') {
        //console.log("Language is english");
      }
      else if (lang == "es") {
        //console.log("Language is: " + "es_ar");
        lang = "es_ar";
      }
    }

    // Permite buscar el barrio de la localidad seleccionada.
    // Debemos buscar por defecto solo Córdoba.
    function getLocation(id) {
      return getLocations(id).then(function(data){
        return data;
      });
    }

    function getLocations(id) {
      var url = TOKKO_LOCATION;
      url = url.replace('{id}', id);
      //console.log('url barrio: ' + url);

      return tokkoService.getRequest(BASE_TOKKO, url, TOKKO_KEY);
    }

    function getProperty(id) {
      return getPropertys(id).then(function(data){
        return data;
      });
    }

    function getPropertys(id) {
      var url = TOKKO_PROPERTY;
      url = url.replace('{id}', id);
      console.log('PROPIEDAD A BUSCAR: ' + url);
      console.log('URL: ' + BASE_TOKKO + url);
      return tokkoService.getRequest(BASE_TOKKO, url, TOKKO_KEY);
    }

    return data;
 }
}());
