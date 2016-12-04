'use strict';
;(function(){
    angular.module('app.config', [])
    .constant('GENERAL_CONFIG', {
        'APP_NAME': '',
        'APP_VERSION': '0.1',
        'FIRST_URL': ''
    })
    .constant('STATE', {
        'HO':'home',
        'VE':'ventas',
        'AL':'alquileres',
        'QS':'quienes-somos',
        'NE':'nemprendimientos',
        'OE':'oemprendimientos',
        'NED':'nemprendimientos.detalle',
        'NO':'novedades',
        'CO':'contacto',
        'PO':'propiedades',
        'PD':'propiedades.detalle'
    })
    .constant('TYPE', {
        'AL': 'Alquiler',
        'VE': 'Venta'
    })
    .constant('TITULO', {
        'CATALOGO_ALQUILER': 'Alquileres',
        'CATALOGO_VENTA': 'Ventas',
        'NUESTROS_EMPRENDIMIENTOS': 'Emprendimientos propios',
        'OTROS_EMPRENDIMIENTOS': 'Otros Emprendimientos',
        'NUESTROS_EMPRENDIMIENTOS_DETALLE': "Detalle del Emprendimiento",
    });
})();
