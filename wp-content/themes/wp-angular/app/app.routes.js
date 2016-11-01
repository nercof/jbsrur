'use strict';
(function() {
  angular
    .module('app.routes', ['ui.router', 'app.config', 'app.core'])
    .config(config);

  function config($stateProvider, $urlRouterProvider,
    // Constantes
    STATE, TYPE, TITULO) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state(STATE.HO, {
        url: '/',
        views: {
          "header": {
            templateUrl: localized.views + "slider-full.html",
            controller: 'sliderController'
          },
          "sub-header": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          },
        }
      })
      .state(STATE.QS, {
        url: '/' + STATE.QS,
        views: {
          "content": {
            templateUrl: localized.views + "quienes-somos.html",
            controller: 'quienesSomosController as vm'
          }
        }
      })
      .state('test', {
        url: '/test',
        params: {
          data: null
        },
        views: {
          "content": {
            templateUrl: localized.views + "catalogo.html",
            controller: function($stateParams) {
              console.log($stateParams);
            }
          }
        }
      })
      .state(STATE.VE, {
        url: '/' + STATE.VE,
        params: {
          title_view: TITULO.CATALOGO_VENTA,
          type: TYPE.VE
        },
        views: {
          "content": {
            templateUrl: localized.views + "catalogo.html",
            controller: 'catalogController as vm',
          }
        }
      })
      .state(STATE.AL, {
        url: '/' + STATE.AL,
        params: {
          title_view: TITULO.CATALOGO_ALQUILER,
          type: TYPE.AL
        },
        views: {
          "content": {
            templateUrl: localized.views + "catalogo.html",
            controller: 'catalogController as vm',
          }
        }
      })
      .state(STATE.NE, {
        url: '/' + STATE.NE,
        params: {
          title_view: TITULO.NUESTROS_EMPRENDIMIENTOS,
        },
        views: {
          "content": {
            templateUrl: localized.tokko + "tokko-developments/tokko-developments.html",
            controller: 'developmentsController as vm',
          }
        }
      })
      .state(STATE.OE, {
        url: '/' + STATE.OE,
        views: {
          "content": {
            templateUrl: localized.views + "emprendimientos.html"
          }
        }
      })
      .state(STATE.NO, {
        url: '/' + STATE.NO,
        views: {
          "content": {
            templateUrl: localized.views + "novedades.html",
            controller: 'novedadesDestacadasController as vm',
          }
        }
      })
      .state(STATE.CO, {
        url: '/' + STATE.CO,
        views: {
          "content": {
            templateUrl: localized.views + "contacto.html",
            controller: 'tokkoController as vm'
          }
        }
      })
      .state(STATE.PO, {
        // Resultado de Buscador de Propiedades.
        params: {
          data: null,
          cache: null,
          predictive: null, // Lista propiedades filtradas por el predictiveSearch
        },
        url: '/' + STATE.PO,
        views: {
          "content": {
            templateUrl: localized.tokko + "tokko-search-result.html",
            controller: 'tokkoResultController as vm',
          }
        },
        onExit: function() {
          //delete $scope.$storage.prop_search;
          //delete $localStorage.prop_search;
        },
      })
      .state(STATE.PD, { //DOT Notation
        params: {
          data: null
        },
        url: '/:id',
        views: {
          "detalle@propiedades": {
            templateUrl: localized.tokko + "tokko-search-details.html",
            controller: 'tokkoDetailsController as vm',
          }
        },
        deepStateRedirect: true,
        sticky: true,
        onEnter: function() {}
      });
  } // Fin function config
}());
