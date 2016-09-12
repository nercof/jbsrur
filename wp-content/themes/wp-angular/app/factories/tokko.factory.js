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
  .constant('TOKKO_PROPERTY', 'property/{id}/?lang=es_ar&?format=json&key=8fe7f17376761bada8524d0a75c8937f8a4517b7')
  .constant('TOKKO_SEARCH', 'property/search/?limit=50&lang=es_ar&format=json&data=tokko_query&key=8fe7f17376761bada8524d0a75c8937f8a4517b7');
  ;
  // limite=200
  // @see:http://tokkobroker.com/api/playground
  // GET /api/v1/property/search

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
    TOKKO_SEARCH,
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
      'getProperties': getProperties,
      'getPropertyByCity': getPropertyByCity,
    }

    // Model Schema to search in Tokko.
    var data_tokko = {
      "price_to": 0,                  //"int",
      "current_localization_type": "",//"string",
      "current_localization_id": [],  //"List",
      "without_tags": [],             //"list",
      "currency": "",                 //"String",
      "with_custom_tags": [],         //"list",
      "without_custom_tags": "",      //"list",
      "operation_types": "",          //"list",
      "with_tags": [],                //"list",
      "filter": [],                   //"list",
      "price_from": 0,                //"int",
      "property_types": [],           //"list"
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
    * @FIXME: Excluir las que NO sean "tipo_propiedad", para no enviar algunas
    * que no tienen relacion como CN- Cama Nautica.
    *
    * "tipo_propiedad":[Indistinto, Terreno, Departamento, Departamento a Estrenar
    *  Casa, Quinta, Oficina, Local, Edificio Comercial, Campo, Cochera, Depósito  ]
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
      return tokkoService.getRequest(BASE_TOKKO, url, TOKKO_KEY);
    }
    /**
    *
    * Para hacer una búsqueda el campo data podemos usar los siguientes
    * parametros:
    *
    * @use: data_tokko
    */

    function getProperties(params) {
      var url = '';
      var aux = "";

      // current_localization_id:[51827,30951,30884,30994,31104,31030,31130,31171,30876,30886,31092,31002,30943,31103],

      var data_test = {
        current_localization_id:[],
        current_localization_type:"division",
        price_from:0,
        price_to:9999999,
        operation_types:[],
        property_types:[],
        currency:"ARS",
        filters:[],
        with_tags:[],
        without_tags:[]
      };
      // Comment
      if (params) {
        data_test.current_localization_id = params.current_localization_id;
        data_test.operation_types = params.operation_types;
        data_test.property_types = params.property_types;
      }

      if (data_test.current_localization_id.length == 0) {
        // DEFAULT VALUES
        // 30864 - "full_location": "Argentina | Cordoba | Cordoba Capital ",
        // "Otras Localidades",
        // "31366" "La Granja",
        // "30814" "Los Reartes",
        // "32085" "Villa Carlos Paz"
        data_test.current_localization_id = [30864,31366,30814,32085];
      }

      if(data_test.operation_types.length == 0){
        data_test.operation_types = [1,2,3];
      }
      if (data_test.property_types.length == 0) {
        data_test.property_types = [1,2,3,4,5,6,7];
      }
      //{"current_localization_id":[51827,30951,30884,30994,31104,31030,31130,31171,30876,30886,31092,31002,30943,31103],"current_localization_type":"division","price_from":0,"price_to":4500000,"operation_types":[1,2,3],"property_types":[1,2,3,4,5,6,7],"currency":"USD","filters":[],"with_tags":[],"without_tags":[]}
      var aux = JSON.stringify(data_test);
      var url = TOKKO_SEARCH;
      url = url.replace('tokko_query', aux);

      return tokkoService.getRequest(BASE_TOKKO, url, TOKKO_KEY);
  }

  function getPropertyByCity() {
    var url = '';
    var aux = "";

    // 30864: "Cordoba Capital"
    // 31366: "La Granja"
    // 30814: "Los Reartes"
    // 32085: "Villa Carlos Paz

    var data_test = {
      current_localization_id: [30864, 31366, 30814, 32085],
      current_localization_type: "division",
      price_from: 0,
      price_to: 9999999,
      operation_types: [1, 2],
      property_types: [1, 2, 3, 4, 5, 6, 7],
      currency: "ARS",
      filters: [],
      with_tags: [],
      without_tags: []
    };

    var aux = JSON.stringify(data_test);
    var url = TOKKO_SEARCH;
    url = url.replace('tokko_query', aux);

    return tokkoService.getRequest(BASE_TOKKO, url, TOKKO_KEY);
  }

  // get Departamento a Estrenar
  // http://jbsrur.com.ar/listado.php?order_by=price&limit=20&order=desc&page=1&data={%22current_localization_id%22:0,%22current_localization_type%22:%22country%22,%22price_from%22:0,%22price_to%22:999999999,%22operation_types%22:[1,2],%22property_types%22:[2],%22currency%22:%22ANY%22,%22filters%22:[[%22age%22,%22=%22,0]]}
  // get Departamentos
  // http://jbsrur.com.ar/listado.php?order_by=price&limit=20&order=desc&page=1&data={%22current_localization_id%22:0,%22current_localization_type%22:%22country%22,%22price_from%22:0,%22price_to%22:999999999,%22operation_types%22:[1,2],%22property_types%22:[2],%22currency%22:%22ANY%22,%22filters%22:[[%22age%22,%22=%22,0]]}
  // get Edificios Comerciales
  // http://jbsrur.com.ar/listado.php?order_by=price&limit=20&order=desc&page=1&data={%22current_localization_id%22:0,%22current_localization_type%22:%22country%22,%22price_from%22:0,%22price_to%22:999999999,%22operation_types%22:[1,2],%22property_types%22:[8],%22currency%22:%22ANY%22,%22filters%22:[]}
  // get +5 dormitorioss
  // http://jbsrur.com.ar/listado.php?order_by=price&limit=20&order=desc&page=1&data={%22current_localization_id%22:0,%22current_localization_type%22:%22country%22,%22price_from%22:0,%22price_to%22:999999999,%22operation_types%22:[1,2],%22property_types%22:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],%22currency%22:%22ANY%22,%22filters%22:[[%22suite_amount%22,%22%3E%22,5]]}
  // get barriosXzona CENTRO http://jbsrur.com.ar/listado.php?order_by=price&limit=20&order=desc&page=1&data={%22current_localization_id%22:[51827,30951,30884,30994,31104,31030,31130,31171,30876,30886,31092,31002,30943,31103],%22current_localization_type%22:%22division%22,%22price_from%22:0,%22price_to%22:999999999,%22operation_types%22:[1,2],%22property_types%22:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],%22currency%22:%22ANY%22,%22filters%22:[]}

  return data;
}
}());
