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
          "search-form": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          },
          "nav-section": {
            templateUrl: localized.views + "nav-section.html",
            controller: 'navSectionController'
          },
          "content": {
            templateUrl: localized.views + "news-section.html",
            controller: 'novedadesController as vm'
          },
          "social-section": {
            templateUrl: localized.views + "social-section.html",
            controller: 'socialSectionController as vm'
          },
          "contact-section": {
            templateUrl: localized.views + "contact-section.html",
            controller: 'contactController as vm'
          },
          "suc-section": {
            templateUrl: localized.views + "suc-section.html",
            controller: 'sucSectionController as vm'
          }
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
            controller: function($stateParams) {}
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
          },
          "search-form": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          },
        }
      })
      .state(STATE.AL, {
        url: '/' + STATE.AL,
        params: {
          title_view: TITULO.CATALOGO_ALQUILER,
          type: TYPE.AL
        },
        views: {
          "search-form": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          },
          "content": {
            templateUrl: localized.views + "catalogo.html",
            controller: 'catalogController as vm',
          },
        }
      })
      .state(STATE.NE, {
        url: '/' + 'nuestros-emprendimientos',
        params: {
          title_view: TITULO.NUESTROS_EMPRENDIMIENTOS,
          category:17,
        },
        views: {
          "content": {
            templateUrl: localized.views + "emprendimiento/emprendimientos.html",
            controller: 'emprendimientoController as vm',
          }
        }
      })
      .state(STATE.OE, {
        url: '/' + 'otros-emprendimientos',
        params: {
          title_view: TITULO.OTROS_EMPRENDIMIENTOS,
          category:18,
        },
        views: {
          "content": {
            templateUrl: localized.views + "emprendimiento/emprendimientos.html",
            controller: 'emprendimientoController as vm',
          }
        }
      })
      .state(STATE.NO, {
        url: '/' + STATE.NO,
        views: {
          "content": {
            templateUrl: localized.views + "novedad/novedades.html",
            controller: 'novedadesController as vm',
          }
        }
      })
      .state(STATE.NOD, {
        url: '/:id',
        params: {
          data: null,
          title_view: 'TITULO NOVEDAD',
        },
        views: {
          "detalle@novedades": {
            templateUrl: localized.views + "novedad/novedad-detalle.html",
            controller: 'novedadesDetalleController as vm',
          }
        },
        deepStateRedirect: true,
        sticky: true,
        onEnter: function() {}
      })
      .state(STATE.CO, {
        url: '/' + STATE.CO,
        views: {
          "contact-section": {
            templateUrl: localized.views + "contact-section.html",
            controller: 'contactController as vm'
          },
          "suc-section": {
            templateUrl: localized.views + "suc-section.html",
            controller: 'sucSectionController as vm'
          },
          "social-section": {
            templateUrl: localized.views + "social-section.html",
            controller: 'socialSectionController as vm'
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
      })
      .state(STATE.NED, { //DOT Notation'NED':'nemprendimientos.detalle',
        params: {
          data: null,
          title_view: TITULO.NUESTROS_EMPRENDIMIENTOS_DETALLE,
        },
        url: '/:id',
        views: {
          "detalle@nemprendimientos": {
            templateUrl: localized.views + "emprendimiento/emprendimiento-detalle.html",
            controller: 'developmentsDetailsController as vm',
          }
        },
        deepStateRedirect: true,
        sticky: true,
        onEnter: function() {}
      });
  } // Fin function config
}());
