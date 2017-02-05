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
    function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,
      // Constantes
      STATE, TYPE, TITULO) {
        $urlRouterProvider.otherwise( '/');

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
              templateUrl: localized.views + "novedad/section.html",
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
          },
          ncyBreadcrumb: {
            label: TITULO.HOME
            //skip: true, // Never display this state in breadcrumb.
          }
        })
        .state(STATE.QS, {
          url: '/' + STATE.QS,
          views: {
            "content": {
              templateUrl: localized.views + "quienes-somos.html",
              controller: 'quienesSomosController as vm'
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
            title_view: TITULO.CATALOGO_VENTA,
            type: TYPE.VE
          },
          views: {
            "content": {
              templateUrl: localized.views + "catalogo.html",
              controller: 'catalogController as vm',
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
          },
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
            label: TITULO.NUESTROS_EMPRENDIMIENTOS,
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
            label: TITULO.OTROS_EMPRENDIMIENTOS,
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
          url: '/:id',
          params: {
            data: null,
            title_view: 'TITULO NOVEDAD',
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
            label: 'Detalle de la Novedad',
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
              templateUrl: localized.views + "contact-section.html",
              controller: 'contactController as vm'
            },
            "nav-section": {
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
            data: null,
            cache: null,
            predictive: null, // Lista propiedades filtradas por el predictiveSearch
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
              templateUrl: localized.views + "admProp.html",
              controller: 'administracionController as vm',
            },
            "contact-section": {
              templateUrl: localized.views + "contact-section.html",
              controller: 'contactController as vm'
            },
            "sub-footer": {
              templateUrl: localized.views + "sub-footer.html",
              controller: 'sucSectionController as vm'
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
        label: TITULO.NUESTROS_EMPRENDIMIENTOS,
        parent: STATE.NE,
      },
      deepStateRedirect: true,
      sticky: true,
      onEnter: function() {}
    });

  } // Fin function config
  }());
