'use strict';
;(function(){
  angular.module('app.core', [])
  // Tipos
  .constant('TIPO_ALQUILER', 'Alquiler')
  .constant('TIPO_VENTA', 'Venta')
  // Titulos vistas
  .constant('TITULO_CATALOGO_VENTA','Ventas')
  .constant('TITULO_CATALOGO_ALQUILER', 'Alquileres')
  // Definicion de estados.
  .constant('STATE_HO','home')
  .constant('STATE_VE','ventas')
  .constant('STATE_AL','alquileres')
  .constant('STATE_QS','quienes-somos')
  .constant('STATE_NE','nuestros-emprendimientos')
  .constant('STATE_OE','otros-emprendimientos')
  .constant('STATE_NO','novedades')
  .constant('STATE_CO','contacto')
  .constant('STATE_PO','propiedad')
  .constant('STATE_PD','propiedad.detalle');
}());
