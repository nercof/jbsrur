(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('catalogController', catalogController);

    /**
    * catalogController: Gestión sobre el listado de propiedades en tokko.
    *  - @view: tokko-search-result
    */
    function catalogController($scope, tokkoFactory, tokkoService, NgMap,
        resourceFactory, $stateParams, $state, $localStorage) {
            console.log('<< Loading catalogController >>');
            var vm = this;

            vm.title_view = '';
            vm.barriosXzona = {};
            vm.allProperties = {};

            // Empleadas para la paginacion de propiedades.
            vm.totalItems = false;
            vm.currentPage = 1;
            vm.itemsPerPage = 16;
            vm.properties = {};

            // controla el estado de la consulta.
            vm.error = false;
            vm.spinner = true;

            // Activamos
            activate(vm);

            /**
            * activate():
            *
            * << @Comment >>
            */
            function activate(vm) {
                // Título de la vista
                vm.title_view = $stateParams.title_view;

                // Filtramos por tipo de Operacion
                vm.allProperties = _.filter($localStorage.prop_cache, function(prop) {
                    return _.some(prop.operations, function(oper) {
                        return oper.operation_type == $stateParams.type;
                    });
                });

                if(_.isEmpty(vm.allProperties)){
                    vm.error = true;
                }

                // Variables auxiliares para el paginador.
                vm.totalItems = vm.allProperties.length;
                vm.spinner = false;

                // Iniciamos las propiedades filtradas para la paginacion inicial.
                vm.properties = vm.allProperties.slice(0 * vm.itemsPerPage, 1 * vm.itemsPerPage);

                // Almacenamos el resultado de la búsqueda.
                $scope.$storage = $localStorage.$default({
                    prop_search: vm.properties,
                });
            } // fin activate()

            /**
            * Setea lista propiedades x pagina
            * El listado de propiedades depende del parametro page pasado.
            *
            * @param {int} page - Pagina actual
            */
            vm.setPagingData = function (page) {
                vm.properties =  vm.allProperties.slice((page - 1) * vm.itemsPerPage, page * vm.itemsPerPage);
            }

            /**
            * Funcion guia para cambiar la pagina seleccionada.
            *
            */
            vm.pageChanged = function(){
                vm.setPagingData(vm.currentPage);
            }
        } // Fin controller
    })();
