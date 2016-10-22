'use strict';
;(function(){
  angular
  .module('app.routes', ['ui.router', 'app.core'])
  .config(config);

  function config ($stateProvider, $urlRouterProvider,
    // Constantes
    STATE_HO, STATE_VE, STATE_AL, STATE_QS, STATE_NE, STATE_OE,
    STATE_NO, STATE_CO, STATE_PO, STATE_PD, TIPO_VENTA, TIPO_ALQUILER,
    TITULO_CATALOGO_ALQUILER, TITULO_CATALOGO_VENTA) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state(STATE_HO, {
      url: '/',
      views:{
        "header":{
          templateUrl: localized.views + "slider-full.html",
          controller: 'sliderController'
        },
        "sub-header":{
          templateUrl: localized.tokko + "tokko-search-input.html",
          controller: 'tokkoController as vm'
        },
      }
    })
    .state(STATE_QS, {
      url: '/' + STATE_QS,
      views:{
        "content":{
          templateUrl: localized.views + "quienes-somos.html",
          controller: 'mainController as vm'
        }
      }
    })
    .state('test', {
      url: '/test',
      params: { data: null },
      views:{
        "content":{
          templateUrl: localized.views + "catalogo.html",
          controller: function($stateParams) { console.log($stateParams); }
        }
      }
    })
   .state(STATE_VE, {
      url: '/' + STATE_VE,
      params: {
        title_view: TITULO_CATALOGO_VENTA,
        type: TIPO_VENTA
      },
      views:{
        "content":{
          templateUrl: localized.views + "catalogo.html",
          controller: 'catalogController as vm',
        }
      }
    })
    .state(STATE_AL, {
      url: '/' + STATE_AL,
      params: {
        title_view: TITULO_CATALOGO_ALQUILER,
        type: TIPO_ALQUILER
      },
      views:{
        "content":{
          templateUrl: localized.views + "catalogo.html",
          controller: 'catalogController as vm',
        }
      }
    })
    .state(STATE_NE, {
      url: '/' + STATE_NE,
      views:{
        "content":{
          templateUrl: localized.views + "emprendimientos.html"
        }
      }
    })
    .state(STATE_OE, {
      url: '/' + STATE_OE,
      views:{
        "content":{
          templateUrl: localized.views + "emprendimientos.html"
        }
      }
    })
    .state(STATE_NO, {
      url: '/' + STATE_NO,
      views:{
        "content":{
          templateUrl: localized.views + "novedades.html",
          controller: 'novedadesDestacadasController as vm',
        }
      }
    })
    .state(STATE_CO, {
      url: '/' + STATE_CO,
      views:{
        "content":{
          templateUrl: localized.views + "contacto.html"
        }
      }
    })
    .state(STATE_PO, {
      // Resultado de Buscador de Propiedades.
      params: { data:null, cache:null},
      url: '/' + STATE_PO,
      views:{
        "content":{
          templateUrl: localized.tokko + "tokko-search-result.html",
          controller: 'tokkoResultController as vm',
        }
      },
    })
    .state(STATE_PD, { //DOT Notation
      params: { data:null },
      url: '/:id',
      views:{
        "detalle@propiedad":{
          templateUrl: localized.tokko + "tokko-search-details.html",
          controller: 'tokkoDetailsController as vm',
        }
      },
      deepStateRedirect: true,
      sticky: true,
      onEnter: function(){}
    });
  }// Fin function config
}());
