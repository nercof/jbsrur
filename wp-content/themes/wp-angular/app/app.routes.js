'use strict';
;(function(){
  angular
    .module('app.routes', ['ui.router'])
    .config(config);

  function config ($stateProvider, $urlRouterProvider) {
    console.log(localized.tokko);
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        views:{
            "main":{
                 templateUrl: localized.views + "main.html",
                 controller: 'mainController'
            }
        }
      })
      .state('quienes-somos', {
        url: '/quienes-somos',
        views:{
          "main":{
               templateUrl: localized.views + "quienes-somos.html"
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
      url: '/tokko',
      views:{
        "tokko":{
             templateUrl: localized.tokko + "tokko-search-input.html",
             controller: 'tokkoController as vm'
        }
      }
  })
    ;
  }
}());
