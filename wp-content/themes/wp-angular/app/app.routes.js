'use strict';
;(function(){
  angular
  .module('app.routes', ['ui.router'])
  .config(config);


  function config ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('home', {
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
    .state('quienes-somos', {
      url: '/quienes-somos',
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
    .state('ventas', {
      url: '/ventas',
      views:{
        "content":{
          templateUrl: localized.views + "catalogo.html"
        }
      }
    })
    .state('alquileres', {
      url: '/alquileres',
      views:{
        "content":{
          templateUrl: localized.views + "catalogo.html"
        }
      }
    })
    .state('nuestros-emprendimientos', {
      url: '/nuestros-emprendimientos',
      views:{
        "content":{
          templateUrl: localized.views + "emprendimientos.html"
        }
      }
    })
    .state('otros-emprendimientos', {
      url: '/otros-emprendimientos',
      views:{
        "content":{
          templateUrl: localized.views + "emprendimientos.html"
        }
      }
    })
    .state('novedades', {
      url: '/novedades',
      views:{
        "content":{
          templateUrl: localized.views + "novedades.html",
          controller: 'novedadesController as vm',
        }
      }
    })
    .state('contacto', {
      url: '/contacto',
      views:{
        "content":{
          templateUrl: localized.views + "contacto.html"
        }
      }
    })
    .state('propiedad', {
      // Resultado de Buscador de Propiedades.
      params: { data:null, cache:null},
      url: '/propiedades',
      views:{
        "content":{
          templateUrl: localized.tokko + "tokko-search-result.html",
          controller: 'tokkoResultController as vm',
        }
      },
    })
    .state('propiedad.detalle', { //DOT Notation
      params: { data:null },
      url: '/:id',
      views:{
        "detalle@propiedad":{
          templateUrl: localized.tokko + "tokko-search-details.html",
          controller: 'tokkoDetailsController as vm',
        },
        "title@propiedad":{
          template: '',
        }
      },
      deepStateRedirect: true,
      sticky: true,
      onEnter: function(){}
    });
  }// Fin function config
}());
