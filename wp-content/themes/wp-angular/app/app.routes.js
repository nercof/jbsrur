'use strict';
(function() {
  angular
    .module('app.routes', ['ui.router', 'app.config', 'app.core'])
    .config(config);

  /**
   * Initial route state configuration.
   * $localized: overwrite initial path for all views.
   *
   */
  function config($stateProvider, $urlRouterProvider, $locationProvider,
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
          "social-section": {
            templateUrl: localized.views + "suc-section.html",
            controller: 'sucSectionController as vm'
          },
          "suc-section": {
            templateUrl: localized.views + "social-section.html",
            controller: 'socialSectionController as vm'
          }
        },
        ncyBreadcrumb: {
          label: TITULO.HOME,
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state(STATE.QS, {
        url: '/' + STATE.QS,
        views: {
          "content": {
            templateUrl: localized.views + "quienes-somos.html",
            controller: 'quienesSomosController as vm'
          },
          "suc-section": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          },
          "sub-footer": {
            templateUrl: localized.views + "sub-footer.html",
            controller: 'sucSectionController as vm'
          }
        },
        ncyBreadcrumb: {
          parent: STATE.HO,
          label: TITULO.QSOM,
        }
      })
      .state(STATE.VE, {
        url: '/' + STATE.VE,
        params: {
          type: TYPE.VE,
          allProps: null,
          lastSearch: null,
          isSearch:false
        },
        views: {
          "content": {
            templateUrl: localized.tokko + "tokko-search-result.html",
            controller: 'tokkoResultController as vm',
          },
          "suc-section": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          },
          "second-footer": {
            templateUrl: localized.views + "sub-footer.html",
            controller: 'sucSectionController as vm'
          }
        },
        ncyBreadcrumb: {
          label: TITULO.CATALOGO_VENTA,
          parent: STATE.HO,
        },
        reloadOnSearch: false,
      })
      .state(STATE.AL, {
        url: '/' + STATE.AL,
        params: {
          type: TYPE.AL,
          allProps: null,
          lastSearch: null,
          isSearch:false
        },
        reloadOnSearch: false,
        views: {
          "content": {
            templateUrl: localized.tokko + "tokko-search-result.html",
            controller: 'tokkoResultController as vm',
          },
          "suc-section": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          },
          "second-footer": {
            templateUrl: localized.views + "sub-footer.html",
            controller: 'sucSectionController as vm'
          }
        },
        ncyBreadcrumb: {
          label: TITULO.CATALOGO_ALQUILER,
          parent: STATE.HO,
        }
      })
      .state(STATE.NE, {
        url: '/' + 'emprendimientos-propios',
        params: {
          title_view: TITULO.NUESTROS_EMPRENDIMIENTOS,
          category: 17,
        },
        views: {
          "content": {
            templateUrl: localized.views + "emprendimiento/emprendimientos.html",
            controller: 'emprendimientoController as vm',
          },
          "sub-footer": {
            templateUrl: localized.views + "sub-footer.html",
            controller: 'sucSectionController as vm'
          },
          "main-footer": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          }
        },
        ncyBreadcrumb: {
          label: TITULO.EMPRENDIMIENTOS,
          parent: STATE.HO,
        },
      })
      .state(STATE.OE, {
        url: '/' + 'otros-emprendimientos',
        params: {
          title_view: TITULO.OTROS_EMPRENDIMIENTOS,
          category: 18,
        },
        views: {
          "contact-section": {
            templateUrl: localized.views + "emprendimiento/emprendimientos.html",
            controller: 'emprendimientoController as vm',
          },
          "second-footer": {
            templateUrl: localized.views + "sub-footer.html",
            controller: 'sucSectionController as vm'
          },
          "main-footer": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          }
        },
        ncyBreadcrumb: {
          label: TITULO.EMPRENDIMIENTOS,
          parent: STATE.HO,
        },
      })
      .state(STATE.NO, {
        url: '/' + STATE.NO,
        views: {
          "content": {
            templateUrl: localized.views + "novedad/index.html",
            controller: 'novedadesController as vm'
          },
          "top@novedades": {
            templateUrl: localized.views + 'novedad/section.html',
            controller: 'novedadesController as vm'
          },
          "middle@novedades": {
            templateUrl: localized.views + 'novedad/list.html',
            controller: 'novedadesController as vm'
          },
          "sub-footer": {
            templateUrl: localized.views + "sub-footer.html",
            controller: 'sucSectionController as vm'
          },
          "main-footer": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          }
        },
        ncyBreadcrumb: {
          label: TITULO.NOV,
          parent: STATE.HO,
        },
      })
      .state(STATE.NOD, {
        url: '/:id/:slug',
        params: {
          data: null,
          title_view: 'TITULO NOVEDAD',
          id: null
        },
        views: {
          "top@novedades": {
            templateUrl: localized.views + 'novedad/detail.html',
            controller: 'novedadesDetalleController as vm'
          },
          "middle@novedades": {
            templateUrl: localized.views + 'novedad/section.html',
            controller: 'novedadesController as vm'
          },
          "button@novedades": {
            templateUrl: localized.views + 'novedad/list.html',
            controller: 'novedadesController as vm'
          }
        },
        ncyBreadcrumb: {
          label: 'Detalle',
          parent: STATE.NO,
        },
        deepStateRedirect: true,
        sticky: true,
        onEnter: function() {}
      })
      .state(STATE.CO, {
        url: '/' + STATE.CO,
        views: {
          "header": {
            templateUrl: localized.views + "contacto.html",
            controller: 'sliderController'
          },
          "nav-section": {
            templateUrl: localized.views + "contact-section.html",
            controller: 'contactController as vm'
          },
          "content": {
            templateUrl: localized.views + "suc-section.html",
            controller: 'sucSectionController as vm'
          },
          "contact-section": {
            templateUrl: localized.views + "social-section.html",
            controller: 'socialSectionController as vm'
          },
          "second-footer": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          }
        },
        ncyBreadcrumb: {
          label: TITULO.CONTACTO,
          parent: STATE.HO,
          skip: true // Never display this state in breadcrumb.
        },
      })
      .state(STATE.PO, {
        // Resultado de Buscador de Propiedades.
        params: {
          allProps: null,
          lastSearch: null, // Lista propiedades filtradas por el predictiveSearch
          isSearch:false,
          type: null
        },
        url: '/' + STATE.PO,
        views: {
          "content": {
            templateUrl: localized.tokko + "tokko-search-result.html",
            controller: 'tokkoResultController as vm',
          },
          "sub-footer": {
            templateUrl: localized.views + "sub-footer.html",
            controller: 'sucSectionController as vm'
          },
          "main-footer": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          }
        },
        ncyBreadcrumb: {
          label: TITULO.PROPIEDAD,
          parent: STATE.HO,
        },
        onExit: function() {
          //delete $scope.$storage.prop_search;
          //delete $localStorage.prop_search;
        },
      })
      .state(STATE.ADP, {
        // Resultado de Buscador de Propiedades.
        params: {
          data: null,
          cache: null,
        },
        url: '/' + STATE.ADP,
        views: {
          "content": {
            templateUrl: localized.views + "adm-prop.html",
            controller: 'administracionController as vm',
          },
          "contact-section": {
            templateUrl: localized.views + "contact-section.html",
            controller: 'contactController as vm'
          },
          "sub-footer": {
            templateUrl: localized.views + "sub-footer.html",
            controller: 'sucSectionController as vm'
          },
          "main-footer": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          }
        },
        ncyBreadcrumb: {
          label: TITULO.ADP,
          parent: STATE.HO,
        },
      })
      .state(STATE.PD, { //DOT Notation 'PD':'propiedades.detalle',
        params: {
          data: null,
          id:null,
        },
        url: '/:id',
        views: {
          "detalle@propiedades": {
            templateUrl: localized.tokko + "tokko-search-details.html",
            controller: 'tokkoDetailsController as vm',
          },
          "sub-footer": {
            templateUrl: localized.views + "sub-footer.html",
            controller: 'sucSectionController as vm'
          },
          "main-footer": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          }
        },
        ncyBreadcrumb: {
          label: TITULO.DETPROP,
          parent: function($scope) {
            if(!_.isEmpty($scope.data.parentState)){
              return $scope.data.parentState;
            }
          }
        },
        deepStateRedirect: true,
        onEnter: function() {}
      })
      .state(STATE.OED, { //DOT Notation'OED':'oemprendimientos.detalle',
        params: {
          data: null,
          title_view: TITULO.NUESTROS_EMPRENDIMIENTOS_DETALLE,
        },
        url: '/:id/:slug',
        views: {
          "detalle@oemprendimientos": {
            templateUrl: localized.views + "emprendimiento/emprendimiento-detalle.html",
            controller: 'developmentsDetailsController as vm',
          },
          "sub-footer": {
            templateUrl: localized.views + "sub-footer.html",
            controller: 'sucSectionController as vm'
          },
          "main-footer": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          }
        },
        ncyBreadcrumb: {
          label: TITULO.DETPROP,
          parent: STATE.OE,
        },
        deepStateRedirect: true,
        sticky: true,
        onEnter: function() {}
      })
      .state(STATE.NED, { //DOT Notation'NED':'nemprendimientos.detalle',
        params: {
          data: null,
          title_view: TITULO.NUESTROS_EMPRENDIMIENTOS_DETALLE
        },
        url: '/:id/:slug',
        views: {
          "detalle@nemprendimientos": {
            templateUrl: localized.views + "emprendimiento/emprendimiento-detalle.html",
            controller: 'developmentsDetailsController as vm',
          },
          "sub-footer": {
            templateUrl: localized.views + "sub-footer.html",
            controller: 'sucSectionController as vm'
          },
          "main-footer": {
            templateUrl: localized.tokko + "tokko-search-input.html",
            controller: 'tokkoController as vm'
          }
        },
        ncyBreadcrumb: {
          label: TITULO.DETPROP,
          parent: STATE.NE,
        },
        deepStateRedirect: true,
        sticky: true,
        onEnter: function() {}
      });

    // Use the HTML5 History API in order to prevent use of '#' in url path
    //$locationProvider.html5Mode(true);
  } // Fin function config
}());
