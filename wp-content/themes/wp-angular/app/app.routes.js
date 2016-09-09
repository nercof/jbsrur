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
        "slider-top":{
          templateUrl: localized.views + "slider-full.html",
          controller: 'sliderController'
        },
        "tokko-middle":{
          templateUrl: localized.tokko + "tokko-search-input.html",
          controller: 'tokkoController as vm'
        }
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
        "main":{
          templateUrl: localized.views + "catalogo.html"
        }
      }
    })
    .state('alquileres', {
      url: '/alquileres',
      views:{
        "main":{
          templateUrl: localized.views + "catalogo.html"
        }
      }
    })
    .state('nuestros-emprendimientos', {
      url: '/nuestros-emprendimientos',
      views:{
        "main":{
          templateUrl: localized.views + "emprendimientos.html"
        }
      }
    })
    .state('otros-emprendimientos', {
      url: '/otros-emprendimientos',
      views:{
        "main":{
          templateUrl: localized.views + "emprendimientos.html"
        }
      }
    })
    .state('novedades', {
      url: '/novedades',
      views:{
        "main":{
          templateUrl: localized.views + "novedades.html"
        }
      }
    })
    .state('contacto', {
      url: '/contacto',
      views:{
        "main":{
          templateUrl: localized.views + "contacto.html"
        }
      }
    })
    .state('tokko', {
      // Buscador de Propiedades
      url: 'tokko',
      views:{
        "tokko-middle":{
          templateUrl: localized.tokko + "tokko-search-input.html",
          controller: 'tokkoController as vm'
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
      params: { data:null, flag:null},
      url: '/:id',
      views:{
        "@":{
          templateUrl: localized.tokko + "tokko-search-details.html",
          controller: 'tokkoDetailsController as vm',
        }
      },
      // http://christopherthielen.github.io/ui-router-extras/#/sticky
      deepStateRedirect: true,
      sticky: true,
      onEnter: function(){}
    });
  }// Fin function config
}());
